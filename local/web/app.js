'use strict';
// Application-owned service messages; document and model content are never translated.
const serviceCopy = {
  "找不到所选 Gemini 模型或上传文件，请在连接设置中刷新模型列表。": "找不到所選 Gemini 模型或上傳文件，請在連接設定中重新整理模型列表。",
  "文件或请求超过 Gemini 的大小限制，请分拆后再试。": "文件或請求超過 Gemini 的大小限制，請分拆後再試。",
  "Gemini 配额或速率已达到上限。请检查 API 配额，稍后手动重试。": "Gemini 配額或速率已達到上限。請檢查 API 配額，稍後手動重試。",
  "Gemini 服务发生错误，请稍后重试。": "Gemini 服務發生錯誤，請稍後重試。",
  "Gemini 服务暂时繁忙，请稍后重试。": "Gemini 服務暫時繁忙，請稍後重試。",
  "Gemini 无法处理此请求。请检查模型是否支持 PDF 与结构化输出，以及文件是否加密、损坏或超过页数限制。": "Gemini 無法處理此請求。請檢查模型是否支持 PDF 與結構化輸出，以及文件是否加密、損壞或超過頁數限制。",
  "Gemini 请求失败（HTTP ": "Gemini 請求失敗（HTTP ",
  "）。请稍后重试。": "）。請稍後重試。",
  "分析结果缺少必要字段，未作为完整报告保存。请重试。": "分析結果缺少必要欄位，未作為完整報告儲存。請重試。",
  "分析时间：": "分析時間：",
  "上传请求格式不正确。": "上傳請求格式不正確。",
  "无法读取上传文件。": "無法讀取上傳文件。",
  "Word 文件格式不正确或已加密，请重新另存为 DOCX 或 PDF。": "Word 文件格式不正確或已加密，請重新另存為 DOCX 或 PDF。",
  "Gemini 返回了无法验证的上传地址。": "Gemini 返回了無法驗證的上傳地址。",
  "这个 API Key 没有可用的文字分析模型，请检查项目权限。": "這個 API Key 沒有可用的文字分析模型，請檢查項目權限。",
  "Gemini 未返回文件上传地址，请稍后重试。": "Gemini 未返回文件上傳地址，請稍後重試。",
  "Gemini 文件上传响应缺少有效的文件编号。": "Gemini 文件上傳響應缺少有效的文件編號。",
  "Gemini 无法读取此 PDF。请检查文件是否加密、损坏或超过 1,000 页。": "Gemini 無法讀取此 PDF。請檢查文件是否加密、損壞或超過 1,000 頁。",
  "Gemini 没有返回分析内容，可能触发了内容限制。请调整文件或提示词。": "Gemini 沒有返回分析內容，可能觸發了內容限制。請調整文件或提示詞。",
  "Gemini 未完整完成分析。请检查内容限制或调整提示词后重试。": "Gemini 未完整完成分析。請檢查內容限制或調整提示詞後重試。",
  "## 待确认事项": "## 待確認事項",
  "每次请选择 1–5 个 PDF 或 DOCX 文件。": "每次請選擇 1–5 個 PDF 或 DOCX 文件。",
  "单次上传总大小最多 80 MB，请分批分析。": "單次上傳總大小最多 80 MB，請分批分析。",
  "仅允许从本机网址访问。": "僅允许從本機網址訪問。",
  "不允许其他网站访问本机服务。": "不允许其他網站訪問本機服務。",
  "不允许跨网站请求。": "不允许跨網站請求。",
  "页面连接已过期，请刷新网页再试。": "頁面連接已過期，請重新整理網頁再試。",
  "请求过大，请减少上传文件。": "請求過大，請減少上傳文件。",
  "文件未完整上传，请重试。": "文件未完整上傳，請重試。",
  "Word 文件解压后的内容过大，请转换成 PDF 后上传。": "Word 文件解压後的內容過大，請轉換成 PDF 後上傳。",
  "Word 文字内容过大，请分拆文件。": "Word 文字內容過大，請分拆文件。",
  "无法读取这个 Word 文件，请重新另存为 DOCX 或 PDF。": "無法讀取這個 Word 文件，請重新另存為 DOCX 或 PDF。",
  "这个 Word 文件没有可读取文字。若内容为图片，请先转成 PDF。": "這個 Word 文件沒有可讀取文字。若內容為圖片，請先轉成 PDF。",
  "Word 文字内容过长，请分拆文件后再分析。": "Word 文字內容過長，請分拆文件後再分析。",
  "连接 Gemini 超时或网络不可用。请检查网络；请求可能已被处理，重试可能另行计费。": "連接 Gemini 超時或網絡不可用。請檢查網絡；請求可能已被處理，重試可能另行計费。",
  "Gemini 返回了无法解析的响应，请稍后重试。": "Gemini 返回了無法解析的響應，請稍後重試。",
  "Gemini 文件预处理超时，请稍后重试。": "Gemini 文件預處理超時，請稍後重試。",
  "分析结果超过输出长度限制。请缩小分析范围、减少文件，或要求更简短的结果。": "分析結果超過輸出長度限制。請缩小分析范围、減少文件，或要求更簡短的結果。",
  "Gemini 返回的结果不符合所需格式，请重试或调整提示词。": "Gemini 返回的結果不符合所需格式，請重試或調整提示詞。",
  "提示词不可留空，最多 30,000 个字符。": "提示詞不可留空，最多 30,000 個字元。",
  "请输入有效的 Gemini 模型编号。": "請輸入有效的 Gemini 模型編號。",
  "请输入完整的本地输出资料夹路径。": "請輸入完整的本地輸出資料夾路徑。",
  "请使用本机磁盘资料夹，不支持网络共享路径。": "請使用本機磁盤資料夾，不支持網絡共享路徑。",
  "仅支持 PDF 与 DOCX。旧版 DOC 请先另存为 DOCX 或 PDF。": "僅支持 PDF 與 DOCX。舊版 DOC 請先另存為 DOCX 或 PDF。",
  "已有文件正在分析，请等待完成后再开始。": "已有文件正在分析，請等待完成後再開始。",
  "请先打开连接设置，填写 API Key 并验证连接。": "請先打開連接設定，填寫 API Key 並驗證連接。",
  "DOCX 以正文文字与表格单元格文字进行分析，不包含图片、公式对象、页眉页脚或原始版面；需要完整视觉内容时请上传 PDF。": "DOCX 以正文文字與表格單元格文字進行分析，不包含圖片、公式對象、頁眉頁腳或原始版面；需要完整視覺內容時請上傳 PDF。",
  "上传并读取文件": "上傳並讀取文件",
  "保存分析结果": "儲存分析結果",
  "分析完成，已保存到本地": "分析完成，已儲存到本地",
  "请求长度不正确。": "請求長度不正確。",
  "找不到页面。": "找不到頁面。",
  "请求格式不正确。": "請求格式不正確。",
  "无法写入这个资料夹，请选择有写入权限的位置。": "無法寫入這個資料夾，請選擇有寫入權限的位置。",
  "：文件为空或超过单档 50 MB 限制。": "：文件為空或超過單檔 50 MB 限制。",
  "本地保存失败": "本地儲存失敗",
  "无法保存结果，可能是磁盘空间或资料夹权限问题。已收到的分析内容仍会保留在本机历史记录中。": "無法儲存結果，可能是磁盤空間或資料夾權限問題。已收到的分析內容仍會保留在本機歷史記錄中。",
  "处理时发生错误，请检查文件格式后重试。": "處理時發生錯誤，請檢查文件格式後重試。",
  "Google 上传暂存文件未能立即删除；Files API 通常会在 48 小时后自动清除。": "Google 上傳暫存文件未能立即刪除；Files API 通常會在 48 小時後自動清除。",
  "找不到这次分析记录。": "找不到這次分析記錄。",
  "找不到结果文件。": "找不到結果文件。",
  "文件已被移动或删除，请检查输出资料夹。": "文件已被移動或刪除，請檢查輸出資料夾。",
  "读取本地文件失败。": "讀取本地文件失敗。",
  "API Key 格式不正确。": "API Key 格式不正確。",
  "请复制资料夹路径，在文件管理器中打开。": "請複製資料夾路徑，在檔案總管中打開。",
  "请求内容格式不正确。": "請求內容格式不正確。",
  "本机读写失败，请检查资料夹权限。": "本機讀寫失敗，請檢查資料夾權限。",
  "本机服务发生错误，请刷新页面后重试。": "本機服務發生錯誤，請重新整理頁面後重試。",
  "处理已中断": "處理已中斷",
  "本机服务曾关闭或重启，请重新选择文件后分析。": "本機服務曾關閉或重启，請重新選擇文件後分析。",
  "设置格式不正确。": "設定格式不正確。",
  "请等待当前分析完成后再断开连接。": "請等待當前分析完成後再斷開連接。"
};
function uiMessage(value) {
  if (typeof value !== 'string') return value || '';
  if (Object.hasOwn(serviceCopy, value)) return serviceCopy[value];
  const prepared = /^已准备 (\d+)\/(\d+) 个文件$/.exec(value);
  if (prepared) return `已準備 ${prepared[1]}/${prepared[2]} 個文件`;
  // Known file errors have an interpolated filename. Preserve the filename byte-for-byte.
  for (const [suffix, translated] of Object.entries(serviceCopy)) {
    if (suffix.startsWith('：') && value.endsWith(suffix)) return value.slice(0, -suffix.length) + translated;
  }
  return value;
}


