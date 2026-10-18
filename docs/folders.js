'use strict';

// File contents stay in the browser until the existing analysis form is submitted.
const localFilePaths = new WeakMap();
const folderLibrary = {mode: 'analysis', entries: [], selected: new Set(), root: '', directory: '',
  page: 0, pageSize: 60, busy: false, savedHandle: null, handle: null, readVersion: 0};
function fileLocalPath(file) { return localFilePaths.get(file) || file.webkitRelativePath || file.name; }
function sameLocalFile(a, b) { return fileLocalPath(a) === fileLocalPath(b) && a.size === b.size && a.lastModified === b.lastModified; }
function directoryStore(action, value) {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) { resolve(null); return; }
    const request = indexedDB.open('paperwork-folders', 1);
    request.onupgradeneeded = () => request.result.createObjectStore('handles');
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction('handles', action === 'get' ? 'readonly' : 'readwrite');
      const store = transaction.objectStore('handles');
      const task = action === 'get' ? store.get('last') : action === 'delete' ? store.delete('last') : store.put(value, 'last');
      transaction.oncomplete = () => { db.close(); resolve(action === 'get' ? task.result || null : true); };
      transaction.onerror = () => { db.close(); reject(transaction.error); };
      transaction.onabort = () => { db.close(); reject(transaction.error || new Error('Storage unavailable')); };
    };
  });
}
function folderMessage(message) { $('folderFeedback').textContent = message; }
function folderBusy(value) {
  folderLibrary.busy = value;
  ['chooseDirectory', 'reopenDirectory', 'compatibleDirectory', 'forgetDirectory', 'useFolderSelection', 'folderSelectVisible'].forEach(id => { $(id).disabled = value; });
  $('folderFiles').querySelectorAll('input[data-entry]').forEach(check => { check.disabled = value || check.closest('label').classList.contains('unavailable'); });
  if (!value) updateFolderSelection();
}
function openFolderLibrary(mode = 'analysis') {
  folderLibrary.mode = mode; folderLibrary.selected.clear(); folderLibrary.page = 0;
  $('folderType').value = mode === 'paper' ? 'pdf' : 'all'; $('folderType').disabled = mode === 'paper';
  $('folderSubtitle').textContent = mode === 'paper' ? '點選一篇 PDF，接著選擇摘要模板與筆記位置。' : '點選 PDF／Word；最多 5 份一起分析，合計不超過 80 MB。';
  $('useFolderSelection').textContent = mode === 'paper' ? '選用這篇論文' : '加入分析清單';
  $('folderSelectVisible').hidden = mode === 'paper';
  $('compatibleDirectory').hidden = typeof window.showDirectoryPicker !== 'function';
  $('reopenDirectory').hidden = !folderLibrary.savedHandle;
  $('forgetDirectory').hidden = !folderLibrary.savedHandle;
  renderFolderLibrary(); $('folderDialog').showModal();
  if (!folderLibrary.entries.length) folderMessage('請先選擇一個資料夾。會包含子資料夾中的 PDF／DOCX，不會自動上傳。');
}
function isSupportedFile(name) { return /\.(pdf|docx)$/i.test(name); }
function fileUnavailable(file) { return !file.size ? '空白檔案' : file.size > 50 * 1024 * 1024 ? '超過單檔 50 MB' : ''; }
async function readDirectory(handle) {
  const version = ++folderLibrary.readVersion;
  folderBusy(true); folderMessage('正在列出資料夾中的文件…');
  const entries = []; let visited = 0, skipped = 0;
  async function walk(directory, parent, depth) {
    if (depth > 40) { skipped++; return; }
    try {
      for await (const child of directory.values()) {
        if (version !== folderLibrary.readVersion) throw new Error('cancelled');
        if (++visited > 20000) throw new Error('too-many-files');
        const path = parent + '/' + child.name;
        if (child.kind === 'directory') await walk(child, path, depth + 1);
        else if (isSupportedFile(child.name)) {
          try {
            const file = await child.getFile(); localFilePaths.set(file, path);
            entries.push({id: path, path, file, handle: child, unavailable: fileUnavailable(file)});
          } catch { skipped++; }
        }
        if (visited % 100 === 0) { folderMessage('已找到 ' + entries.length + ' 份文件…'); await new Promise(resolve => setTimeout(resolve, 0)); }
      }
    } catch (error) {
      if (error.message === 'too-many-files' || error.message === 'cancelled' || depth === 0) throw error;
      skipped++;
    }
  }
  try {
    await walk(handle, handle.name, 0);
    if (version !== folderLibrary.readVersion) return;
    folderLibrary.handle = handle;
    setDirectoryEntries(handle.name, entries);
    folderLibrary.savedHandle = handle;
    try { await directoryStore('put', handle); }
    catch { folderMessage('已讀取 ' + entries.length + ' 份文件；此瀏覽器無法記住資料夾，下次請重新選取。'); }
    $('reopenDirectory').hidden = false; $('forgetDirectory').hidden = false;
    if (skipped) folderMessage('已列出 ' + entries.length + ' 份文件；另有 ' + skipped + ' 個項目無法讀取或層級過深，可改選較小的子資料夾。');
  } catch (error) {
    if (error.message === 'cancelled') return;
    folderMessage(error.message === 'too-many-files' ? '這個資料夾超過 20,000 個項目，請直接選擇要處理的子資料夾。原有清單仍保留。' : '資料夾未能讀取。請重新選擇資料夾，或使用相容模式。');
  } finally { if (version === folderLibrary.readVersion) folderBusy(false); }
}
async function chooseLocalDirectory() {
  if (!window.showDirectoryPicker) { $('directoryInput').click(); return; }
  try {
    const handle = await window.showDirectoryPicker({id: 'paperwork-source', mode: 'read', startIn: 'documents'});
    await readDirectory(handle);
  } catch (error) { if (error.name !== 'AbortError') folderMessage('瀏覽器未開放資料夾選取，請點「使用相容模式」重新選擇。'); }
}
async function reopenLocalDirectory() {
  const handle = folderLibrary.savedHandle; if (!handle) return;
  try {
    const permission = await handle.requestPermission({mode: 'read'});
    if (permission !== 'granted') { folderMessage('尚未取得讀取權限，請選擇資料夾並允許讀取，或使用相容模式。'); return; }
    await readDirectory(handle);
  } catch { folderMessage('上次資料夾已無法讀取，請重新選擇。'); }
}
function setDirectoryEntries(root, entries) {
  folderLibrary.root = root; folderLibrary.directory = ''; folderLibrary.page = 0; folderLibrary.selected.clear();
  folderLibrary.entries = entries.sort((a, b) => a.path.localeCompare(b.path, 'zh-Hant', {numeric: true}));
  $('folderSearch').value = ''; renderFolderLibrary();
  folderMessage(entries.length ? '已讀取 ' + entries.length + ' 份文件。點選列即可勾選，尚未上傳至 Gemini。' : '這個資料夾內沒有 PDF 或 DOCX，請換一個資料夾。');
}
function useDirectoryFiles(files) {
  const all = Array.from(files); if (!all.length) return;
  if (all.length > 20000) { folderMessage('資料夾超過 20,000 個檔案，請選擇較小的子資料夾。'); return; }
  const root = (all[0].webkitRelativePath || '').split('/')[0] || '所選資料夾';
  const entries = all.filter(file => isSupportedFile(file.name)).map((file, index) => {
    const path = file.webkitRelativePath || root + '/' + file.name; localFilePaths.set(file, path);
    return {id: path + ':' + index, path, file, unavailable: fileUnavailable(file)};
  });
  folderLibrary.handle = null; setDirectoryEntries(root, entries);
  folderMessage($('folderFeedback').textContent + ' 相容模式下，下次請重新選取資料夾。');
}
function folderMatches() {
  const query = $('folderSearch').value.trim().toLocaleLowerCase(); const type = $('folderType').value;
  return folderLibrary.entries.filter(entry => (!folderLibrary.directory || entry.path.startsWith(folderLibrary.directory + '/')) &&
    (!query || entry.path.toLocaleLowerCase().includes(query)) && (type === 'all' || entry.file.name.toLowerCase().endsWith('.' + type)));
}
function navigateFolder(path) { folderLibrary.directory = path; folderLibrary.page = 0; renderFolderLibrary(); }
function renderFolderNavigation() {
  const root = folderLibrary.root;
  const container = $('folderTree'); container.replaceChildren();
  const all = el('button', 'folder-nav' + (!folderLibrary.directory ? ' active' : ''), '全部文件'); all.type = 'button';
  all.addEventListener('click', () => navigateFolder('')); container.append(all);
  if (root) {
    const base = folderLibrary.directory || root; const children = new Set();
    folderLibrary.entries.forEach(entry => {
      if (!entry.path.startsWith(base + '/')) return;
      const relative = entry.path.slice(base.length + 1).split('/');
      if (relative.length > 1) children.add(base + '/' + relative[0]);
    });
    if (folderLibrary.directory && folderLibrary.directory !== root) {
      const up = el('button', 'folder-nav', '← 上一層'); up.type = 'button';
      up.addEventListener('click', () => navigateFolder(base.slice(0, base.lastIndexOf('/')))); container.append(up);
    }
    [...children].sort().forEach(path => {
      const button = el('button', 'folder-nav'); button.type = 'button'; button.append(icon('folder'), el('span', '', path.split('/').pop())); button.title = path;
      button.addEventListener('click', () => navigateFolder(path)); container.append(button);
    });
    if (!children.size) container.append(el('p', 'folder-tree-empty', '沒有下一層資料夾'));
  }
  const crumbs = $('folderBreadcrumb'); crumbs.replaceChildren();
  if (!root) { crumbs.textContent = '尚未選擇資料夾'; return; }
  const parts = (folderLibrary.directory || root).split('/');
  parts.forEach((part, index) => {
    if (index) crumbs.append(el('span', '', '／'));
    const button = el('button', 'text-button', part); button.type = 'button'; button.addEventListener('click', () => navigateFolder(index ? parts.slice(0, index + 1).join('/') : '')); crumbs.append(button);
  });
  if (!folderLibrary.directory) crumbs.append(el('small', '', '含所有子資料夾'));
}
function renderFolderLibrary() {
  renderFolderNavigation();
  const matches = folderMatches(), totalPages = Math.max(1, Math.ceil(matches.length / folderLibrary.pageSize));
  folderLibrary.page = Math.min(folderLibrary.page, totalPages - 1);
  const visible = matches.slice(folderLibrary.page * folderLibrary.pageSize, (folderLibrary.page + 1) * folderLibrary.pageSize);
  $('folderMatchCount').textContent = matches.length + ' 份文件';
  $('folderFiles').replaceChildren(...visible.map(entry => {
    const row = el('label', 'folder-file-row' + (entry.unavailable ? ' unavailable' : ''));
    const check = el('input'); check.type = 'checkbox'; check.checked = folderLibrary.selected.has(entry.id); check.disabled = !!entry.unavailable || folderLibrary.busy;
    check.setAttribute('aria-label', '選取 ' + entry.path);
    check.dataset.entry = entry.id;
    check.addEventListener('change', () => { toggleFolderEntry(entry, check.checked); updateFolderSelection(); });
    const type = entry.file.name.split('.').pop().toLowerCase();
    const details = el('span', 'folder-file-detail'); details.append(el('strong', '', entry.file.name), el('small', '', entry.path.slice(0, entry.path.lastIndexOf('/'))));
    row.classList.toggle('selected', check.checked);
    row.append(check, el('span', 'file-type ' + type, type.toUpperCase()), details, el('span', 'folder-file-size', entry.unavailable || formatSize(entry.file.size)));
    return row;
  }));
  if (!visible.length) $('folderFiles').append(el('p', 'folder-empty', folderLibrary.root ? '沒有符合的文件，試試其他關鍵字或資料夾。' : '先選擇電腦中的資料夾，文件會出現在這裡。'));
  $('folderPage').textContent = (folderLibrary.page + 1) + ' / ' + totalPages;
  $('folderPrev').disabled = !folderLibrary.page; $('folderNext').disabled = folderLibrary.page + 1 >= totalPages;
  updateFolderSelection();
}
function selectedFolderEntries() { return folderLibrary.entries.filter(entry => folderLibrary.selected.has(entry.id)); }
function folderSelectionError(entries) {
  const files = folderLibrary.mode === 'paper' ? entries.map(entry => entry.file) : [...app.files];
  if (folderLibrary.mode !== 'paper') entries.forEach(entry => { if (!files.some(file => sameLocalFile(file, entry.file))) files.push(entry.file); });
  const max = folderLibrary.mode === 'paper' ? 1 : 5;
  if (files.length > max) return '一般分析最多 5 份（含原已選文件）；請分次選取。';
  if (files.reduce((sum, file) => sum + file.size, 0) > 80 * 1024 * 1024) return '所選文件合計超過 80 MB，請減少份數。';
  return '';
}
function toggleFolderEntry(entry, checked) {
  if (!checked) { folderLibrary.selected.delete(entry.id); return; }
  if (entry.unavailable) return;
  if (folderLibrary.mode === 'paper') folderLibrary.selected.clear();
  const error = folderSelectionError([...selectedFolderEntries(), entry]);
  if (error) { folderMessage(error); return; }
  folderLibrary.selected.add(entry.id); folderMessage('已勾選。確認後加入清單，再按開始分析。');
}
function updateFolderSelection() {
  const selected = selectedFolderEntries();
  $('folderFiles').querySelectorAll('input[data-entry]').forEach(check => { check.checked = folderLibrary.selected.has(check.dataset.entry); check.closest('label').classList.toggle('selected', check.checked); });
  $('folderSelectionCount').textContent = selected.length ? '已勾選 ' + selected.length + ' 份 · ' + formatSize(selected.reduce((sum, entry) => sum + entry.file.size, 0)) : '尚未勾選文件';
  $('useFolderSelection').disabled = folderLibrary.busy || !selected.length;
}
async function applyFolderSelection() {
  const entries = selectedFolderEntries(); if (!entries.length || folderLibrary.busy) return;
  folderBusy(true);
  try {
    // Re-read chosen handles to detect moved files and changes after the list was built.
    const fresh = [];
    for (const entry of entries) {
      const file = entry.handle ? await entry.handle.getFile() : entry.file;
      localFilePaths.set(file, entry.path);
      if (fileUnavailable(file)) throw new Error(file.name + '：' + fileUnavailable(file));
      fresh.push({...entry, file});
    }
    const error = folderSelectionError(fresh); if (error) throw new Error(error);
    if (folderLibrary.mode === 'paper') selectPaperFiles([fresh[0].file]);
    else { addFiles(fresh.map(entry => entry.file)); showView('workspace'); }
    $('folderDialog').close();
    if (folderLibrary.mode !== 'paper') { $('prompt').focus(); toast('文件已加入。確認提示詞後，點「開始分析」即可在右側查看結果。'); }
  } catch (error) { folderMessage(error.name === 'NotFoundError' || error.name === 'NotAllowedError' ? '所選文件已移動或無法讀取，請重新讀取資料夾後選取。' : error.message); }
  finally { folderBusy(false); }
}
$('browseFolder').addEventListener('click', () => openFolderLibrary('analysis'));
$('paperBrowseFolder').addEventListener('click', () => openFolderLibrary('paper'));
$('closeFolder').addEventListener('click', () => $('folderDialog').close());
$('chooseDirectory').addEventListener('click', chooseLocalDirectory);
$('compatibleDirectory').addEventListener('click', () => $('directoryInput').click());
$('reopenDirectory').addEventListener('click', reopenLocalDirectory);
$('directoryInput').addEventListener('change', event => { useDirectoryFiles(event.target.files); event.target.value = ''; });
$('forgetDirectory').addEventListener('click', async () => {
  try { await directoryStore('delete'); folderLibrary.savedHandle = null; $('reopenDirectory').hidden = true; $('forgetDirectory').hidden = true; folderMessage('已忘記上次資料夾；目前清單仍可選取，原始檔案未變更。'); }
  catch { folderMessage('瀏覽器未能清除記錄，請稍後再試。'); }
});
for (const id of ['folderSearch', 'folderType']) $(id).addEventListener(id === 'folderSearch' ? 'input' : 'change', () => { folderLibrary.page = 0; renderFolderLibrary(); });
$('folderClearSelection').addEventListener('click', () => { folderLibrary.selected.clear(); renderFolderLibrary(); });
$('folderSelectVisible').addEventListener('click', () => {
  folderMatches().slice(folderLibrary.page * folderLibrary.pageSize, (folderLibrary.page + 1) * folderLibrary.pageSize).forEach(entry => { if (!folderLibrary.selected.has(entry.id)) toggleFolderEntry(entry, true); }); renderFolderLibrary();
});
$('folderPrev').addEventListener('click', () => { folderLibrary.page--; renderFolderLibrary(); });
$('folderNext').addEventListener('click', () => { folderLibrary.page++; renderFolderLibrary(); });
$('useFolderSelection').addEventListener('click', applyFolderSelection);
void directoryStore('get').then(handle => {
  if (!folderLibrary.savedHandle && handle) { folderLibrary.savedHandle = handle; $('reopenDirectory').hidden = false; $('forgetDirectory').hidden = false; }
}).catch(() => {});
