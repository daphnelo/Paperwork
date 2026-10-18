'use strict';
const KEY_STORAGE = 'paperwork.gemini-api-key';
const PAPER_PENDING = 'paperwork.pending-paper';
const paperFlow = {file: null, templates: null, edits: {}, type: 'legal', submitting: false, finishing: false};
function rememberedGeminiKey() { try { return localStorage.getItem(KEY_STORAGE) || ''; } catch { return ''; } }
function rememberGeminiKey(value, enabled) {
  try {
    if (!enabled) localStorage.removeItem(KEY_STORAGE);
    else if (value) localStorage.setItem(KEY_STORAGE, value);
  } catch { toast('瀏覽器無法保存金鑰，本次連線仍可使用。', true); }
  ['rememberKey', 'paperRememberKey'].forEach(id => { if ($(id)) $(id).checked = !!rememberedGeminiKey(); });
}
async function restoreSavedGemini() {
  const key = rememberedGeminiKey();
  if (!key || app.state?.configured) return;
  try { app.state = await api('/api/connect', {method: 'POST', body: {key}}); }
  catch (error) { toast('記住的金鑰未能連線：' + error.message, true); }
}
function pendingPaperJobId() { try { return sessionStorage.getItem(PAPER_PENDING) || ''; } catch { return ''; } }
function setPendingPaper(id) { try { if (id) sessionStorage.setItem(PAPER_PENDING, id); else sessionStorage.removeItem(PAPER_PENDING); } catch {} }
async function openPaperWizard() {
  try {
    if (app.state?.busy) { openGeminiPanel('results'); return; }
    showView('editor'); await ensureEditor();
    if (!paperFlow.templates) paperFlow.templates = await api('/api/paper/templates');
    $('paperPrompt').value = paperFlow.edits[paperFlow.type] ?? paperFlow.templates[paperFlow.type];
    $('paperKey').value = ''; $('paperRememberKey').checked = !!rememberedGeminiKey();
    $('paperModel').value = app.state.settings.model;
    $('paperConnectionStatus').textContent = app.state.configured ? '已連線，可留空沿用 Key' : rememberedGeminiKey() ? '已記住 Key' : '請填入 API Key';
    $('paperFeedback').hidden = true; $('paperDialog').showModal();
  } catch (error) { toast(error.message, true); }
}
function selectPaperFiles(files) {
  if (files.length !== 1 || !/\.pdf$/i.test(files[0].name) || !files[0].size || files[0].size > 50 * 1024 * 1024) {
    $('paperFeedback').textContent = '請選擇一份不超過 50 MB 的 PDF。'; $('paperFeedback').hidden = false; return;
  }
  paperFlow.file = files[0]; $('paperFileLabel').textContent = files[0].name + ' · ' + formatSize(files[0].size); $('paperFeedback').hidden = true;
}
async function startPaperAnalysis() {
  if (paperFlow.submitting) return;
  let target = null, editor = null;
  paperFlow.submitting = true; $('startPaper').disabled = true; $('closePaper').disabled = true; $('paperFeedback').hidden = true;
  try {
    if (!paperFlow.file) throw new Error('請先選取一份 PDF。');
    if (!$('paperPrompt').value.trim()) throw new Error('摘要提示詞不可留空。');
    if (app.state.busy) throw new Error('請等待目前的分析完成。');
    const entered = $('paperKey').value.trim(), saved = rememberedGeminiKey(), remember = $('paperRememberKey').checked;
    if (remember && !entered && !saved) throw new Error('如要記住金鑰，請重新貼上一次 Key；或取消勾選以沿用本次連線。');
    if (entered || !app.state.configured) {
      const key = entered || saved; if (!key) throw new Error('請填入 Gemini API Key。');
      app.state = await api('/api/connect', {method: 'POST', body: {key}});
      rememberGeminiKey(key, remember); renderState();
    } else if (!remember) rememberGeminiKey('', false);
    $('paperKey').value = '';
    editor = await ensureEditor();
    const mode = document.querySelector('input[name="paperDestination"]:checked').value;
    if (mode === 'insert') { target = editor.captureTarget(); if (!await editor.save()) throw new Error('目前筆記尚未成功存檔，請先處理存檔狀態。'); }
    const body = new FormData(); body.append('files', paperFlow.file, paperFlow.file.name);
    body.append('prompt', $('paperPrompt').value); body.append('model', $('paperModel').value.trim());
    body.append('paper_options', JSON.stringify({type: paperFlow.type, mode, ...(target || {})}));
    paperFlow.edits[paperFlow.type] = $('paperPrompt').value;
    const job = await api('/api/paper/analyze', {method: 'POST', body});
    setPendingPaper(job.id); app.currentJob = job; app.state.busy = true; app.renderKey = '';
    $('paperDialog').close(); showView('editor'); renderJob(job); updateAnalyze(); notifyEditorGemini();
    toast('論文摘要已開始；可以繼續編輯，完成後會載入筆記與概念卡片。');
  } catch (error) {
    if (target && editor) { editor.cancelTarget(target); void editor.save(); }
    $('paperFeedback').textContent = error.message; $('paperFeedback').hidden = false;
  } finally { paperFlow.submitting = false; $('startPaper').disabled = false; $('closePaper').disabled = false; }
}
async function maybeFinishPaper(job) {
  if (paperFlow.finishing || job.id !== pendingPaperJobId() || !['completed', 'failed'].includes(job.status)) return;
  paperFlow.finishing = true; setPendingPaper('');
  try {
    if (job.status === 'failed') {
      const editor = await ensureEditor(); editor.cancelTarget(job.paper_options); await editor.save(); return;
    }
    await editCurrentReport();
  } finally { paperFlow.finishing = false; }
}
$('navPaper').addEventListener('click', openPaperWizard);
$('closePaper').addEventListener('click', () => $('paperDialog').close());
$('paperDialog').addEventListener('cancel', event => { if (paperFlow.submitting) event.preventDefault(); });
$('paperDrop').addEventListener('click', () => $('paperFile').click());
$('paperFile').addEventListener('change', event => { selectPaperFiles(event.target.files); event.target.value = ''; });
for (const type of ['dragenter', 'dragover']) $('paperDrop').addEventListener(type, event => { event.preventDefault(); $('paperDrop').classList.add('dragover'); });
for (const type of ['dragleave', 'drop']) $('paperDrop').addEventListener(type, event => { event.preventDefault(); $('paperDrop').classList.remove('dragover'); });
$('paperDrop').addEventListener('drop', event => selectPaperFiles(event.dataTransfer.files));
document.querySelectorAll('input[name="paperType"]').forEach(radio => radio.addEventListener('change', () => {
  paperFlow.edits[paperFlow.type] = $('paperPrompt').value; paperFlow.type = radio.value;
  $('paperPrompt').value = paperFlow.edits[paperFlow.type] ?? paperFlow.templates[paperFlow.type];
}));
$('resetPaperPrompt').addEventListener('click', () => { $('paperPrompt').value = paperFlow.templates[paperFlow.type]; delete paperFlow.edits[paperFlow.type]; });
$('startPaper').addEventListener('click', startPaperAnalysis);
['rememberKey', 'paperRememberKey'].forEach(id => {
  if (!$(id)) return;
  $(id).checked = !!rememberedGeminiKey();
  $(id).addEventListener('change', () => { if (!$(id).checked) rememberGeminiKey('', false); });
});