const $ = id => document.getElementById(id);
const app = { state: null, files: [], preset: 'summary', currentJob: null, renderKey: '', view: 'editor', polling: false, submitting: false, errors: 0 };
let toastTimer;
const labels = { queued: '準備中', running: '分析中', completed: '已完成', failed: '未完成' };
const badgeClass = { queued: 'running', running: 'running', completed: 'done', failed: 'failed' };

function icon(name) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#i-' + name);
  svg.append(use);
  return svg;
}
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function toast(message, error = false) {
  clearTimeout(toastTimer);
  $('toast').textContent = message;
  $('toast').className = 'toast' + (error ? ' error' : '');
  $('toast').hidden = false;
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, error ? 6500 : 3500);
}
async function api(path, { method = 'GET', body } = {}) {
  const headers = {};
  if (method !== 'GET') headers['X-Local-Token'] = app.state?.token || '';
  if (body !== undefined && !(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(body);
  }
  let response;
  try { response = await fetch(path, { method, headers, body, credentials: 'same-origin', cache: 'no-store' }); }
  catch { throw new Error('無法連接本機服務，請確認 start.cmd 仍在運行。'); }
  const result = await response.json().catch(() => ({ error: '伺服器返回了無法讀取的內容。' }));
  if (!response.ok) throw new Error(uiMessage(result.error) || '操作失敗，請重試。');
  return result;
}
function formatSize(size) { return size < 1024 * 1024 ? (size / 1024).toFixed(0) + ' KB' : (size / 1024 / 1024).toFixed(1) + ' MB'; }
function formatDate(value) { return new Intl.DateTimeFormat('zh-TW', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(value)); }

function renderState(initial = false) {
  const state = app.state;
  $('connectionText').textContent = state.verified ? 'Gemini · 已取得模型清單' : state.configured ? 'Key 已設定 · 待驗證' : '連接 Gemini';
  $('connectionDot').classList.toggle('amber', !state.verified);
  $('settingsKeyStatus').textContent = state.verified ? '模型清單已驗證' : state.configured ? '已設定，尚未驗證' : '尚未連接';
  $('appVersion').textContent = 'v' + (state.version || '1.0.0');
  $('backendUpdateNotice').hidden = (state.key_input_revision || 0) >= 2 && (state.diagnostics_revision || 0) >= 1;
  $('apiKey').placeholder = state.configured ? '留空可驗證現有 Key，或貼上新 Key' : '在此貼上你的 API Key';
  $('disconnectKey').hidden = !state.configured;
  $('disconnectKey').disabled = state.busy;
  $('outputPath').textContent = state.settings.output_dir;
  $('outputPath').title = state.settings.output_dir;
  $('historyCount').textContent = state.jobs.length;
  $('historyTotal').textContent = state.jobs.length;
  const modelKey = state.models.map(m => m.id).join(',');
  if ($('modelOptions').dataset.models !== modelKey) {
    $('modelOptions').replaceChildren(...state.models.map(model => {
      const option = el('option'); option.value = model.id; option.label = model.name; return option;
    }));
    $('modelOptions').dataset.models = modelKey;
  }
  if (initial) {
    $('prompt').value = state.settings.prompt;
    $('modelInput').value = state.settings.model;
    app.preset = state.settings.preset;
    renderPresets();
    updatePromptCount();
  }
  updateAnalyze();
  notifyEditorGemini();
  renderRecent();
  if (app.view === 'history') renderHistory();
}

function updateAnalyze() {
  const busy = app.submitting || app.state?.busy;
  $('analyzeButton').disabled = Boolean(busy);
  $('analyzeLabel').textContent = app.submitting ? '正在上傳至本機…' : app.state?.busy ? '正在分析，請稍候' : '開始分析';
  $('submitNote').textContent = busy ? '保持本機服務運行，完成後會自動儲存結果。' : '點擊後，所選文件將發送至 Google Gemini。';
}

function addFiles(incoming) {
  const next = [...app.files];
  let rejected = [];
  for (const file of incoming) {
    if (!/\.(pdf|docx)$/i.test(file.name)) { rejected.push(file.name + '：僅支持 PDF / DOCX'); continue; }
    if (!file.size || file.size > 50 * 1024 * 1024) { rejected.push(file.name + '：文件為空或超過 50 MB'); continue; }
    if (next.some(f => typeof sameLocalFile === 'function' ? sameLocalFile(f, file) : f.name === file.name && f.size === file.size && f.lastModified === file.lastModified)) continue;
    if (next.length >= 5) { rejected.push('每次最多選擇 5 份文件'); break; }
    if (next.reduce((sum, f) => sum + f.size, 0) + file.size > 80 * 1024 * 1024) { rejected.push('單次文件總大小不可超過 80 MB'); continue; }
    next.push(file);
  }
  app.files = next;
  renderFiles();
  if (rejected.length) toast(rejected.join('；'), true);
}
function renderFiles() {
  $('fileList').replaceChildren(...app.files.map((file, index) => {
    const type = file.name.split('.').pop().toLowerCase();
    const item = el('li', 'file-item');
    const details = el('div', 'file-details');
    const title = el('strong', '', file.name); title.title = file.name;
    details.append(title, el('small', '', formatSize(file.size) + ' · 等待分析'));
    const localPath = typeof fileLocalPath === 'function' ? fileLocalPath(file) : file.name;
    if (localPath !== file.name) { const path = el('small', 'selected-file-path', localPath); path.title = localPath; details.append(path); }
    const remove = el('button', 'file-remove'); remove.type = 'button'; remove.setAttribute('aria-label', '移除 ' + file.name); remove.append(icon('close'));
    remove.addEventListener('click', () => { app.files.splice(index, 1); renderFiles(); });
    item.append(el('span', 'file-type ' + type, type.toUpperCase()), details, remove);
    return item;
  }));
  $('docxHint').hidden = !app.files.some(file => /\.docx$/i.test(file.name));
  $('dropzone').querySelector('strong').textContent = app.files.length ? '繼續添加文件' : '把文件拖到這裡';
}
function renderPresets() {
  document.querySelectorAll('[data-preset]').forEach(button => {
    button.classList.toggle('selected', button.dataset.preset === app.preset);
    button.setAttribute('aria-pressed', String(button.dataset.preset === app.preset));
  });
}
function updatePromptCount() { $('promptLength').textContent = $('prompt').value.length.toLocaleString() + ' 字'; }
async function saveTask() {
  if (!app.state) throw new Error('本機服務尚未連接。');
  const settings = await api('/api/settings', { method: 'POST', body: { prompt: $('prompt').value, model: $('modelInput').value, preset: app.preset } });
  app.state.settings = settings;
  return settings;
}

function showView(view) {
  $('workspaceView').hidden = true; $('historyView').hidden = true; $('editorView').hidden = false;
  if (view !== 'editor') { openGeminiPanel(view === 'history' ? 'history' : 'analysis'); return; }
  app.view = 'editor'; $('geminiDialog').close();
  ensureEditor().then(editor => { editor?.refreshLayout(); notifyEditorGemini(); }).catch(error => toast(error.message, true));
}

let editorPromise = null;
function ensureEditor() {
  if (!app.state?.editor_revision) {
    $('editorUnavailable').hidden = false;
    $('editorStatus').textContent = '等待重新啟動本機服務';
    return Promise.reject(new Error('請重新啟動 start.cmd，載入學術筆記功能。'));
  }
  $('editorUnavailable').hidden = true;
  const frame = $('editorFrame'); frame.hidden = false;
  if (!editorPromise) {
    $('editorLoadError').hidden = true;
    $('editorStatus').textContent = '正在載入編輯器…';
    editorPromise = new Promise((resolve, reject) => {
      const cleanup = () => {
        clearTimeout(timer);
        frame.removeEventListener('load', onLoad);
        frame.removeEventListener('error', onError);
      };
      const fail = error => { cleanup(); reject(error); };
      const onError = () => fail(new Error('無法讀取編輯器頁面，請確認本機服務仍在執行。'));
      const onLoad = async () => {
        try {
          // The initial about:blank load is not the requested editor document.
          if (frame.contentWindow.location.href === 'about:blank') return;
          cleanup();
          const editor = frame.contentWindow.PaperworkEditor;
          if (!editor) throw new Error('編輯器程式未能啟動，請按「重新載入編輯器」重試。');
          await editor.ready; resolve(editor);
        } catch (error) { fail(error); }
      };
      const timer = setTimeout(() => fail(new Error('編輯器頁面載入逾時，請確認本機服務仍在執行後重試。')), 30000);
      frame.addEventListener('load', onLoad);
      frame.addEventListener('error', onError);
      frame.src = '/editor';
    }).catch(error => {
      // A failed attempt must not permanently cache a rejected Promise.
      editorPromise = null;
      frame.hidden = true;
      $('editorLoadErrorText').textContent = error.message;
      $('editorLoadError').hidden = false;
      $('editorStatus').textContent = '編輯器載入失敗';
      throw error;
    });
  }
  return editorPromise;
}
$('retryEditor').addEventListener('click', () => {
  ensureEditor().then(editor => { editor.refreshLayout(); notifyEditorGemini(); }).catch(error => toast(error.message, true));
});
function editorReportHTML(job) {
  const body = document.createElement('div');
  body.append(el('h1', '', job.result.title), el('p', '', '來源：' + job.files.map(file => file.name).join('、')),
    el('p', '', formatDate(job.created) + ' · ' + job.model), el('h2', '', '摘要'), el('p', '', job.result.summary));
  for (const section of job.result.sections) {
    body.append(el('h2', '', section.heading), renderMarkdown(section.content, true));
  }
  if (job.result.cautions.length) {
    body.append(el('h2', '', '待確認事項'));
    const list = el('ul'); job.result.cautions.forEach(item => list.append(el('li', '', item))); body.append(list);
  }
  body.querySelectorAll('.table-scroll').forEach(wrapper => wrapper.replaceWith(...wrapper.childNodes));
  return body.innerHTML;
}
async function editCurrentReport(forceNew = false) {
  const job = app.currentJob;
  if (!job?.result) return;
  $('editReport').disabled = true;
  try {
    showView('editor');
    const editor = await ensureEditor();
    const target = editorJobTarget(job.id);
    if (job.kind === 'paper' || target) {
      await editor.importPaper({jobId: job.id, title: job.result.title, html: editorReportHTML(job), concepts: job.result.concepts || [], options: forceNew === true ? {mode: 'new'} : job.paper_options || target});
      markEditorJobDelivered(job.id); return true;
    }
    const imported = await editor.importReport({jobId: job.id, title: job.result.title, html: editorReportHTML(job)});
    toast(imported.existing ? '已開啟這份報告的既有筆記，保留你的編輯。' : '已加入「Gemini 分析筆記」並存回本機。');
    markEditorJobDelivered(job.id); return true;
  } catch (error) { toast(error.message, true); return false; }
  finally { $('editReport').disabled = false; }
}
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== $('editorFrame').contentWindow || event.data?.type !== 'paperwork-editor-status') return;
  const status = event.data;
  app.editorDirty = Boolean(status.dirty);
  $('editorStatus').textContent = status.text;
  $('editorStatus').classList.toggle('save-error', status.state === 'error');
  $('editorSaveLocation').textContent = status.path ? '筆記庫：' + status.path : '';
});
window.addEventListener('beforeunload', event => {
  if (app.editorDirty) {
    $('editorFrame').contentWindow.PaperworkEditor?.captureDraft();
    event.preventDefault(); event.returnValue = '';
  }
});
function openSettings(focusKey = false) {
  if (!app.state) { toast('本機服務尚未連接，請重新整理頁面。', true); return; }
  $('outputDirectory').value = app.state.settings.output_dir;
  $('apiKey').value = '';
  $('keyFeedback').hidden = true;
  $('settingsFeedback').textContent = '';
  $('geminiDialog').close();
  $('settingsDialog').showModal();
  setTimeout(() => (focusKey ? $('apiKey') : $('outputDirectory')).focus(), 30);
}

