const {JSDOM,VirtualConsole}=require('jsdom');
const {IDBFactory,IDBKeyRange}=require('fake-indexeddb');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),crypto=require('node:crypto'),zlib=require('node:zlib');
const dir=path.resolve(__dirname,'../docs');
const config=JSON.parse(fs.readFileSync(path.join(dir,'config.json'),'utf8'));
const runtime=fs.readFileSync(path.join(dir,'browser-runtime.js'),'utf8');
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const sample={title:'測試分析',summary:'摘要',sections:[{heading:'核心',content:'<script>bad()</script> **內容**'}],cautions:[],concepts:[{name:'核心',definition:'定義',excerpt:'原文',source:'第 1 頁'}]};
class MemoryDirectory {
  constructor(name){this.name=name;this.children=new Map();this.files=new Map();this.permission='granted';this.fail=false;}
  async queryPermission(){return this.permission;}
  async getDirectoryHandle(name){if(!this.children.has(name))this.children.set(name,new MemoryDirectory(name));return this.children.get(name);}
  async getFileHandle(name){const dir=this;return{async createWritable(){let staged;return{async write(content){if(dir.fail)throw Error('disk failure');staged=content;},async close(){dir.files.set(name,staged);},async abort(){}};}};}
}
// Native file handles are structured-cloneable; the in-memory fixture preserves that identity.
const nativeClone=global.structuredClone;
global.structuredClone=value=>value instanceof MemoryDirectory?value:nativeClone(value);
function locks(){const held=new Set();return{async query(){return{held:[...held].map(name=>({name}))};},async request(name,options,callback){if(typeof options==='function'){callback=options;options={};}if(held.has(name)){if(options.ifAvailable)return callback(null);while(held.has(name))await sleep(1);}held.add(name);try{return await callback({name});}finally{held.delete(name);}}};}
function make(shared={},opts={}) {
  shared.db ||= new IDBFactory();shared.locks ||= locks();
  const errors=[],calls=[],blobs=new Map();let gate=null,mode='ok';
  const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM('<!doctype html><html><body></body></html>',{url:'https://daphnelo.github.io/Paperwork/',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;Object.assign(w,{indexedDB:shared.db,IDBKeyRange,structuredClone,Response,Headers,Blob,File,FormData,TextDecoder,TextEncoder,DecompressionStream,AbortController});
  Object.defineProperty(w.document,'currentScript',{value:{src:'https://daphnelo.github.io/Paperwork/browser-runtime.js'},configurable:true});
  Object.defineProperty(w.navigator,'locks',{value:shared.locks});
  w.URL.createObjectURL=blob=>{const url='blob:test-'+blobs.size;blobs.set(url,blob);return url;};
  w.URL.revokeObjectURL=url=>blobs.delete(url);
  w.fetch=async(url,options={})=>{
    const target=new URL(url);calls.push({url:target.href,...options});
    if(target.origin==='https://daphnelo.github.io') {
      if(target.pathname==='/Paperwork/config.json')return Response.json(config);
      if(target.pathname==='/Paperwork/editor.html')return new Response(fs.readFileSync(path.join(dir,'editor.html'),'utf8'));
      throw Error('unexpected website fetch '+target.href);
    }
    assert.equal(target.origin,'https://generativelanguage.googleapis.com');assert.equal(options.headers['x-goog-api-key'],'test-key-not-real');
    assert.equal(options.credentials,'omit');assert.equal(options.redirect,'error');
    if(target.pathname==='/v1beta/models')return Response.json({models:[{name:'models/gemini-test-flash',supportedGenerationMethods:['generateContent'],displayName:'Test'}]});
    if(target.pathname==='/upload/v1beta/files')return new Response('',{headers:{'X-Goog-Upload-URL':mode==='hostile'?'https://attacker.example/upload':'https://generativelanguage.googleapis.com/upload/session'}});
    if(target.pathname==='/upload/session')return Response.json({file:{name:'files/test',state:'ACTIVE',uri:'https://generativelanguage.googleapis.com/v1beta/files/test'}});
    if(target.pathname==='/v1beta/files/test' && options.method==='DELETE')return new Response('');
    if(target.pathname.endsWith(':generateContent')){
      if(gate)await gate;
      if(mode==='403')return Response.json({error:{message:'secret test-key-not-real provider echo'}},{status:403});
      if(mode==='bad-result')return Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:'{}'}]}}]});
      return Response.json({candidates:[{finishReason:mode==='truncated'?'MAX_TOKENS':'STOP',content:{parts:[{text:JSON.stringify(sample)}]}}],usageMetadata:{totalTokenCount:42}});
    }
    throw Error('unexpected Google fetch');
  };
  vm.runInContext(runtime,dom.getInternalVMContext());
  const api=async(p,body)=>{const r=await w.PaperworkBrowser.fetch(p,body===undefined?{}:{method:'POST',body:body instanceof FormData?body:JSON.stringify(body)});return{status:r.status,data:await r.json()};};
  return{dom,w,api,calls,blobs,errors,shared,setMode:m=>mode=m,setGate:g=>gate=g};
}
function form(file=new File(['%PDF-1.4 fixture'],'test.pdf'),paper=false) {const f=new FormData();f.append('files',file);f.append('prompt','請分析測試');f.append('model','gemini-test-flash');if(paper)f.append('paper_options',JSON.stringify({mode:'new',type:'legal'}));return f;}
async function done(t,id) {for(let i=0;i<100;i++){const r=await t.api('/api/jobs/'+id);if(['completed','failed'].includes(r.data.status))return r.data;await sleep(10);}throw Error('job timeout');}
function docx(text,oversize=false) {
  const name=Buffer.from('word/document.xml'),raw=Buffer.from('<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body><w:p><w:r><w:t>'+text+'</w:t></w:r></w:p></w:body></w:document>'),packed=zlib.deflateRawSync(raw);
  const local=Buffer.alloc(30);local.writeUInt32LE(0x04034b50);local.writeUInt16LE(8,8);local.writeUInt32LE(packed.length,18);local.writeUInt32LE(raw.length,22);local.writeUInt16LE(name.length,26);
  const central=Buffer.alloc(46);central.writeUInt32LE(0x02014b50);central.writeUInt16LE(8,10);central.writeUInt32LE(packed.length,20);central.writeUInt32LE(oversize?160*1024*1024:raw.length,24);central.writeUInt16LE(name.length,28);
  const end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(1,10);end.writeUInt32LE(central.length+name.length,12);end.writeUInt32LE(local.length+name.length+packed.length,16);
  return new File([local,name,packed,central,name,end],'test.docx');
}
(async()=>{
  const t=make();await t.w.PaperworkBrowser.ready;
  assert.equal((await t.api('/api/state')).data.configured,false);assert.equal(t.calls.length,1);
  assert.equal((await t.api('/api/analyze',form())).status,400);
  assert.equal((await t.api('/api/connect',{key:' test-key-not-real '})).status,200);
  assert.equal((await t.api('/api/state')).data.settings.model,'gemini-test-flash');
  assert.equal(t.w.localStorage.length,0,'key is memory-only by default');
  const notebook={tree:[{id:'n1',type:'note',name:'測試'}],notes:{n1:{html:'<p>保留</p>'}},slipbox:{tree:[]}};
  const saved=await t.api('/api/notebook',{revision:'0',data:notebook});assert.equal(saved.status,200);
  const competing=await Promise.all([t.api('/api/notebook',{revision:saved.data.revision,data:notebook}),t.api('/api/notebook',{revision:saved.data.revision,data:notebook})]);
  assert.deepEqual(competing.map(r=>r.status).sort(),[200,409]);
  const second=make(t.shared);await second.w.PaperworkBrowser.ready;
  assert.deepEqual((await second.api('/api/notebook')).data.data,notebook);
  assert.equal((await second.api('/api/state')).data.configured,false,'new tab never inherits memory key');
  await second.api('/api/connect',{key:'test-key-not-real'});
  let release;t.setGate(new Promise(resolve=>{release=resolve;}));
  const submitted=await t.api('/api/paper/analyze',form(undefined,true));assert.equal(submitted.status,202);
  assert.equal((await second.api('/api/analyze',form())).status,409,'exclusive job lock spans tabs');
  assert.equal((await second.api('/api/state')).data.jobs[0].status,'running','other tab must not label live job interrupted');
  release();t.setGate(null);let job=await done(t,submitted.data.id);assert.equal(job.status,'completed');assert.equal(job.result.concepts.length,1);
  const req=t.calls.find(c=>c.url.endsWith(':generateContent'));const body=JSON.parse(req.body);
  assert.ok(body.contents[0].parts.some(p=>p.inlineData));assert.equal(body.generationConfig.responseJsonSchema.required.includes('concepts'),true);
  assert.equal(t.calls.some(c=>c.url.includes('/upload/')),false,'small PDF uses inline API without Files transport');
  // Runtime uses the existing safe Markdown renderer's DocumentFragment.
  t.w.renderMarkdown=text=>{const frag=t.w.document.createDocumentFragment(),p=t.w.document.createElement('p');p.textContent=text;frag.append(p);return frag;};
  const url=t.w.PaperworkBrowser.downloadURL(job,'report.html');const report=await t.blobs.get(url).text();assert.ok(report.includes('&lt;script&gt;'));assert.ok(!report.includes('undefined'));assert.ok(!report.includes('<script>bad()'));
  assert.equal((await second.api('/api/jobs/'+job.id)).data.status,'completed');
  let request=await t.api('/api/analyze',form(docx('中文正文')));job=await done(t,request.data.id);assert.equal(job.status,'completed');
  assert.ok(JSON.parse(t.calls.filter(c=>c.url.endsWith(':generateContent')).at(-1).body).contents[0].parts.some(p=>p.text==='中文正文'));
  request=await t.api('/api/analyze',form(docx('正文',true)));job=await done(t,request.data.id);assert.equal(job.status,'failed');assert.match(job.error,/過大/);
  for(const mode of ['403','bad-result','truncated']) {t.setMode(mode);request=await t.api('/api/analyze',form());job=await done(t,request.data.id);assert.equal(job.status,'failed');assert.ok(!job.error.includes('test-key'));assert.equal(job.artifacts.length,0);}
  t.setMode('ok');request=await t.api('/api/analyze',form(new File(['%PDF-',new Uint8Array(11*1024*1024)],'large.pdf')));job=await done(t,request.data.id);assert.equal(job.status,'completed');assert.ok(t.calls.some(c=>c.method==='DELETE'));
  t.setMode('hostile');request=await t.api('/api/analyze',form(new File(['%PDF-',new Uint8Array(11*1024*1024)],'large.pdf')));job=await done(t,request.data.id);assert.equal(job.status,'failed');assert.match(job.error,/上傳網址/);
  assert.equal(t.calls.some(c=>c.url.startsWith('https://attacker')),false);
  const disk=new MemoryDirectory('使用者選取的資料夾');t.w.showDirectoryPicker=async()=>disk;
  await t.w.PaperworkBrowser.chooseOutput();
  const managed=disk.children.get('Paperwork');assert.ok(managed);
  const filename=[...managed.files.keys()][0];assert.match(filename,/^筆記庫-.+\.html$/);
  assert.ok(String(managed.files.get(filename)).includes('保留'));
  assert.equal(disk.files.size,0,'only the managed subfolder receives files');
  let latest=await t.api('/api/notebook');managed.fail=true;
  let updated=await t.api('/api/notebook',{revision:latest.data.revision,data:notebook});assert.equal(updated.status,200);assert.match(updated.data.warning,/寫入失敗/);
  assert.equal((await t.api('/api/notebook')).data.revision,updated.data.revision,'browser copy remains recoverable after a disk error');
  managed.fail=false;t.setMode('ok');request=await t.api('/api/analyze',form());job=await done(t,request.data.id);
  assert.equal(job.status,'completed');assert.equal(managed.children.get(job.id).files.size,4);
  assert.ok(String(managed.files.get(filename)).includes('notes-data'));
  await t.w.PaperworkBrowser.forgetOutput();assert.match(t.w.PaperworkBrowser.storageLabel(),/瀏覽器/);
  assert.equal(managed.files.size,1,'forgetting a folder does not delete saved notes');
  assert.equal((await t.api('/api/disconnect',{})).data.configured,false);
  assert.deepEqual(t.errors,[]);assert.deepEqual(second.errors,[]);t.dom.window.close();second.dom.window.close();
  const source=fs.readFileSync(path.join(dir,'editor.html'),'utf8');const parsed=new JSDOM(source);
  const script=parsed.window.document.querySelector('script:not([type])').textContent;
  const hash=crypto.createHash('sha256').update(script).digest('base64');assert.ok(parsed.window.document.querySelector('#pw-hosted-csp').content.includes(hash));parsed.window.close();
  const index=new JSDOM(fs.readFileSync(path.join(dir,'index.html'),'utf8'));
  assert.equal(index.window.document.querySelector('script').getAttribute('src'),'./browser-runtime.js');
  for(const node of index.window.document.querySelectorAll('script[src],link[href]'))assert.ok(!node.getAttribute('src')?.startsWith('/')&&!node.getAttribute('href')?.startsWith('/'));
  index.window.close();
  console.log('PASS: static config, memory-only key, IndexedDB reload and write conflicts, cross-tab job lock, PDF inline/Files transport and cleanup, DOCX extraction/limits, complete result validation, safe exports, upstream key privacy, upload URL allowlist, and editor CSP. No real Gemini calls.');
})().catch(e=>{console.error(e);process.exitCode=1;process.exit();});