async function beginAnalysis() {
  if (app.submitting || app.state?.busy) return;
  if (!app.state?.configured) { openSettings(true); toast('先連接 Gemini，就可以開始分析。'); return; }
  if (!app.files.length) { toast('請先選擇至少一份 PDF 或 DOCX。', true); $('dropzone').focus(); return; }
  if (!$('prompt').value.trim()) { toast('請輸入分析提示詞。', true); $('prompt').focus(); return; }
  app.submitting = true; updateAnalyze();
  let editor = null, target = null, accepted = false;
  try {
    editor = await ensureEditor();
    const mode = document.querySelector('[name="analysisDestination"]:checked').value;
    target = mode === 'insert' ? {mode, ...editor.captureTarget()} : {mode};
    if (mode === 'insert' && !await editor.save()) throw new Error('目前筆記尚未成功存檔，請先處理存檔狀態。');
    await saveTask();
    const data = new FormData();
    app.files.forEach(file => data.append('files', file, file.name));
    data.append('prompt', $('prompt').value);
    data.append('model', $('modelInput').value.trim());
    const job = await api('/api/analyze', { method: 'POST', body: data });
    accepted = true; rememberEditorJob(job.id, target);
    app.currentJob = job;
    app.renderKey = '';
    app.state.busy = true;
    showView('editor');
    renderJob(job);
    toast('Gemini 已開始分析。可以繼續編輯，完成後會直接放入筆記。');
    await refresh();
  } catch (error) { if (!accepted && target?.marker && editor) { editor.cancelTarget(target); void editor.save(); } toast(error.message, true); }
  finally { app.submitting = false; updateAnalyze(); }
}

function renderRecent() {
  if (!app.state.jobs.length) return;
  $('recentJobs').replaceChildren(...app.state.jobs.slice(0, 5).map(job => {
    const button = el('button', 'recent-job'); button.type = 'button'; button.title = job.title;
    button.append(icon('file'), el('span', '', job.title));
    button.addEventListener('click', () => selectJob(job.id));
    return button;
  }));
}
function renderHistory() {
  if (!app.state) return;
  const query = $('historySearch').value.trim().toLowerCase();
  const jobs = app.state.jobs.filter(job => (job.title + ' ' + job.files.map(f => f.name).join(' ')).toLowerCase().includes(query));
  if (!jobs.length) {
    const empty = el('div', 'history-empty');
    empty.append(icon('clock'), el('h3', '', query ? '還沒有找到這份記錄' : '你的文件故事，從第一份分析開始'), el('p', '', query ? '試試其他文件名或關鍵詞。' : '完成分析後，結果會自動儲存在這裡。'));
    $('historyList').replaceChildren(empty);
    return;
  }
  $('historyList').replaceChildren(...jobs.map(job => {
    const button = el('button', 'history-row'); button.type = 'button';
    const info = el('div', 'history-info');
    info.append(el('strong', '', job.title), el('p', '', formatDate(job.created) + ' · ' + job.files.length + ' 份文件 · ' + job.files.map(f => f.name).join('、')));
    button.append(el('span', 'file-type', 'DOC'), info, el('span', 'result-badge ' + badgeClass[job.status], labels[job.status]), icon('arrow'));
    button.addEventListener('click', () => selectJob(job.id));
    return button;
  }));
}
async function selectJob(id) {
  try {
    const job = await api('/api/jobs/' + encodeURIComponent(id));
    app.currentJob = job; app.renderKey = '';
    openGeminiPanel('results'); renderJob(job);
  } catch (error) { toast(error.message, true); }
}
function displayResultPart(id) {
  ['resultEmpty', 'processing', 'resultError', 'resultContent'].forEach(part => { $(part).hidden = part !== id; });
  $('resultsFooter').hidden = id === 'resultContent';
}
function renderJob(job) {
  renderEditorJobTray(job);
  const signature = JSON.stringify([job.id, job.status, job.progress, job.stage, job.error, job.warnings, job.artifacts, Boolean(job.result)]);
  const seconds = Math.max(0, Math.floor((Date.now() - Date.parse(job.created)) / 1000));
  $('elapsed').textContent = seconds < 60 ? seconds + ' 秒' : Math.floor(seconds / 60) + ' 分 ' + seconds % 60 + ' 秒';
  if (app.renderKey === signature) return;
  app.renderKey = signature;
  $('resultBadge').textContent = labels[job.status] || '等待分析';
  $('resultBadge').className = 'result-badge ' + (badgeClass[job.status] || '');
  if (job.status === 'running' || job.status === 'queued') {
    displayResultPart('processing');
    $('stageText').textContent = uiMessage(job.stage);
    $('jobProgress').value = job.progress;
    $('progressLabel').textContent = job.progress < 50 ? '讀取文件' : job.progress < 90 ? '生成分析內容' : '儲存至本地';
    return;
  }
  if (job.status === 'failed' && !job.result) {
    displayResultPart('resultError');
    $('errorText').textContent = (job.failed_stage ? '失敗階段：' + uiMessage(job.failed_stage) + '。' : '') + uiMessage(job.error);
    return;
  }
  if (!job.result) { displayResultPart('resultEmpty'); return; }
  displayResultPart('resultContent');
  const result = job.result;
  $('editReport').textContent = job.kind === 'paper' ? '開啟摘要／提煉卡片' : '送到筆記編輯器';
  $('paperRetryNew').hidden = !((job.paper_options || editorJobTarget(job.id))?.mode === 'insert');
  const title = el('h1', '', result.title);
  const meta = el('div', 'report-meta', formatDate(job.created) + ' · ' + job.model + ' · ' + job.files.length + ' 份文件');
  const summary = el('div', 'report-summary', result.summary);
  const contents = [title, meta, summary];
  for (const section of result.sections) {
    const block = el('section');
    block.append(el('h2', '', section.heading), renderMarkdown(section.content));
    contents.push(block);
  }
  if (result.cautions.length) {
    const block = el('section'); const list = el('ul');
    result.cautions.forEach(text => list.append(el('li', '', text)));
    block.append(el('h2', '', '待確認事項'), list); contents.push(block);
  }
  $('reportBody').replaceChildren(...contents);
  $('rawResult').textContent = JSON.stringify(result, null, 2);
  const warnings = [...(job.warnings || [])];
  if (job.error) warnings.push(job.error);
  $('resultWarnings').hidden = !warnings.length;
  $('resultWarnings').replaceChildren(...warnings.map(warning => el('p', '', uiMessage(warning))));
  const formats = { 'report.md': 'Markdown', 'report.txt': 'TXT', 'report.html': 'HTML', 'result.json': 'JSON' };
  $('downloads').replaceChildren(...(job.artifacts || []).map(name => {
    const link = el('a', '', formats[name]);
    link.href = '/api/download/' + encodeURIComponent(job.id) + '/' + encodeURIComponent(name);
    link.download = name;
    return link;
  }));
  $('savedPath').textContent = job.result_dir ? '已儲存至 ' + job.result_dir : '報告內容已保留在本機歷史記錄中，可先複製結果。';
  $('openResultFolder').hidden = !job.result_dir;
  setResultTab(false);
}

// A small, deliberately limited Markdown renderer. Raw HTML and executable URLs are never accepted.
function escapeHtml(text) { return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;'); }
function inline(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
function renderMarkdown(text, preserveHeadings = false) {
  const fragment = document.createDocumentFragment();
  const lines = String(text).replace(/\r\n/g, '\n').split('\n');
  const cellParts = line => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(s => s.trim());
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    if (/^\s*```/.test(line)) {
      const code = []; while (++i < lines.length && !/^\s*```/.test(lines[i])) code.push(lines[i]);
      fragment.append(el('pre', '', code.join('\n'))); continue;
    }
    if (line.includes('|') && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1]) && cellParts(lines[i + 1]).every(c => /^:?-{3,}:?$/.test(c))) {
      const table = el('table'); const head = el('thead'); const row = el('tr');
      cellParts(line).forEach(c => { const th = el('th'); th.innerHTML = inline(c); row.append(th); });
      head.append(row); table.append(head); i++;
      const body = el('tbody');
      while (i + 1 < lines.length && lines[i + 1].includes('|') && lines[i + 1].trim()) {
        const row = el('tr'); cellParts(lines[++i]).forEach(c => { const td = el('td'); td.innerHTML = inline(c); row.append(td); }); body.append(row);
      }
      table.append(body); const wrapper = el('div', 'table-scroll'); wrapper.append(table); fragment.append(wrapper); continue;
    }
    const heading = line.match(/^\s*(#{1,9})\s+(.+)/);
    if (heading) { const level = Math.min(9, heading[1].length + 2); const h = el(preserveHeadings ? 'h' + Math.min(6, level) : 'h3'); if (preserveHeadings && level > 6) h.dataset.lv = String(level); h.innerHTML = inline(heading[2]); fragment.append(h); continue; }
    const listMatch = line.match(/^\s*(?:[-*+]\s+|\d+[.)]\s+)(.*)/);
    if (listMatch) {
      const ordered = /^\s*\d/.test(line); const list = el(ordered ? 'ol' : 'ul');
      const pattern = ordered ? /^\s*\d+[.)]\s+(.*)/ : /^\s*[-*+]\s+(.*)/;
      for (;;) {
        const match = lines[i].match(pattern); const item = el('li'); item.innerHTML = inline(match[1]); list.append(item);
        if (i + 1 >= lines.length || !pattern.test(lines[i + 1])) break;
        i++;
      }
      fragment.append(list); continue;
    }
    const paragraph = el(line.startsWith('>') ? 'blockquote' : 'p');
    paragraph.innerHTML = inline(line.replace(/^>\s?/, ''));
    fragment.append(paragraph);
  }
  return fragment;
}
function setResultTab(raw) {
  $('reportBody').hidden = raw; $('rawResult').hidden = !raw;
  $('readTab').classList.toggle('active', !raw); $('rawTab').classList.toggle('active', raw);
  $('readTab').setAttribute('aria-selected', String(!raw)); $('rawTab').setAttribute('aria-selected', String(raw));
}
function resultText() {
  const result = app.currentJob?.result;
  if (!result) return '';
  return '# ' + result.title + '\n\n' + result.summary + '\n\n' + result.sections.map(s => '## ' + s.heading + '\n\n' + s.content).join('\n\n') + (result.cautions.length ? '\n\n## 待確認事項\n\n' + result.cautions.map(c => '- ' + c).join('\n') : '');
}

// The A4 editor is the workspace; Gemini is a modal tool on its toolbar.
const EDITOR_JOBS = 'paperwork.editor-jobs';
let editorJobRecords = {};
try { editorJobRecords = JSON.parse(sessionStorage.getItem(EDITOR_JOBS) || '{}'); if (!editorJobRecords || Array.isArray(editorJobRecords) || typeof editorJobRecords !== 'object') editorJobRecords = {}; } catch {}
let finishingEditorJob = false, hiddenTrayJob = '', lastTrayState = '';
function storeEditorJobs() { try { sessionStorage.setItem(EDITOR_JOBS, JSON.stringify(editorJobRecords)); } catch {} }
function rememberEditorJob(id, target) {
  editorJobRecords[id] = {target, pending: true};
  const ids = Object.keys(editorJobRecords);
  while (ids.length > 100) delete editorJobRecords[ids.shift()];
  storeEditorJobs();
}
function editorJobTarget(id) { return editorJobRecords[id]?.target; }
function markEditorJobDelivered(id) {
  if (!editorJobRecords[id]) editorJobRecords[id] = {target: app.currentJob?.paper_options || {mode: 'new'}};
  editorJobRecords[id].pending = false; editorJobRecords[id].delivered = true; storeEditorJobs();
  if (app.currentJob?.id === id) renderEditorJobTray(app.currentJob, true);
}
function notifyEditorGemini() {
  $('editorFrame').contentWindow?.postMessage({type: 'paperwork-gemini-state', configured: !!app.state?.configured, busy: !!app.state?.busy}, location.origin);
}
function openGeminiPanel(panel = 'analysis') {
  if (panel === 'auto') panel = app.currentJob && !editorJobRecords[app.currentJob.id]?.delivered ? 'results' : 'analysis';
  app.view = panel === 'history' ? 'history' : 'editor';
  for (const [name, id] of [['analysis', 'geminiAnalysisPane'], ['results', 'geminiResultsPane'], ['history', 'geminiHistoryPane']]) $(id).hidden = panel !== name;
  for (const [name, id] of [['analysis', 'geminiAnalysisTab'], ['results', 'geminiResultTab'], ['history', 'geminiHistoryTab']]) {
    $(id).classList.toggle('selected', panel === name); $(id).setAttribute('aria-pressed', String(panel === name));
  }
  $('geminiDialog').dataset.panel = panel;
  if (panel === 'history') renderHistory();
  if (!$('geminiDialog').open) $('geminiDialog').showModal();
}
function renderEditorJobTray(job, delivered = false) {
  const state = job.id + ':' + job.status + ':' + (delivered || editorJobRecords[job.id]?.delivered ? 'delivered' : '');
  if (state !== lastTrayState) { hiddenTrayJob = ''; lastTrayState = state; }
  $('editorJobTray').hidden = hiddenTrayJob === state;
  const done = delivered || editorJobRecords[job.id]?.delivered;
  $('editorJobTitle').textContent = done ? '分析已放入筆記' : job.status === 'failed' ? 'Gemini 分析未完成' : job.status === 'completed' ? 'Gemini 分析完成' : 'Gemini 正在分析';
  $('editorJobDetail').textContent = done ? '點此查看來源報告與下載結果' : job.status === 'failed' ? '點此查看原因與重試' : job.status === 'completed' ? '點此查看結果或送入筆記' : (uiMessage(job.stage) || '正在準備文件') + ' · 可繼續編輯';
  $('editorJobProgress').value = job.progress || 0;
  $('editorJobProgress').hidden = !['queued', 'running'].includes(job.status);
}
async function maybeFinishEditorJob(job) {
  const record = editorJobRecords[job.id];
  if (finishingEditorJob || !record?.pending || !['completed', 'failed'].includes(job.status)) return;
  finishingEditorJob = true;
  // A failed handoff is available from the result button; avoid repeated automatic insert attempts.
  record.pending = false; storeEditorJobs();
  try {
    if (job.status === 'failed') {
      const editor = await ensureEditor(); editor.cancelTarget(record.target); await editor.save();
      toast('Gemini 分析未完成；筆記已保留。點右下角狀態查看原因。', true); return;
    }
    app.currentJob = job; await editCurrentReport();
  } finally { finishingEditorJob = false; }
}
function mountEditorWorkspace() {
  $('geminiAnalysisPane').append(document.querySelector('.setup-content'));
  $('analyzeButton').before($('analysisDestination'));
  $('geminiResultsPane').append(document.querySelector('.results-panel'));
  $('geminiHistoryPane').append(document.querySelector('.history-tools'), $('historyList'));
  $('submitNote').textContent = '所選文件會送至 Gemini；完成後直接放進筆記並存回本機。';
  $('closeGemini').addEventListener('click', () => $('geminiDialog').close());
  $('geminiDialog').addEventListener('close', () => { app.view = 'editor'; });
  $('geminiAnalysisTab').addEventListener('click', () => openGeminiPanel('analysis'));
  $('geminiHistoryTab').addEventListener('click', () => openGeminiPanel('history'));
  $('geminiResultTab').addEventListener('click', () => openGeminiPanel('results'));
  $('geminiPaperTab').addEventListener('click', () => { $('geminiDialog').close(); void openPaperWizard(); });
  $('geminiSettings').addEventListener('click', () => openSettings(true));
  $('editorJobOpen').addEventListener('click', () => openGeminiPanel('results'));
  $('editorJobDismiss').addEventListener('click', () => { hiddenTrayJob = lastTrayState; $('editorJobTray').hidden = true; });
}
window.addEventListener('message', event => {
  if (event.origin !== location.origin || event.source !== $('editorFrame').contentWindow || !['paperwork-gemini-open', 'paperwork-paper-open'].includes(event.data?.type)) return;
  openGeminiPanel('auto');
});

async function refresh(initial = false) {
  if (app.polling) return;
  app.polling = true;
  try {
    app.state = await api('/api/state');
    $('connectionLost').hidden = true; app.errors = 0;
    renderState(initial);
    if (initial) {
      showView('editor');
      if (typeof restoreSavedGemini === 'function') void restoreSavedGemini().then(() => renderState()).catch(error => toast(error.message, true));
      const active = app.state.jobs.find(j => ['queued', 'running'].includes(j.status));
      const pending = typeof pendingPaperJobId === 'function' ? pendingPaperJobId() : '';
      if (active) app.currentJob = active;
      else if (pending) app.currentJob = app.state.jobs.find(job => job.id === pending) || null;
      else app.currentJob = app.state.jobs.find(job => editorJobRecords[job.id]?.pending) || null;
    }
    if (app.currentJob) {
      const id = app.currentJob.id;
      const job = await api('/api/jobs/' + encodeURIComponent(id));
      if (app.currentJob?.id === id) { app.currentJob = job; renderJob(job); }
      if (typeof maybeFinishPaper === 'function') void maybeFinishPaper(job).catch(error => toast(error.message, true));
      void maybeFinishEditorJob(job).catch(error => toast(error.message, true));
    }
  } catch (error) {
    app.errors++;
    if (initial || app.errors >= 2) $('connectionLost').hidden = false;
  } finally { app.polling = false; }
}

$('dropzone').addEventListener('click', () => $('fileInput').click());
$('fileInput').addEventListener('change', event => { addFiles(event.target.files); event.target.value = ''; });
for (const type of ['dragenter', 'dragover']) $('dropzone').addEventListener(type, event => { event.preventDefault(); $('dropzone').classList.add('dragover'); });
for (const type of ['dragleave', 'drop']) $('dropzone').addEventListener(type, event => { event.preventDefault(); $('dropzone').classList.remove('dragover'); });
$('dropzone').addEventListener('drop', event => addFiles(event.dataTransfer.files));
document.addEventListener('dragover', event => event.preventDefault());
document.addEventListener('drop', event => event.preventDefault());
document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => {
  if (!app.state) return;
  app.preset = button.dataset.preset; $('prompt').value = app.state.prompts[app.preset]; renderPresets(); updatePromptCount();
}));
$('prompt').addEventListener('input', updatePromptCount);
$('savePrompt').addEventListener('click', async () => {
  $('savePrompt').disabled = true;
  try { await saveTask(); toast('提示詞與模型設定已儲存。'); }
  catch (error) { toast(error.message, true); }
  finally { $('savePrompt').disabled = false; }
});
$('analyzeButton').addEventListener('click', beginAnalysis);
$('navWorkspace').addEventListener('click', () => showView('workspace'));
$('navHistory').addEventListener('click', () => showView('history'));
$('navEditor').addEventListener('click', () => showView('editor'));
$('editReport').addEventListener('click', () => editCurrentReport());
$('paperRetryNew').addEventListener('click', () => editCurrentReport(true));
$('editorBack').addEventListener('click', () => showView('workspace'));
$('editorFocus').addEventListener('click', () => {
  const focused = document.body.classList.toggle('editor-focus');
  $('editorFocus').setAttribute('aria-pressed', String(focused));
  $('editorFocus').textContent = focused ? '顯示側欄' : '專注編輯';
  $('editorFrame').contentWindow.PaperworkEditor?.refreshLayout();
});
$('navSettings').addEventListener('click', () => openSettings(true));
$('connectionButton').addEventListener('click', () => openSettings(true));
$('changeFolder').addEventListener('click', () => openSettings());
$('closeSettings').addEventListener('click', () => $('settingsDialog').close());
$('settingsDialog').addEventListener('close', () => { $('apiKey').value = ''; });
$('reloadPage').addEventListener('click', () => location.reload());
$('newAnalysis').addEventListener('click', () => {
  app.currentJob = null; app.renderKey = ''; app.files = []; renderFiles(); showView('workspace');
  $('resultBadge').textContent = '等待分析'; $('resultBadge').className = 'result-badge'; displayResultPart('resultEmpty');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
$('backToSetup').addEventListener('click', () => { if (app.currentJob?.kind === 'paper') { $('geminiDialog').close(); void openPaperWizard(); } else { openGeminiPanel('analysis'); $('prompt').focus(); } });
$('historySearch').addEventListener('input', renderHistory);
$('readTab').addEventListener('click', () => setResultTab(false));
$('rawTab').addEventListener('click', () => setResultTab(true));
$('copyResult').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(resultText()); toast('分析內容已複製。'); }
  catch { toast('瀏覽器無法訪問剪貼簿，請選擇報告文字複製。', true); }
});
$('printResult').addEventListener('click', () => { setResultTab(false); document.body.classList.add('print-gemini-result'); window.print(); });
window.addEventListener('afterprint', () => document.body.classList.remove('print-gemini-result'));
$('openResultFolder').addEventListener('click', async () => {
  try { await api('/api/open-folder', { method: 'POST', body: { job_id: app.currentJob?.id } }); }
  catch (error) { toast(error.message, true); }
});
$('connectKey').addEventListener('click', async () => {
  if ((app.state?.key_input_revision || 0) < 2) {
    $('keyFeedback').textContent = '網站已更新，但背景服務仍是舊版。請關閉原本執行 start.cmd 的視窗，重新雙擊 start.cmd，再重新整理此頁。';
    $('keyFeedback').className = 'inline-feedback'; $('keyFeedback').hidden = false;
    return;
  }
  $('connectKey').disabled = true; $('connectKey').textContent = '驗證中…'; $('keyFeedback').hidden = true;
  try {
    const enteredKey = $('apiKey').value.trim();
    if ($('rememberKey').checked && !enteredKey && typeof rememberedGeminiKey === 'function' && !rememberedGeminiKey()) throw new Error('如要記住金鑰，請重新貼上一次 Key；或取消勾選以沿用本次連線。');
    app.state = await api('/api/connect', { method: 'POST', body: { key: enteredKey } });
    if (typeof rememberGeminiKey === 'function') rememberGeminiKey(enteredKey, $('rememberKey').checked);
    $('modelInput').value = app.state.settings.model;
    renderState();
    $('keyFeedback').textContent = '已取得 ' + app.state.models.length + ' 個模型。這一步驗證模型清單存取；分析權限與配額會在實際分析時確認。';
    $('keyFeedback').className = 'inline-feedback success';
    $('apiKey').value = '';
    toast('已取得 Gemini 模型清單。');
  } catch (error) {
    $('keyFeedback').textContent = error.message; $('keyFeedback').className = 'inline-feedback';
  } finally {
    $('keyFeedback').hidden = false; $('connectKey').disabled = false; $('connectKey').textContent = '驗證並連接';
  }
});
$('apiKey').addEventListener('keydown', event => { if (event.key === 'Enter') { event.preventDefault(); $('connectKey').click(); } });
$('disconnectKey').addEventListener('click', async () => {
  if (typeof rememberGeminiKey === 'function') rememberGeminiKey('', false);
  try { await api('/api/disconnect', { method: 'POST', body: {} }); await refresh(); $('keyFeedback').hidden = true; toast('已清除本次連接。'); }
  catch (error) { toast(error.message, true); }
});
$('saveSettings').addEventListener('click', async () => {
  $('saveSettings').disabled = true; $('settingsFeedback').textContent = '';
  try {
    app.state.settings = await api('/api/settings', { method: 'POST', body: { output_dir: $('outputDirectory').value } });
    renderState(); $('settingsDialog').close(); toast('輸出位置已儲存。');
  } catch (error) { $('settingsFeedback').textContent = error.message; }
  finally { $('saveSettings').disabled = false; }
});

mountEditorWorkspace();
refresh(true);
setInterval(() => refresh(), 2500);
