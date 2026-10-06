/* ================= v2 第 1 段：样式 + 算法 + 图片/文件/效率工具 ================= */
const CSSV2='html[data-theme=dark]{--bg:#14171c;--card:#1d222a;--tx:#e6e9ef;--sub:#8b95a7;--bd:#2a303b}'+
'html[data-theme=light]{--bg:#f5f7fa;--card:#fff;--tx:#233;--sub:#7a8699;--bd:#e3e8f0}'+
'.card{position:relative}.star{position:absolute;top:9px;right:10px;font-size:15px;opacity:.3;font-style:normal;line-height:1}.star.on{opacity:1;color:#f59e0b}'+
'#theme{margin-left:10px;border:1px solid var(--bd);background:var(--card);color:var(--tx);border-radius:20px;padding:5px 12px;cursor:pointer;font-size:13px}'+
'#dlg .row select{padding:6px 8px;border-radius:8px;border:1px solid var(--bd);background:var(--card);color:var(--tx);font-size:13px;max-width:190px}'+
'.drop{position:fixed;inset:0;display:none;align-items:center;justify-content:center;font-size:22px;font-weight:600;color:var(--pri);background:rgba(59,130,246,.12);border:3px dashed var(--pri);z-index:30}.drop.on{display:flex}'+
'.mini{padding:6px 12px;font-size:13px;border-radius:8px;border:1px solid var(--bd);background:var(--card);color:var(--tx);cursor:pointer}'+
'.btnrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0}'+
'.timer{font:700 40px/1.3 ui-monospace,Consolas,monospace;text-align:center;margin:14px 0;letter-spacing:1px}'+
'.out{font-size:13px;color:var(--sub);margin:8px 0}'+
'canvas.prev{max-width:100%;border:1px solid var(--bd);border-radius:8px;background:#fff;margin-top:6px}'+
'pre.mini-out{background:var(--bg);border:1px solid var(--bd);border-radius:8px;padding:10px;font:12px/1.7 ui-monospace,monospace;max-height:34vh;overflow:auto;margin:6px 0;white-space:pre-wrap;word-break:break-all}'+
'.diff{display:grid;grid-template-columns:1fr 1fr;gap:8px;font:12px/1.6 ui-monospace,monospace;max-height:44vh;overflow:auto}'+
'.diff pre{margin:0;padding:8px;border:1px solid var(--bd);border-radius:8px;background:var(--bg);white-space:pre-wrap;word-break:break-all}'+
'.dl-add{background:rgba(34,197,94,.15)}.dl-del{background:rgba(239,68,68,.15)}'+
'.grid9{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:520px}.grid9 canvas{width:100%;border:1px solid var(--bd);border-radius:6px;cursor:pointer}'+
'input[type=range]{width:100%;accent-color:var(--pri)}textarea.tall{min-height:110px}'+
'@media(max-width:640px){.diff{grid-template-columns:1fr}}';
const mkC=(c,n,d,r,a)=>T.push({cat:c,name:n,desc:d,accept:a,custom:r});
const el=(t,a,x)=>{const e=document.createElement(t);if(a)for(const k in a)k==='cls'?e.className=a[k]:e.setAttribute(k,a[k]);if(x!==undefined)e.textContent=x;return e;};
function loadJS(u){window.__ld=window.__ld||{};if(window.__ld[u])return window.__ld[u];return window.__ld[u]=new Promise((res,rej)=>{const s=document.createElement('script');s.src=u;s.onload=()=>res();s.onerror=()=>{delete window.__ld[u];rej(new Error('组件加载失败：该功能首次使用需要联网'));};document.head.appendChild(s);});}
const CDN={qr:'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js',bar:'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js',oc:'https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.js',py:'https://cdn.jsdelivr.net/npm/pinyin-pro@3.26.0/dist/index.js',lunar:'https://cdn.jsdelivr.net/npm/lunar-javascript/lunar.js'};
function dl(b,n){const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=n;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},2000);}
const dlText=(t,n)=>dl(new Blob([t],{type:'text/plain;charset=utf-8'}),n);
const readFile=(f,as)=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=()=>rej(new Error('文件读取失败'));as==='buf'?r.readAsArrayBuffer(f):as==='data'?r.readAsDataURL(f):r.readAsText(f,'utf-8');});
const loadImg=src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error('图片加载失败'));i.src=src;});
const sz=n=>n<1024?n+' B':n<1048576?(n/1024).toFixed(2)+' KB':(n/1048576).toFixed(2)+' MB';
const escapeHtml=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const u8b64=u=>{let s='';for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(s);};
const u8url=u=>u8b64(u).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
function b64u8(s){const t=s.replace(/-/g,'+').replace(/_/g,'/');const b=atob(t+'='.repeat((4-t.length%4)%4));const u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;}
function md5bytes(b){
  const n=b.length,total=Math.ceil((n+9)/64)*64,m=new Uint8Array(total);m.set(b);m[n]=0x80;
  const dv=new DataView(m.buffer);dv.setUint32(total-8,(n%536870912)*8,true);dv.setUint32(total-4,Math.floor(n/536870912),true);
  let a0=1732584193,b0=-271733879,c0=-1732584194,d0=271733878;
  const K=[],S=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];
  for(let i=0;i<64;i++)K[i]=Math.floor(Math.abs(Math.sin(i+1))*4294967296);
  for(let off=0;off<total;off+=64){
    const M=[];for(let j=0;j<16;j++)M[j]=dv.getUint32(off+j*4,true);
    let A=a0,Bb=b0,C=c0,D=d0;
    for(let i=0;i<64;i++){
      let f,g;
      if(i<16){f=(Bb&C)|(~Bb&D);g=i;}
      else if(i<32){f=(D&Bb)|(~D&C);g=(5*i+1)%16;}
      else if(i<48){f=Bb^C^D;g=(3*i+5)%16;}
      else{f=C^(Bb|~D);g=(7*i)%16;}
      f=(f+A+M[g]+K[i])|0;A=D;D=C;C=Bb;Bb=(Bb+((f<<S[i])|(f>>>(32-S[i]))))|0;
    }
    a0=(a0+A)|0;b0=(b0+Bb)|0;c0=(c0+C)|0;d0=(d0+D)|0;
  }
  const w=x=>[0,8,16,24].map(sh=>(((x>>>sh)&255).toString(16)).padStart(2,'0')).join('');
  return w(a0)+w(b0)+w(c0)+w(d0);
}
let AC=null;
function beep(n){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();for(let i=0;i<(n||4);i++){const o=AC.createOscillator(),g=AC.createGain();o.connect(g);g.connect(AC.destination);o.type='sine';o.frequency.value=880+i*110;const t=AC.currentTime+i*.3;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.28,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+.24);o.start(t);o.stop(t+.26);}}catch(e){}}
/* ---------- 结构化文本算法 ---------- */
function yamlParse(src){
  const L=src.replace(/\t/g,'  ').split(/\r?\n/).map(l=>l.replace(/\s+#.*$/,'')).filter(l=>l.trim()!==''&&!/^\s*#/.test(l)).map(l=>({i:l.match(/^ */)[0].length,t:l.trim()}));
  let p=0;
  const val=s=>{s=s.trim();
    if(/^["'].*["']$/.test(s))return s.slice(1,-1);
    if(s===''||s==='null'||s==='~')return null;
    if(/^(true|yes|on)$/i.test(s))return true;
    if(/^(false|no|off)$/i.test(s))return false;
    if(/^0\d+$/.test(s))return s;
    if(/^-?\d+$/.test(s))return parseInt(s,10);
    if(/^-?\d*\.\d+$/.test(s))return parseFloat(s);
    if(/^\[.*\]$/.test(s))return s.slice(1,-1).split(',').map(x=>val(x)).filter(x=>x!==''&&x!==null);
    if(/^\{.*\}$/.test(s)){const o={};s.slice(1,-1).split(',').forEach(kv=>{const i=kv.indexOf(':');if(i>0)o[kv.slice(0,i).trim()]=val(kv.slice(i+1));});return o;}
    return s;};
  function node(ind){
    if(p>=L.length)return null;
    if(L[p].t.indexOf('- ')===0){const arr=[];
      while(p<L.length&&L[p].i===ind&&L[p].t.indexOf('- ')===0){
        const rest=L[p].t.slice(2).trim();p++;
        if(rest==='')arr.push(L[p]&&L[p].i>ind?node(L[p].i):null);
        else if(/^[^:]+:(\s|$)/.test(rest)){L[p-1]={i:ind+2,t:rest};p--;arr.push(node(ind+2));}
        else arr.push(val(rest));
      }
      return arr;}
    const obj={};
    while(p<L.length&&L[p].i>=ind){
      if(L[p].i>ind){p++;continue;}
      const m=/^([^:#]+):\s*(.*)$/.exec(L[p].t);
      if(!m){p++;continue;}
      const k=m[1].trim().replace(/^["']|["']$/g,''),v=m[2].trim();
      if(v===''){p++;obj[k]=(L[p]&&L[p].i>ind)?node(L[p].i):null;}
      else{p++;obj[k]=val(v);}
    }
    return obj;}
  return L.length?node(L[0].i):{};
}
const yamlScalar=v=>v===null||v===undefined?'null':typeof v==='string'?(/[#\[\]{},&*?|>%@'"\s]|:\s|:$/.test(v)||v===''?"'"+v.replace(/'/g,"''")+"'":v):String(v);
function yamlDump(o,ind){
  const pad='  '.repeat(ind||0);
  if(Array.isArray(o)){if(!o.length)return pad+'[]';return o.map(x=>x&&typeof x==='object'?(Array.isArray(x)&&!x.length?pad+'- []':pad+'- '+yamlDump(x,(ind||0)+1).trimStart()):pad+'- '+yamlScalar(x)).join('\n');}
  if(o&&typeof o==='object'){const ks=Object.keys(o);if(!ks.length)return pad+'{}';
    return ks.map(k=>{const v=o[k];
      if(Array.isArray(v)&&!v.length)return pad+k+': []';
      if(v&&typeof v==='object'&&!Array.isArray(v)&&!Object.keys(v).length)return pad+k+': {}';
      return v&&typeof v==='object'?pad+k+':\n'+yamlDump(v,(ind||0)+1):pad+k+': '+yamlScalar(v);}).join('\n');}
  return pad+yamlScalar(o);
}
const CLIM=[[0,59],[0,23],[1,31],[1,12],[0,6]];
function cronFields(e){
  const f=e.trim().split(/\s+/);
  if(f.length!==5)throw new Error('需要 5 个字段：分 时 日 月 周');
  return f.map((s,i)=>{const set=new Set();
    s.split(',').forEach(pt=>{
      let st=1,base=pt;const sl=pt.split('/');
      if(sl.length>1){base=sl[0];st=parseInt(sl[1],10);if(!(st>0))throw new Error('步长无效：'+pt);}
      let lo,hi;
      if(base==='*'||base==='?'){lo=CLIM[i][0];hi=CLIM[i][1];}
      else if(base.indexOf('-')>0){const t=base.split('-').map(Number);if(t.some(isNaN))throw new Error('字段无效：'+pt);lo=t[0];hi=t[1];}
      else{lo=hi=parseInt(base,10);if(isNaN(lo))throw new Error('字段无效：'+pt);}
      for(let x=lo;x<=hi;x+=st)set.add(i===4&&x===7?0:x);
    });
    return set;});
}
function cronNext(e,from,n){
  const fs=cronFields(e),out=[],fp=e.trim().split(/\s+/);
  const ds=/^[*?]/.test(fp[2]),ws=/^[*?]/.test(fp[4]);
  const d=new Date(from.getTime());d.setSeconds(0,0);d.setMinutes(d.getMinutes()+1);
  for(let i=0;i<500000&&out.length<n;i++){
    if(fs[0].has(d.getMinutes())&&fs[1].has(d.getHours())&&fs[3].has(d.getMonth()+1)){
      const a=fs[2].has(d.getDate()),b=fs[4].has(d.getDay());
      if((ds||ws)?(a&&b):(a||b))out.push(new Date(d));
    }
    d.setMinutes(d.getMinutes()+1);
  }
  return out;
}
const SQL_UP=/\b(select|from|where|and|or|not|null|is|in|like|between|group\s+by|order\s+by|having|limit|offset|union\s+all|union|insert\s+into|values|update|set|delete\s+from|create\s+table|primary\s+key|foreign\s+key|default|left\s+join|right\s+join|inner\s+join|full\s+join|join|on|as|asc|desc|distinct|count|sum|avg|max|min|create|table|index|alter|drop|add|column)\b/gi;
const SQL_NL=/\s+(left\s+join|right\s+join|inner\s+join|full\s+join|group\s+by|order\s+by|union\s+all|insert\s+into|delete\s+from|create\s+table|select|from|where|having|limit|offset|values|update|set|join|on)\b/gi;
function sqlFmt(s){
  return s.split(/('(?:[^']|'')*'|"(?:[^"])*"|`[^`]*`)/).map((p,i)=>{
    if(i%2)return p;
    let t=p.replace(/\s+/g,' ').replace(SQL_UP,m=>m.toUpperCase()).replace(SQL_NL,(m,kw)=>'\n'+kw).replace(/\s+(AND|OR)\s+/g,'\n  $1 ');
    return t;
  }).join('').replace(/^\s*\n/,'').trim();
}
function tzOffsetOf(date,tz){
  const p={};
  new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(date).forEach(x=>p[x.type]=x.value);
  return (Date.UTC(+p.year,+p.month-1,+p.day,p.hour==='24'?0:+p.hour,+p.minute,+p.second)-date.getTime())/60000;
}
function tzToInstant(y,mo,d,h,mi,tz){
  const guess=Date.UTC(y,mo-1,d,h,mi);
  let off=tzOffsetOf(new Date(guess),tz),t=guess-off*60000;
  off=tzOffsetOf(new Date(t),tz);
  return new Date(guess-off*60000);
}
const fmtIn=(dt,tz)=>new Intl.DateTimeFormat('zh-CN',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',weekday:'short',hourCycle:'h23'}).format(dt);
const CITIES=[['北京','Asia/Shanghai'],['东京','Asia/Tokyo'],['新加坡','Asia/Singapore'],['迪拜','Asia/Dubai'],['莫斯科','Europe/Moscow'],['伦敦','Europe/London'],['巴黎','Europe/Paris'],['纽约','America/New_York'],['洛杉矶','America/Los_Angeles'],['圣保罗','America/Sao_Paulo'],['悉尼','Australia/Sydney']];
const TZOPT=[['local','本地时间'],['Asia/Shanghai','北京 UTC+8'],['Asia/Tokyo','东京 UTC+9'],['Asia/Singapore','新加坡 UTC+8'],['Asia/Dubai','迪拜 UTC+4'],['Europe/Moscow','莫斯科'],['Europe/London','伦敦'],['Europe/Paris','巴黎'],['America/New_York','纽约'],['America/Los_Angeles','洛杉矶'],['America/Sao_Paulo','圣保罗'],['Australia/Sydney','悉尼']];
const BRACK_M=[[3000,.03,0],[12000,.1,210],[25000,.2,1410],[35000,.25,2660],[55000,.3,4410],[80000,.35,7160],[Infinity,.45,15160]];
const BRACK_Y=[[36000,.03,0],[144000,.1,2520],[300000,.2,16920],[420000,.25,31920],[660000,.3,52920],[960000,.35,85920],[Infinity,.45,181920]];
const applyB=(t,BR)=>{if(t<=0)return 0;for(const r of BR)if(t<=r[0])return t*r[1]-r[2];return 0;};
const bonusTax=b=>{if(b<=0)return 0;let r=.45,d=15160;for(const x of BRACK_M)if(b/12<=x[0]){r=x[1];d=x[2];break;}return Math.max(0,b*r-d);};
function det(m){const n=m.length,a=m.map(r=>r.slice());let d=1;
  for(let i=0;i<n;i++){let q=i;for(let k=i+1;k<n;k++)if(Math.abs(a[k][i])>Math.abs(a[q][i]))q=k;
    if(Math.abs(a[q][i])<1e-12)return 0;
    if(q!==i){const t=a[i];a[i]=a[q];a[q]=t;d=-d;}
    d*=a[i][i];
    for(let k=i+1;k<n;k++){const f=a[k][i]/a[i][i];for(let j=i;j<n;j++)a[k][j]-=f*a[i][j];}}
  return d;}
function diffRows(A,Bb){const n=A.length,m=Bb.length,dp=[];for(let i=0;i<=n;i++)dp.push(new Uint16Array(m+1));
  for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)dp[i][j]=A[i]===Bb[j]?dp[i+1][j+1]+1:Math.max(dp[i+1][j],dp[i][j+1]);
  const r=[];let i=0,j=0;
  while(i<n&&j<m){if(A[i]===Bb[j]){r.push([0,A[i],Bb[j]]);i++;j++;}
    else if(dp[i+1][j]>=dp[i][j+1])r.push([-1,A[i++],null]);
    else r.push([1,null,Bb[j++]]);}
  while(i<n)r.push([-1,A[i++],null]);
  while(j<m)r.push([1,null,Bb[j++]]);
  return r;}
const FOOD=('米饭 116;白馒头 223;面条(煮) 110;全麦面包 246;燕麦片 377;玉米 112;红薯 86;土豆 77;鸡蛋 144;鸡胸肉 133;鸡腿 181;猪瘦肉 143;五花肉 508;牛腱肉 106;羊肉 203;草鱼 113;三文鱼 139;虾 93;豆腐 82;豆浆 16;牛奶 54;酸奶 72;奶酪 328;苹果 53;香蕉 93;橙子 48;西瓜 26;葡萄 43;草莓 32;蓝莓 57;花生 574;核桃 646;杏仁 578;瓜子 606;巧克力 589;薯片 548;饼干 435;蛋糕 347;冰淇淋 127;可乐 43;奶茶 90;啤酒 32;白酒(52度) 298;咖啡(无糖) 1;西红柿 20;黄瓜 16;生菜 15;西兰花 36;胡萝卜 39;菠菜 28;香菇 26;海带 13').split(';').map(x=>{const t=x.split(' ');return [t[0],+t[1]];});
const REGEX_LIB=[['邮箱','[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}','常规邮箱'],['手机号','1[3-9]\\d{9}','11 位手机号'],['手机号(整串)','^1[3-9]\\d{9}$','严格匹配'],['固话','0\\d{2,3}-?\\d{7,8}','含区号'],['身份证18位','^[1-9]\\d{5}(18|19|20)\\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\\d|3[01])\\d{3}[\\dXx]$','末位可为X'],['邮编','^[1-9]\\d{5}$','6 位'],['URL','https?://[\\w.-]+(?:/[\\w./?%&=~+#-]*)?','http(s) 链接'],['IPv4','^((25[0-5]|2[0-4]\\d|1?\\d?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1?\\d?\\d)$','0-255'],['日期','^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$','YYYY-MM-DD'],['时间','^([01]\\d|2[0-3]):[0-5]\\d(:[0-5]\\d)?$','24 小时制'],['中文汉字','[\\u4e00-\\u9fa5]+','连续汉字'],['中英数字','^[\\u4e00-\\u9fa5A-Za-z0-9]+$','不含符号'],['强密码','^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[^\\s]{8,}$','8位含大小写数字'],['空白行','^\\s*$','空行'],['首尾空白','^\\s+|\\s+$','可替换 trim'],['重复空白','\\s{2,}','压缩空格'],['HTML标签','<[^>]+>','剥标签'],['双引号内容','"([^"]*)"','提取引号文本'],['圆括号内容','\\(([^()]*)\\)','提取括号文本'],['千分位数字','\\d{1,3}(?:,\\d{3})+','1,234,567'],['版本号','v?\\d+(\\.\\d+){1,3}','1.2.3'],['颜色HEX','#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\\b','#fff / #409eff']];
const HEADERS=[['Accept','客户端可接受的响应类型'],['Accept-Encoding','可接受的压缩算法'],['Authorization','认证信息，如 Bearer <token>'],['Cache-Control','缓存策略'],['Content-Disposition','下载文件名'],['Content-Length','响应体字节数'],['Content-Type','媒体类型'],['Cookie','客户端 Cookie'],['Origin','跨域来源'],['Referer','来源页面'],['User-Agent','客户端标识'],['X-Forwarded-For','真实客户端 IP'],['X-Request-ID','请求追踪 ID'],['Access-Control-Allow-Origin','CORS 允许来源'],['Access-Control-Allow-Methods','CORS 允许方法'],['Access-Control-Allow-Headers','CORS 允许请求头'],['ETag','资源版本（协商缓存）'],['If-None-Match','配合 ETag'],['Last-Modified','最后修改时间'],['Location','重定向目标'],['Set-Cookie','下发 Cookie'],['Strict-Transport-Security','强制 HTTPS'],['X-Content-Type-Options','阻止 MIME 嗅探'],['X-Frame-Options','防点击劫持'],['Content-Security-Policy','内容安全策略']];
const aesKey=async(p,salt)=>{const km=await crypto.subtle.importKey('raw',utf8b(p),'PBKDF2',false,['deriveKey']);
  return crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:120000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);};
/* ---------- 图片工具框架 ---------- */
function imgTool(def){
  return function(host){
    host.innerHTML='';
    const ff=el('input',{type:'file',accept:'image/*'}),fld=el('div',{cls:'fld'});
    fld.appendChild(el('label',{},'① 选择图片（也可直接把图片拖到页面上）'));fld.appendChild(ff);
    const ctl=el('div'),dlrow=el('div',{cls:'btnrow'}),cv=el('canvas',{cls:'prev'}),msg=el('p',{cls:'out'},'');
    host.append(fld,ctl,dlrow,cv,msg);
    const vals=()=>{const v={};host.querySelectorAll('[data-k]').forEach(e=>{v[e.dataset.k]=e.type==='checkbox'?e.checked:e.value;});return v;};
    const ctx={cv,dlrow,msg,vals,host,img:null,name:'image',size:0,
      redraw(){if(!ctx.img)return;try{def.apply(ctx);}catch(e){msg.textContent='❌ '+(e&&e.message?e.message:e);}}};
    if(def.ctl)def.ctl(ctx,ctl);
    const use=async f=>{ctx.name=(f.name||'image').replace(/\.[^.]+$/,'');ctx.size=f.size;msg.textContent='读取图片…';
      try{ctx.img=await loadImg(await readFile(f,'data'));msg.textContent='';ctx.redraw();}catch(e){msg.textContent='❌ '+(e&&e.message?e.message:e);}};
    ff.onchange=()=>{if(ff.files[0])use(ff.files[0]);};
    ctl.addEventListener('input',ctx.redraw);
    LOADER=use;
    if(PENDING){const f=PENDING;PENDING=null;use(f);}
  };
}
const ctlRng=(k,l,mn,mx,v,st)=>{const w=el('div',{cls:'fld'}),lb=el('label',{},l+'：'+v),i=el('input',{type:'range','data-k':k,min:mn,max:mx,step:st||1,value:v});i.addEventListener('input',()=>{lb.textContent=l+'：'+i.value;});w.append(lb,i);return w;};
const ctlTxt=(k,l,v,ph)=>{const w=el('div',{cls:'fld'});w.appendChild(el('label',{},l));w.appendChild(el('input',{type:'text','data-k':k,value:v||'',placeholder:ph||''}));return w;};
const ctlSel=(k,l,o)=>{const w=el('div',{cls:'fld'});w.appendChild(el('label',{},l));const s=el('select',{'data-k':k});o.forEach(x=>s.appendChild(el('option',{value:x[0]},x[1])));w.appendChild(s);return w;};
const ctlChk=(k,l,on)=>{const lb=el('label',{cls:'chk'}),i=el('input',{type:'checkbox','data-k':k});i.checked=!!on;lb.append(i,document.createTextNode(' '+l));return lb;};
const ctlRow=(...xs)=>{const w=el('div');xs.forEach(x=>{x.style.flex='1 1 130px';w.appendChild(x);});w.style.display='flex';w.style.gap='10px';w.style.flexWrap='wrap';return w;};
const dlCanvas=(row,cv,name,fmt,q)=>{row.innerHTML='';const b=el('button',{cls:'mini'},'⬇ 下载图片');b.onclick=()=>cv.toBlob(bl=>{if(bl)dl(bl,name+'.'+(fmt==='image/jpeg'?'jpg':fmt==='image/webp'?'webp':'png'));},fmt,q);row.appendChild(b);};
/* 图片压缩转换 */
mkC('图片文件','图片压缩转换','压缩体积 + 转 JPG/PNG/WebP，可改尺寸',imgTool({
  ctl:(c,h)=>h.append(ctlRng('q','输出质量（JPG/WEBP）',20,100,80),ctlRow(ctlTxt('w','最大宽度 px（留空=原图）','','800'),ctlSel('f','输出格式',[['jpeg','JPG'],['webp','WebP'],['png','PNG']]))),
  apply:c=>{const v=c.vals(),im=c.img,mw=parseInt(v.w)||0,W=mw&&mw<im.width?mw:im.width,H=Math.round(im.height*W/im.width);
    const cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,W,H);g.drawImage(im,0,0,W,H);
    c.cv.width=W;c.cv.height=H;c.cv.getContext('2d').drawImage(cv,0,0);
    const mime='image/'+v.f,q=Math.max(.05,Math.min(1,v.q/100));
    cv.toBlob(b=>{if(!b){c.msg.textContent='❌ 导出失败（浏览器可能不支持该格式）';return;}
      c.msg.textContent='尺寸 '+W+' × '+H+' px ｜ 原图 '+(c.size/1024).toFixed(1)+' KB → 输出 '+(b.size/1024).toFixed(1)+' KB'+(b.size<c.size?'，缩减 '+Math.round((1-b.size/c.size)*100)+'%':'，比原图大 '+Math.round((b.size/c.size-1)*100)+'%')+(b.type===mime?'':'（该格式不受支持，已按 PNG 导出）');
      dlCanvas(c.dlrow,cv,c.name,mime,q);},mime,q);}
}),'image/*');
/* 图片裁剪旋转 */
mkC('图片文件','图片裁剪旋转','旋转 / 翻转 / 居中裁剪 / 缩放',imgTool({
  ctl:(c,h)=>h.append(ctlRow(ctlRng('r','旋转角度',0,360,0,90),ctlSel('a','裁剪比例',[['src','不裁剪'],['1:1','1:1'],['4:3','4:3'],['3:4','3:4'],['16:9','16:9'],['9:16','9:16']])),ctlRow(ctlTxt('w','输出宽度 px（留空=原尺寸）','','600'),ctlSel('fm','输出格式',[['png','PNG'],['jpeg','JPG'],['webp','WebP']])),ctlRow(ctlChk('hx','水平翻转'),ctlChk('hy','垂直翻转'))),
  apply:c=>{const v=c.vals(),im=c.img,rot=((parseFloat(v.r)||0)%360+360)%360,sx=v.hx?-1:1,sy=v.hy?-1:1;
    const rad=rot*Math.PI/180,rw=Math.max(1,Math.round(im.width*Math.abs(Math.cos(rad))+im.height*Math.abs(Math.sin(rad)))),rh=Math.max(1,Math.round(im.width*Math.abs(Math.sin(rad))+im.height*Math.abs(Math.cos(rad))));
    const t=document.createElement('canvas');t.width=rw;t.height=rh;const g=t.getContext('2d');
    g.translate(rw/2,rh/2);g.rotate(rad);g.scale(sx,sy);g.drawImage(im,-im.width/2,-im.height/2);
    let W=rw,H=rh,x=0,y=0;
    if(v.a!=='src'){const p=v.a.split(':').map(Number),tg=p[0]/p[1];let cw=W,ch=W/tg;if(ch>H){ch=H;cw=H*tg;}x=Math.round((W-cw)/2);y=Math.round((H-ch)/2);W=Math.round(cw);H=Math.round(ch);}
    const oW=parseInt(v.w)||W,oH=Math.max(1,Math.round(H*oW/W)),cv=document.createElement('canvas');cv.width=oW;cv.height=oH;
    const g2=cv.getContext('2d');if(v.fm==='jpeg'){g2.fillStyle='#fff';g2.fillRect(0,0,oW,oH);}g2.drawImage(t,x,y,W,H,0,0,oW,oH);
    c.cv.width=oW;c.cv.height=oH;c.cv.getContext('2d').drawImage(cv,0,0);
    c.msg.textContent='输出 '+oW+' × '+oH+' px（旋转 '+rot+'°'+(v.a!=='src'?'，裁剪 '+v.a:'')+((v.hx||v.hy)?'，已翻转':'')+'）';
    dlCanvas(c.dlrow,cv,c.name+'-edit','image/'+v.fm,.92);}
}),'image/*');
/* 图片加水印 */
mkC('图片文件','图片加水印','文字水印，九宫格定位 / 平铺',imgTool({
  ctl:(c,h)=>h.append(ctlTxt('t','水印文字','© 我的工具箱'),ctlRow(ctlRng('fs','字号',12,140,36),ctlRng('op','透明度 %',10,100,65)),ctlRow(ctlSel('p','位置',[['tl','左上'],['tc','上中'],['tr','右上'],['ml','左中'],['mc','居中'],['mr','右中'],['bl','左下'],['bc','下中'],['br','右下']]),ctlTxt('col','颜色','#ffffff')),ctlChk('tile','平铺水印（防盗图）',false)),
  apply:c=>{const v=c.vals(),im=c.img,cv=document.createElement('canvas');cv.width=im.width;cv.height=im.height;
    const g=cv.getContext('2d');g.drawImage(im,0,0);
    const fs=+v.fs||36,txt=v.t||'',pad=Math.max(8,fs*.4);
    g.font='bold '+fs+'px sans-serif';g.globalAlpha=(+v.op||65)/100;g.fillStyle=v.col||'#ffffff';g.textBaseline='top';
    g.shadowColor='rgba(0,0,0,.35)';g.shadowBlur=Math.max(2,fs/8);
    const tw=g.measureText(txt).width,pos={tl:[pad,pad],tc:[(im.width-tw)/2,pad],tr:[im.width-tw-pad,pad],ml:[pad,(im.height-fs)/2],mc:[(im.width-tw)/2,(im.height-fs)/2],mr:[im.width-tw-pad,(im.height-fs)/2],bl:[pad,im.height-fs-pad],bc:[(im.width-tw)/2,im.height-fs-pad],br:[im.width-tw-pad,im.height-fs-pad]}[v.p||'br'];
    if(v.tile){g.shadowBlur=0;g.save();g.translate(im.width/2,im.height/2);g.rotate(-Math.PI/7);g.translate(-im.width/2,-im.height/2);
      const sX=Math.max(tw+fs*2,140),sY=Math.max(fs*3,110);
      for(let y=-im.height;y<im.height*1.6;y+=sY)for(let x=-im.width;x<im.width*1.3;x+=sX)g.fillText(txt,x,y);
      g.restore();}
    else g.fillText(txt,pos[0],pos[1]);
    g.globalAlpha=1;g.shadowBlur=0;
    c.cv.width=cv.width;c.cv.height=cv.height;c.cv.getContext('2d').drawImage(cv,0,0);
    c.msg.textContent='水印已应用（'+im.width+' × '+im.height+' px，导出 PNG）';
    dlCanvas(c.dlrow,cv,c.name+'-watermark','image/png');}
}),'image/*');
/* 图片取色器 */
mkC('图片文件','图片取色器','点击图片取色，一键复制',imgTool({
  apply:c=>{const im=c.img,sc=Math.min(1,760/im.width),W=Math.max(1,Math.round(im.width*sc)),H=Math.max(1,Math.round(im.height*sc));
    c.cv.width=W;c.cv.height=H;const g=c.cv.getContext('2d');g.drawImage(im,0,0,W,H);
    c.picked=c.picked||el('pre',{cls:'mini-out'});
    if(!c.picked.parentNode)c.host.appendChild(c.picked);
    c.list=c.list||[];c.cv.style.cursor='crosshair';
    c.cv.onclick=e=>{const r=c.cv.getBoundingClientRect();
      const x=Math.min(W-1,Math.max(0,Math.round((e.clientX-r.left)*(W/r.width)))),y=Math.min(H-1,Math.max(0,Math.round((e.clientY-r.top)*(H/r.height))));
      const d=g.getImageData(x,y,1,1).data,hex='#'+[d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join('');
      c.list=[hex+'  rgb('+d[0]+', '+d[1]+', '+d[2]+')'].concat(c.list).slice(0,20);
      c.picked.textContent='取色记录（最新在上）：\n'+c.list.join('\n');};
    c.msg.textContent='点击图片任意位置取色'+(sc<1?'（已缩小显示）':'');
    c.dlrow.innerHTML='';
    const cb=el('button',{cls:'mini'},'📋 复制全部 HEX'),rs=el('button',{cls:'mini'},'清空记录');
    cb.onclick=()=>{if(!c.list.length)return toast('还没有取色');navigator.clipboard&&navigator.clipboard.writeText(c.list.map(x=>x.split('  ')[0]).join('\n')).then(()=>toast('已复制 '+c.list.length+' 个颜色'),()=>toast('复制失败'));};
    rs.onclick=()=>{c.list=[];c.picked.textContent='';};
    c.dlrow.append(cb,rs);}
}),'image/*');
/* 主色调提取 */
mkC('图片文件','图片主色调提取','自动提取主色 + CSS 变量',imgTool({
  ctl:(c,h)=>h.append(ctlRng('n','提取颜色数量',3,16,8)),
  apply:c=>{const im=c.img,n=Math.max(1,Math.min(16,parseInt(c.vals().n)||8));
    const t=document.createElement('canvas'),sc=Math.min(90/im.width,90/im.height,1);
    t.width=Math.max(1,Math.round(im.width*sc));t.height=Math.max(1,Math.round(im.height*sc));
    const g=t.getContext('2d');g.drawImage(im,0,0,t.width,t.height);
    const data=g.getImageData(0,0,t.width,t.height).data,map={};let R=0,G=0,Bb=0,cnt=0;
    for(let i=0;i<data.length;i+=4){if(data[i+3]<128)continue;
      const r=data[i],gg=data[i+1],bb=data[i+2];R+=r;G+=gg;Bb+=bb;cnt++;
      const key=((r>>5)<<10)|((gg>>5)<<5)|(bb>>5),o=map[key]||(map[key]={n:0,r:0,g:0,b:0});
      o.n++;o.r+=r;o.g+=gg;o.b+=bb;}
    const arr=Object.values(map).sort((x,y)=>y.n-x.n).slice(0,n).map(o=>{const r=Math.round(o.r/o.n),gg=Math.round(o.g/o.n),bb=Math.round(o.b/o.n);
      return {hex:'#'+[r,gg,bb].map(v=>v.toString(16).padStart(2,'0')).join(''),r,gg,bb,p:o.n/cnt};});
    const avg=cnt?'#'+[R/cnt,G/cnt,Bb/cnt].map(v=>Math.round(v).toString(16).padStart(2,'0')).join(''):'—';
    c.cv.width=t.width;c.cv.height=t.height;c.cv.getContext('2d').drawImage(t,0,0);
    c.list=c.list||el('pre',{cls:'mini-out'});if(!c.list.parentNode)c.host.appendChild(c.list);
    c.list.textContent=arr.map(o=>o.hex+'   rgb('+o.r+', '+o.gg+', '+o.bb+')   占比 '+(o.p*100).toFixed(1)+'%').join('\n')+'\n\nCSS 变量：\n'+arr.map((o,i)=>'  --c'+(i+1)+': '+o.hex+';').join('\n');
    c.msg.textContent='平均色 '+avg+'（提取 '+arr.length+' 个主色）';
    c.dlrow.innerHTML='';
    const b1=el('button',{cls:'mini'},'📋 复制 HEX 列表'),b2=el('button',{cls:'mini'},'⬇ 下载 CSS'),css=':root{\n'+arr.map((o,i)=>'  --c'+(i+1)+': '+o.hex+';').join('\n')+'\n}';
    b1.onclick=()=>navigator.clipboard&&navigator.clipboard.writeText(arr.map(o=>o.hex).join('\n')).then(()=>toast('已复制'));
    b2.onclick=()=>dlText(css,'palette.css');
    c.dlrow.append(b1,b2);}
}),'image/*');
/* 图片转 Base64 */
mkC('图片文件','图片转Base64','DataURL / CSS / IMG / JS 常量',imgTool({
  ctl:(c,h)=>h.append(ctlSel('t','输出形式',[['raw','纯 DataURL'],['css','CSS background'],['img','HTML img 标签'],['js','JS 常量']]),ctlRng('q','压缩质量（越小体积越小）',30,100,90)),
  apply:c=>{const v=c.vals(),im=c.img,q=+v.q/100,fmt=q<1?'image/jpeg':'image/png';
    const cv=document.createElement('canvas'),sc=Math.min(1,1600/im.width);
    cv.width=Math.max(1,Math.round(im.width*sc));cv.height=Math.max(1,Math.round(im.height*sc));
    const g=cv.getContext('2d');if(fmt==='image/jpeg'){g.fillStyle='#fff';g.fillRect(0,0,cv.width,cv.height);}
    g.drawImage(im,0,0,cv.width,cv.height);
    const url=cv.toDataURL(fmt,q);
    let out=url;
    if(v.t==='css')out='background-image: url("'+url+'");';
    else if(v.t==='img')out='<img src="'+url+'" alt="">';
    else if(v.t==='js')out='const imgData = "'+url+'";';
    c.cv.width=cv.width;c.cv.height=cv.height;c.cv.getContext('2d').drawImage(cv,0,0);
    c.ta=c.ta||el('textarea',{cls:'tall'});c.ta.readOnly=true;
    if(!c.ta.parentNode)c.host.appendChild(c.ta);
    c.ta.value=out;
    c.msg.textContent='输出 '+cv.width+' × '+cv.height+' px ｜ 文本长度 '+out.length+' 字符（约 '+(out.length/1024).toFixed(1)+' KB）';
    c.dlrow.innerHTML='';
    const cb=el('button',{cls:'mini'},'📋 复制'),db=el('button',{cls:'mini'},'⬇ 下载 .txt');
    cb.onclick=()=>{c.ta.select();navigator.clipboard&&navigator.clipboard.writeText(out).then(()=>toast('已复制'),()=>toast('复制失败'));};
    db.onclick=()=>dlText(out,c.name+'-base64.txt');
    c.dlrow.append(cb,db);}
}),'image/*');
/* 九宫格切图 */
mkC('图片文件','九宫格切图','切成 3×3，点击单格下载',imgTool({
  apply:c=>{const im=c.img,W=Math.floor(im.width/3),H=Math.floor(im.height/3),grid=el('div',{cls:'grid9'}),cells=[];
    for(let r=0;r<3;r++)for(let col=0;col<3;col++){
      const cv=document.createElement('canvas');cv.width=W;cv.height=H;
      cv.getContext('2d').drawImage(im,col*W,r*H,W,H,0,0,W,H);
      cv.title='点击下载第 '+(r*3+col+1)+' 格';
      cv.onclick=()=>cv.toBlob(b=>b&&dl(b,c.name+'-'+(r*3+col+1)+'.png'));
      grid.appendChild(cv);cells.push([cv,r*3+col+1]);}
    if(c.grid)c.grid.remove();
    c.grid=grid;c.host.appendChild(grid);c.cv.style.display='none';
    c.msg.textContent='每格 '+W+' × '+H+' px（共 9 格，可单格点击下载或一键全下）';
    c.dlrow.innerHTML='';
    const b=el('button',{cls:'mini'},'⬇ 全部下载（9 张）');
    b.onclick=()=>cells.forEach(([cv,i])=>setTimeout(()=>cv.toBlob(bl=>bl&&dl(bl,c.name+'-'+i+'.png')),i*350));
    c.dlrow.appendChild(b);}
}),'image/*');
/* 文件哈希校验 */
mkC('图片文件','文件哈希校验','本地计算 MD5/SHA，校验下载文件',host=>{
  host.innerHTML='';
  const ff=el('input',{type:'file'}),fld=el('div',{cls:'fld'});
  fld.appendChild(el('label',{},'选择任意文件（本地计算，绝不上传）'));fld.appendChild(ff);
  const row=el('div',{cls:'btnrow'}),pre=el('pre',{cls:'mini-out'}),msg=el('p',{cls:'out'},'');
  const cp=el('button',{cls:'mini'},'📋 复制结果');row.appendChild(cp);
  host.append(fld,row,msg,pre);
  let txt='';
  const run=async f=>{pre.textContent='';txt='';msg.textContent='读取文件…';
    try{const u8=new Uint8Array(await readFile(f,'buf'));
      let out='文件：'+f.name+'\n大小：'+sz(f.size)+'（'+f.size+' 字节）\n类型：'+(f.type||'未知')+'\n\nMD5：    '+md5bytes(u8);
      if(window.crypto&&crypto.subtle)for(const a of ['SHA-1','SHA-256','SHA-512']){
        msg.textContent='计算 '+a+'…';const h=await crypto.subtle.digest(a,u8);
        out+='\n'+a+'：'+[...new Uint8Array(h)].map(x=>x.toString(16).padStart(2,'0')).join('');}
      else out+='\n（当前环境不支持 Web Crypto，只能算 MD5）';
      pre.textContent=out;txt=out;msg.textContent='✅ 计算完成';}
    catch(e){msg.textContent='❌ '+(e&&e.message?e.message:e);}};
  ff.onchange=()=>{if(ff.files[0])run(ff.files[0]);};
  cp.onclick=()=>{if(!txt)return toast('还没有结果');navigator.clipboard&&navigator.clipboard.writeText(txt).then(()=>toast('已复制'),()=>toast('复制失败'));};
  LOADER=run;if(PENDING){const f=PENDING;PENDING=null;run(f);}
});
/* 文件信息查看 */
mkC('图片文件','文件信息查看','大小/类型/图片尺寸/文本统计',host=>{
  host.innerHTML='';
  const ff=el('input',{type:'file'}),fld=el('div',{cls:'fld'});
  fld.appendChild(el('label',{},'选择任意文件（本地分析）'));fld.appendChild(ff);
  const msg=el('p',{cls:'out'},''),pre=el('pre',{cls:'mini-out'});
  host.append(fld,msg,pre);
  const run=async f=>{msg.textContent='分析中…';pre.textContent='';
    let t='文件名称：'+f.name+'\n文件大小：'+sz(f.size)+'（'+f.size+' 字节）\nMIME 类型：'+(f.type||'未知')+'\n扩展名：'+(f.name.indexOf('.')>0?f.name.split('.').pop().toLowerCase():'（无）')+'\n最后修改：'+new Date(f.lastModified).toLocaleString();
    try{
      if(f.type.indexOf('image/')===0){const im=await loadImg(await readFile(f,'data'));
        t+='\n\n【图片信息】\n尺寸：'+im.width+' × '+im.height+' px\n宽高比：'+(im.width/im.height).toFixed(3)+'\n像素总数：'+(im.width*im.height).toLocaleString();}
      else if(f.size<6e6){const txt=await readFile(f);
        t+='\n\n【按 UTF-8 文本读取】\n字符数：'+[...txt].length+'\n行数：'+txt.split('\n').length+'\nUTF-8 字节：'+B(txt)+'\n\n前 400 字符：\n'+txt.slice(0,400);}
    }catch(e){t+='\n\n（附加分析失败：'+(e&&e.message?e.message:e)+'）';}
    pre.textContent=t;msg.textContent='✅ 完成';};
  ff.onchange=()=>{if(ff.files[0])run(ff.files[0]);};
  LOADER=run;if(PENDING){const f=PENDING;PENDING=null;run(f);}
});
/* ================= 效率工具 ================= */
mkC('效率','秒表','计时 + 计次（支持暂停）',host=>{
  host.innerHTML='';
  const disp=el('div',{cls:'timer'},'00:00.00'),row=el('div',{cls:'btnrow'}),list=el('pre',{cls:'mini-out'});
  const bS=el('button',{cls:'mini pri'},'开始'),bL=el('button',{cls:'mini'},'计次'),bR=el('button',{cls:'mini'},'重置');
  row.append(bS,bL,bR);host.append(disp,row,list);
  let t0=0,acc=0,timer=null,laps=[];
  const f=ms=>pad2(Math.floor(ms/60000))+':'+pad2(Math.floor(ms%60000/1000))+'.'+pad2(Math.floor(ms%1000/10));
  const cR=()=>acc+(timer?Date.now()-t0:0);
  bS.onclick=()=>{if(timer){acc+=Date.now()-t0;clearInterval(timer);timer=null;bS.textContent='继续';disp.textContent=f(acc);}
    else{t0=Date.now();timer=setInterval(()=>{disp.textContent=f(cR());},31);bS.textContent='暂停';}};
  bL.onclick=()=>{const ms=cR();if(!ms)return;laps.push(ms);const last=laps.length>1?ms-laps[laps.length-2]:ms;
    list.textContent='第 '+laps.length+' 次　'+f(ms)+'（本次 '+f(last)+'）\n'+list.textContent;};
  bR.onclick=()=>{clearInterval(timer);timer=null;acc=0;laps=[];list.textContent='';disp.textContent='00:00.00';bS.textContent='开始';};
  return ()=>clearInterval(timer);
});
mkC('效率','倒计时器','到点响铃提醒',host=>{
  host.innerHTML='';
  const row=el('div',{cls:'btnrow'}),disp=el('div',{cls:'timer'},'00:05:00'),msg=el('p',{cls:'out'},'设定时间后点开始，到点会响铃');
  const im=el('input',{type:'number',value:5,min:0}),is=el('input',{type:'number',value:0,min:0,max:59});
  im.style.maxWidth='90px';is.style.maxWidth='90px';
  const ml=el('div',{cls:'fld'});ml.append(el('label',{},'分钟'),im);
  const sl=el('div',{cls:'fld'});sl.append(el('label',{},'秒'),is);
  const wrap=el('div');wrap.style.display='flex';wrap.style.gap='10px';wrap.append(ml,sl);
  const bS=el('button',{cls:'mini pri'},'开始'),bP=el('button',{cls:'mini'},'暂停'),bR=el('button',{cls:'mini'},'重置');
  row.append(bS,bP,bR);host.append(wrap,disp,row,msg);
  let timer=null,end=0,remain=0;
  const f=ms=>pad2(Math.floor(ms/3600000))+':'+pad2(Math.floor(ms%3600000/60000))+':'+pad2(Math.floor(ms%60000/1000));
  const gi=()=>((parseInt(im.value)||0)*60+(parseInt(is.value)||0))*1000;
  im.oninput=is.oninput=()=>{if(!timer){remain=0;disp.textContent=f(gi());}};
  const tick=()=>{const left=end-Date.now();disp.textContent=f(Math.max(0,left));
    if(left<=0){clearInterval(timer);timer=null;beep(6);msg.textContent='时间到！（标签页在后台时可能延迟提醒）';document.title='⏰ 时间到！';setTimeout(()=>{document.title='全能工具箱 · 252 个实用工具';},8000);}};
  bS.onclick=()=>{if(timer)return;if(remain<=0)remain=gi();if(remain<=0)return msg.textContent='请先设定时间';
    end=Date.now()+remain;timer=setInterval(tick,200);msg.textContent='倒计时进行中…';};
  bP.onclick=()=>{if(!timer)return;remain=Math.max(0,end-Date.now());clearInterval(timer);timer=null;disp.textContent=f(remain);msg.textContent='已暂停';};
  bR.onclick=()=>{clearInterval(timer);timer=null;remain=0;disp.textContent=f(gi());msg.textContent='已重置';};
  return ()=>{clearInterval(timer);};
});
mkC('效率','番茄钟','25 分钟专注 + 5 分钟休息自动循环',host=>{
  host.innerHTML='';
  const disp=el('div',{cls:'timer'},'25:00'),phase=el('p',{cls:'out'},'状态：待开始'),row=el('div',{cls:'btnrow'}),stat=el('pre',{cls:'mini-out'},'');
  const wm=el('input',{type:'number',value:25,min:1,step:5}),bm=el('input',{type:'number',value:5,min:1,step:1});
  wm.style.maxWidth='80px';bm.style.maxWidth='80px';
  const fld=el('div',{cls:'fld'}),l1=el('label',{},'专注(分) '),l2=el('label',{},'　休息(分) ');
  l1.appendChild(wm);l2.appendChild(bm);fld.append(l1,l2);
  const bS=el('button',{cls:'mini pri'},'开始'),bP=el('button',{cls:'mini'},'暂停'),bR=el('button',{cls:'mini'},'重置');
  row.append(bS,bP,bR);host.append(fld,disp,phase,row,stat);
  let timer=null,end=0,mode='work',done=0,paused=false;
  const f=s=>pad2(Math.floor(s/60))+':'+pad2(s%60);
  const len=()=>(mode==='work'?(parseInt(wm.value)||25):(parseInt(bm.value)||5))*60;
  const sw=()=>{if(mode==='work'){done++;mode='break';}else mode='work';
    beep(5);phase.textContent=mode==='work'?'状态：开始下一轮专注 💪':'状态：休息一下 ☕';
    stat.textContent='已完成番茄：'+done+' 个\n累计专注：'+done*(parseInt(wm.value)||25)+' 分钟';end=Date.now()+len()*1000;};
  const tick=()=>{if(paused)return;if(Date.now()>=end)sw();disp.textContent=f(Math.max(0,Math.ceil((end-Date.now())/1000)));};
  bS.onclick=()=>{paused=false;if(timer)return;end=Date.now()+len()*1000;timer=setInterval(tick,250);
    phase.textContent=mode==='work'?'状态：专注中 🔥':'状态：休息中 ☕';};
  bP.onclick=()=>{if(!timer)return;paused=!paused;phase.textContent=paused?'状态：已暂停':'状态：进行中';};
  bR.onclick=()=>{clearInterval(timer);timer=null;mode='work';done=0;paused=false;disp.textContent=f(len());phase.textContent='状态：待开始';stat.textContent='';};
  disp.textContent=f(len());
  return ()=>clearInterval(timer);
});
mkC('效率','世界时钟','多城市当前时间与本地时差',host=>{
  host.innerHTML='';
  const row=el('div',{cls:'btnrow'}),inp=el('input',{type:'text',placeholder:'IANA 时区，如 Asia/Shanghai'}),out=el('pre',{cls:'mini-out'});
  inp.style.maxWidth='240px';
  const b=el('button',{cls:'mini'},'＋ 添加时区');row.append(inp,b);host.append(row,out);
  const zones=CITIES.slice();
  const draw=()=>{const now=new Date(),lo=-now.getTimezoneOffset();
    out.textContent=zones.map(([n,z])=>{let s,off=lo;try{s=fmtIn(now,z);off=tzOffsetOf(now,z);}catch(e){return n+'\t（时区无效）';}
      const d=off-lo,sg=d>=0?'+':'-',hh=Math.floor(Math.abs(d)/60),mm=Math.abs(d)%60;
      return n+'\t'+s+(d===0?'\t（与本地同步）':'\t（本地 '+sg+hh+(mm?':'+pad2(mm):':00')+'）');}).join('\n')+
      '\n\n本机：'+fmtT(now)+'（周'+W[now.getDay()]+'）　时区：'+Intl.DateTimeFormat().resolvedOptions().timeZone;};
  b.onclick=()=>{const z=inp.value.trim();if(!z)return;try{fmtIn(new Date(),z);zones.push([z,z]);draw();inp.value='';}catch(e){toast('无效时区，请填写如 Europe/Paris');}};
  draw();const t=setInterval(draw,1000);
  return ()=>clearInterval(t);
});
mk('效率','时区转换','一个时间在多个时区之间换算',[F.in('t','时间（YYYY-MM-DD HH:mm）','2024-07-01 12:00'),F.sel('from','源时区',TZOPT),F.in('to','目标时区（IANA）','America/New_York')],v=>{
  const m=/(\d{4})-(\d{1,2})-(\d{1,2})(?:[ T](\d{1,2}):?(\d{2})?)?/.exec(v.t.trim());
  if(!m)return '❌ 时间格式应为 2024-07-01 12:00';
  const y=+m[1],mo=+m[2],d=+m[3],h=+(m[4]||0),mi=+(m[5]||0);
  let inst;
  if(v.from==='local')inst=new Date(y,mo-1,d,h,mi);
  else{try{inst=tzToInstant(y,mo,d,h,mi,v.from);}catch(e){return '❌ 源时区无效：'+v.from;}}
  const lo=-inst.getTimezoneOffset();
  const line=(n,z)=>{try{const off=tzOffsetOf(inst,z),dd=off-lo;
    return n+'：'+fmtIn(inst,z)+(dd===0?'（与本地同步）':'（时差 '+(dd>=0?'+':'-')+Math.abs(dd/60).toFixed(1)+'h）');}catch(e){return n+'：（时区无效）';}};
  const out=['输入：'+v.t.trim()+'（'+(v.from==='local'?'本地时间':v.from)+'）','','【目标时区】',line(v.to,v.to),'','【同时刻各地时间】'];
  CITIES.forEach(([n,z])=>out.push(line(n,z)));
  out.push('','※ 未覆盖夏令时切换瞬间的边界情况');
  return out.join('\n');});
mkC('效率','文字转语音','把文本读出来（Web Speech API）',host=>{
  host.innerHTML='';
  if(!window.speechSynthesis){host.appendChild(el('p',{cls:'out'},'❌ 当前浏览器不支持语音合成（建议 Chrome / Edge）'));return;}
  const ta=el('textarea',{cls:'tall'});ta.value='你好，这是一个纯前端的文字转语音工具。';
  const lang=el('select');[['zh-CN','中文（普通话）'],['en-US','English (US)'],['ja-JP','日本語'],['ko-KR','한국어']].forEach(x=>lang.appendChild(el('option',{value:x[0]},x[1])));
  const rate=el('input',{type:'range',min:.5,max:2,step:.1,value:1}),pitch=el('input',{type:'range',min:0,max:2,step:.1,value:1});
  const ll=el('div',{cls:'fld'});ll.append(el('label',{},'语言'),lang);
  const rl=el('div',{cls:'fld'});rl.append(el('label',{},'语速'),rate);
  const pl=el('div',{cls:'fld'});pl.append(el('label',{},'音调'),pitch);
  const row=el('div',{cls:'btnrow'}),msg=el('p',{cls:'out'},'※ 部分浏览器需先与页面交互才允许发声');
  const play=el('button',{cls:'mini pri'},'▶ 播放'),pause=el('button',{cls:'mini'},'⏸ 暂停/继续'),stop=el('button',{cls:'mini'},'⏹ 停止');
  row.append(play,pause,stop);host.append(ll,ta,rl,pl,row,msg);
  play.onclick=()=>{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(ta.value);
    u.lang=lang.value;u.rate=+rate.value;u.pitch=+pitch.value;
    u.onstart=()=>msg.textContent='播放中…';u.onend=()=>msg.textContent='播放结束';u.onerror=()=>msg.textContent='播放失败（可能被浏览器拦截）';
    speechSynthesis.speak(u);};
  pause.onclick=()=>{speechSynthesis.paused?speechSynthesis.resume():speechSynthesis.pause();};
  stop.onclick=()=>speechSynthesis.cancel();
  return ()=>{try{speechSynthesis.cancel();}catch(e){}};
});
mkC('效率','语音转文字','麦克风实时识别（Chrome/Edge，需 https）',host=>{
  host.innerHTML='';
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){host.appendChild(el('p',{cls:'out'},'❌ 当前浏览器不支持语音识别（建议 Chrome / Edge，需 https 并允许麦克风）'));return;}
  const rec=new SR();rec.continuous=true;rec.interimResults=true;rec.lang='zh-CN';
  const lang=el('select');[['zh-CN','中文（普通话）'],['en-US','English'],['ja-JP','日本語']].forEach(x=>lang.appendChild(el('option',{value:x[0]},x[1])));
  lang.onchange=()=>{rec.lang=lang.value;};
  const ll=el('div',{cls:'fld'});ll.append(el('label',{},'识别语言'),lang);
  const ta=el('textarea',{cls:'tall'}),tmp=el('p',{cls:'out'},''),row=el('div',{cls:'btnrow'});
  const b1=el('button',{cls:'mini pri'},'● 开始识别'),b2=el('button',{cls:'mini'},'■ 停止'),b3=el('button',{cls:'mini'},'📋 复制'),b4=el('button',{cls:'mini'},'⬇ 下载'),b5=el('button',{cls:'mini'},'清空');
  row.append(b1,b2,b3,b4,b5);host.append(ll,ta,row,tmp);
  rec.onresult=e=>{let fin='',inter='';for(let i=e.resultIndex;i<e.results.length;i++){const r=e.results[i];if(r.isFinal)fin+=r[0].transcript;else inter+=r[0].transcript;}
    if(fin)ta.value+=(ta.value?'\n':'')+fin.trim();tmp.textContent=inter?'识别中：'+inter:'';};
  rec.onerror=e=>tmp.textContent='⚠️ '+e.error+(e.error==='not-allowed'?'（请允许麦克风）':'');
  rec.onend=()=>{b1.textContent='● 开始识别';};
  b1.onclick=()=>{try{rec.start();b1.textContent='● 识别中…';tmp.textContent='请说话…';}catch(e){tmp.textContent='⚠️ '+e.message;}};
  b2.onclick=()=>{try{rec.stop();}catch(e){}tmp.textContent='已停止';};
  b3.onclick=()=>{if(!ta.value)return toast('还没有内容');navigator.clipboard&&navigator.clipboard.writeText(ta.value).then(()=>toast('已复制'),()=>toast('复制失败'));};
  b4.onclick=()=>ta.value&&dlText(ta.value,'语音识别.txt');
  b5.onclick=()=>{ta.value='';tmp.textContent='';};
  return ()=>{try{rec.stop();}catch(e){}};
});
mkC('效率','随机点名','名单滚动抽人，不重复',host=>{
  host.innerHTML='';
  const ta=el('textarea',{cls:'tall'});ta.value='张三\n李四\n王五\n赵六\n钱七\n孙八';
  const fld=el('div',{cls:'fld'});fld.append(el('label',{},'名单（每行一个）'),ta);
  const disp=el('div',{cls:'timer'},'—'),row=el('div',{cls:'btnrow'}),hist=el('pre',{cls:'mini-out'},'');
  const b1=el('button',{cls:'mini pri'},'开始滚动'),b2=el('button',{cls:'mini'},'停止并抽出'),b3=el('button',{cls:'mini'},'重置已抽');
  row.append(b1,b2,b3);host.append(fld,disp,row,hist);
  let timer=null,drawn=[];
  const names=()=>ta.value.split('\n').map(x=>x.trim()).filter(Boolean);
  b1.onclick=()=>{const a=names();if(!a.length)return toast('请先填写名单');clearInterval(timer);timer=setInterval(()=>{disp.textContent=pick(a);},70);};
  b2.onclick=()=>{clearInterval(timer);timer=null;
    const a=names().filter(n=>drawn.indexOf(n)<0);
    if(!a.length){disp.textContent='全部抽完了 🎉';return;}
    const n=pick(a);drawn.push(n);disp.textContent='🎯 '+n;
    hist.textContent='已抽 '+drawn.length+' / '+names().length+'：'+drawn.join('、');};
  b3.onclick=()=>{drawn=[];hist.textContent='';disp.textContent='—';};
  return ()=>clearInterval(timer);
});
/* ================= v2 第 2 段：生成 4 + 文本 7 + 编码 2 + 日期 2 + 开发 11 + 数学 4 + 生活 5 ================= */
/* ---------- 生成 ---------- */
mk('生成','随机分组','名单随机分成 N 组',[F.ta('s','名单（每行一个）','张三\n李四\n王五\n赵六\n钱七\n孙八\n周九\n吴十'),F.num('n','组数',3)],v=>{
  const a=v.s.split('\n').map(x=>x.trim()).filter(Boolean),n=Math.max(1,Math.min(20,parseInt(v.n)||1));
  if(!a.length)return '❌ 请输入名单';
  const gs=Array.from({length:n},()=>[]);shuffle(a).forEach((x,i)=>gs[i%n].push(x));
  return '共 '+a.length+' 人，随机分成 '+n+' 组：\n\n'+gs.map((g,i)=>'第 '+(i+1)+' 组（'+g.length+' 人）：'+g.join('、')).join('\n');});
mkC('生成','二维码生成','文本/链接 → 二维码（首次需联网）',host=>{
  host.innerHTML='';
  const ta=el('textarea',{cls:'tall'});ta.value='https://github.com';
  const fld=el('div',{cls:'fld'});fld.append(el('label',{},'内容（网址、文本、中文均可）'),ta);
  const ecl=el('select');[['M','容错 M（默认）'],['L','容错 L'],['Q','容错 Q'],['H','容错 H（最强）']].forEach(x=>ecl.appendChild(el('option',{value:x[0]},x[1])));
  const fl2=el('div',{cls:'fld'});fl2.append(el('label',{},'容错级别'),ecl);
  const sl=el('div',{cls:'fld'}),sz=el('input',{type:'range',min:3,max:14,step:1,value:7});
  sl.append(el('label',{},'格子大小'),sz);
  const row=el('div',{cls:'btnrow'}),b=el('button',{cls:'mini pri'},'生成二维码'),msg=el('p',{cls:'out'},''),cv=el('canvas',{cls:'prev'});
  cv.style.maxWidth='320px';row.appendChild(b);
  host.append(fld,fl2,sl,row,cv,msg);
  const gen=async()=>{
    msg.textContent='加载二维码组件…';
    try{
      const qrcode=window.qrcode||await loadJS(CDN.qr).then(()=>window.qrcode);
      const txt=ta.value;if(!txt.trim()){msg.textContent='❌ 请输入内容';return;}
      const qr=qrcode(0,ecl.value);qr.addData(txt);qr.make();
      const cnt=qr.getModuleCount(),cell=+sz.value,m=3,size=(cnt+m*2)*cell;
      cv.width=size;cv.height=size;const g=cv.getContext('2d');
      g.fillStyle='#fff';g.fillRect(0,0,size,size);g.fillStyle='#000';
      for(let r=0;r<cnt;r++)for(let c=0;c<cnt;c++)if(qr.isDark(r,c))g.fillRect((c+m)*cell,(r+m)*cell,cell,cell);
      msg.textContent='✅ 生成成功：'+cnt+' × '+cnt+' 模块（'+size+' px）';
      let dr=host.querySelector('.qr-dl');if(!dr){dr=el('div',{cls:'btnrow qr-dl'});cv.after(dr);}
      dr.innerHTML='';const db=el('button',{cls:'mini'},'⬇ 下载 PNG');db.onclick=()=>cv.toBlob(x=>x&&dl(x,'qrcode.png'));dr.appendChild(db);
    }catch(e){msg.textContent='❌ '+(e&&e.message?e.message:e)+'（内容过长或组件加载失败）';}
  };
  b.onclick=gen;sz.addEventListener('change',()=>{if(msg.textContent.indexOf('✅')===0)gen();});
  gen();
});
mkC('生成','条形码生成','Code128 / EAN13 / UPC 等（首次需联网）',host=>{
  host.innerHTML='';
  const inp=el('input',{type:'text',value:'ABC-12345678'});
  const fld=el('div',{cls:'fld'});fld.append(el('label',{},'内容（EAN13 需 12-13 位数字，UPC 需 11-12 位）'),inp);
  const fmt=el('select');[['CODE128','CODE128（最通用）'],['EAN13','EAN13'],['UPC','UPC-A'],['CODE39','CODE39'],['ITF14','ITF-14'],['MSI','MSI'],['codabar','Codabar'],['pharmacode','Pharmacode']].forEach(x=>fmt.appendChild(el('option',{value:x[0]},x[1])));
  const fl2=el('div',{cls:'fld'});fl2.append(el('label',{},'格式'),fmt);
  const wl=el('div',{cls:'fld'}),w=el('input',{type:'range',min:1,max:5,step:1,value:2});wl.append(el('label',{},'线条宽度'),w);
  const hl=el('div',{cls:'fld'}),hh=el('input',{type:'range',min:30,max:180,step:10,value:90});hl.append(el('label',{},'高度'),hh);
  const row=el('div',{cls:'btnrow'}),b=el('button',{cls:'mini pri'},'生成条形码'),msg=el('p',{cls:'out'},''),cv=el('canvas',{cls:'prev'});
  cv.style.maxWidth='100%';row.appendChild(b);
  host.append(fld,fl2,wl,hl,row,cv,msg);
  const gen=async()=>{msg.textContent='加载条形码组件…';
    try{const JsBarcode=window.JsBarcode||await loadJS(CDN.bar).then(()=>window.JsBarcode);
      JsBarcode(cv,inp.value,{format:fmt.value,width:+w.value,height:+hh.value,displayValue:true,margin:8,background:'#ffffff',lineColor:'#000000'});
      msg.textContent='✅ 生成成功';
      let dr=host.querySelector('.bar-dl');if(!dr){dr=el('div',{cls:'btnrow bar-dl'});cv.after(dr);}
      dr.innerHTML='';const db=el('button',{cls:'mini'},'⬇ 下载 PNG');db.onclick=()=>cv.toBlob(x=>x&&dl(x,'barcode.png'));dr.appendChild(db);
    }catch(e){msg.textContent='❌ '+(e&&e.message?e.message:e);}};
  b.onclick=gen;[inp,fmt,w,hh].forEach(x=>x.addEventListener('change',gen));
  gen();
});
mk('生成','假公司订单号','演示用公司名 / 订单号 / 信用代码',[F.num('n','数量',10)],v=>{
  const N=Math.max(1,Math.min(50,parseInt(v.n)||10));
  const CITY='北京 上海 广州 深圳 杭州 成都 武汉 西安 南京 苏州 长沙 青岛 厦门 天津 重庆 合肥 郑州 济南 福州 昆明'.split(' ');
  const W1=['星辰','云端','未来','智联','光速','宏图','恒信','远方','蓝海','拓维','思远','极光','天启','汇通','联创','中科','金鼎','万象','博远','弘毅'];
  const W2=['科技','网络','信息','数据','智能','电子','文化','商贸','物流','教育','医疗','新能源','供应链','数字'];
  const W3=['有限公司','集团','股份有限公司','有限责任公司'];
  const CH='0123456789ABCDEFGHJKLMNPQRTUWXY'.split(''),out=[];
  for(let i=0;i<N;i++){
    const d=new Date(Date.now()-ri(0,240)*864e5);
    out.push(pick(CITY)+pick(W1)+pick(W2)+pick(W3)+'\n  统一社会信用代码（演示）：'+String(ri(1,9))+Array.from({length:17},()=>pick(CH)).join('')+
      '\n  订单号：'+d.getFullYear()+pad2(d.getMonth()+1)+pad2(d.getDate())+Array.from({length:6},()=>ri(0,9)).join(''));
  }
  return out.join('\n\n')+'\n\n※ 全部为随机生成，仅用于测试与演示，非真实主体';});
/* ---------- 文本 ---------- */
TT('阅读时长估算','估算默读 / 朗读所需时间',s=>{
  const cjk=(s.match(/[\u4e00-\u9fa5]/g)||[]).length,wd=(s.match(/[A-Za-z]+/g)||[]).length,dg=(s.match(/\d+(\.\d+)?/g)||[]).length;
  const fm=m=>{const a=Math.floor(m),b=Math.round((m-a)*60);return a?a+' 分 '+b+' 秒':b+' 秒';};
  return '总字符数：'+[...s].length+'\n汉字：'+cjk+'　英文单词：'+wd+'　数字串：'+dg+'\n\n默读（≈300 字/分）：'+fm(cjk/300+wd/200+dg/40)+'\n朗读（≈200 字/分）：'+fm(cjk/200+wd/140)+'\n\n※ 估算值，随内容难度与语速变化';});
mk('文本','敏感词检测','扫描常见营销/风险词并定位',[F.ta('a','待检测文本'),F.in('b','自定义词（逗号分隔，可留空）','')],v=>{
  const base=['办证','代开','发票','刷单','兼职日结','加微信','私聊','免费领取','点击领取','加我','内部渠道','包过','押金','返利','赌博','博彩','贷款秒批','无抵押','高额回报','稳赚','复制链接','优惠券群','扫码进群'];
  const ws=[...new Set(base.concat(v.b.split(/[,，\s]+/).map(x=>x.trim()).filter(Boolean)))],hits=[];
  ws.forEach(w=>{let i=0;while((i=v.a.indexOf(w,i))!==-1){hits.push([w,i]);i+=w.length;}});
  if(!hits.length)return '✅ 未命中敏感词（共检测 '+ws.length+' 个词）';
  hits.sort((a,b)=>a[1]-b[1]);
  return '⚠️ 命中 '+hits.length+' 处：\n\n'+hits.slice(0,60).map(([w,i])=>'· 「'+w+'」第 '+v.a.slice(0,i).split('\n').length+' 行（位置 '+i+'）\n  上下文：'+v.a.slice(Math.max(0,i-14),i+w.length+14).replace(/\n/g,'⏎')).join('\n')+'\n\n※ 词表可在第二个输入框补充，结果仅供参考';});
mk('文本','集合运算','交集/并集/差集/对称差（按行）',[F.ta('a','集合 A（每行一个）','苹果\n香蕉\n橙子'),F.ta('b','集合 B（每行一个）','香蕉\n橙子\n葡萄'),F.sel('m','运算',[['inter','交集 A ∩ B'],['union','并集 A ∪ B'],['diff','差集 A − B'],['sym','对称差 A △ B'],['dedup','A 去重']])],v=>{
  const sa=[...new Set(v.a.split('\n').map(x=>x.trim()).filter(Boolean))],sb=[...new Set(v.b.split('\n').map(x=>x.trim()).filter(Boolean))];
  let out,label;
  if(v.m==='inter'){out=sa.filter(x=>sb.indexOf(x)>=0);label='交集 A ∩ B';}
  else if(v.m==='union'){out=sa.slice();sb.forEach(x=>{if(out.indexOf(x)<0)out.push(x);});label='并集 A ∪ B';}
  else if(v.m==='diff'){out=sa.filter(x=>sb.indexOf(x)<0);label='差集 A − B';}
  else if(v.m==='sym'){out=sa.filter(x=>sb.indexOf(x)<0).concat(sb.filter(x=>sa.indexOf(x)<0));label='对称差 A △ B';}
  else{out=sa;label='A 去重';}
  return label+'\nA '+sa.length+' 项，B '+sb.length+' 项 → 结果 '+out.length+' 项\n\n'+(out.join('\n')||'（空集）');});
TT('中英文加空格','汉字与英数字之间自动加空格',s=>s.replace(/([\u4e00-\u9fa5])([A-Za-z0-9@#$%&])/g,'$1 $2').replace(/([A-Za-z0-9!?,.;:%)\]])([\u4e00-\u9fa5])/g,'$1 $2'));
mk('文本','模板批量生成','按模板 + 值列表批量拼文本',[F.ta('a','模板（{n}=序号，{v}=值）','INSERT INTO t VALUES ({n}, \'{v}\');'),F.ta('b','值列表（每行一个）','张三\n李四\n王五')],v=>{
  const vals=v.b.split('\n').map(x=>x.trim()).filter(Boolean);
  if(!vals.length)return '❌ 请输入值列表';
  return vals.map((x,i)=>v.a.replace(/\{v\}/g,x).replace(/\{n\}/g,String(i+1))).join('\n');});
mk('文本','简繁转换','简↔繁、台湾/香港用字（首次需联网）',[F.ta('a','文本','这个软件的工具箱非常好用，里面有二百多个功能。'),F.sel('d','方向',[['cn2tw','简体 → 繁体（台湾）'],['cn2hk','简体 → 繁体（香港）'],['t2cn','繁体 → 简体']])],async v=>{
  const OC=window.OpenCC||await loadJS(CDN.oc).then(()=>window.OpenCC);
  if(!OC||!OC.Converter)return '❌ OpenCC 组件加载异常，请稍后重试';
  const mp={cn2tw:['cn','tw'],cn2hk:['cn','hk'],t2cn:['tw','cn']}[v.d];
  window.__occ=window.__occ||{};
  const key=mp[0]+'_'+mp[1];
  window.__occ[key]=window.__occ[key]||OC.Converter({from:mp[0],to:mp[1]});
  try{return window.__occ[key](v.a);}catch(e){return '❌ 转换失败：'+e.message;}});
mk('文本','拼音注音','汉字转拼音（声调/首字母）（首次需联网）',[F.ta('a','中文文本','你好，世界！工具箱'),F.sel('m','模式',[['sym','带声调 nǐ hǎo'],['num','数字声调 ni3 hao3'],['non','无声调 ni hao'],['first','首字母 n h']])],async v=>{
  const P=window.pinyinPro||await loadJS(CDN.py).then(()=>window.pinyinPro);
  if(!P||!P.pinyin)return '❌ 拼音组件加载异常，请稍后重试';
  const opt={sym:{toneType:'symbol'},num:{toneType:'num'},non:{toneType:'none'},first:{toneType:'none',pattern:'first'}}[v.m];
  try{const r=P.pinyin(v.a,opt);return Array.isArray(r)?r.join(' '):String(r);}catch(e){return '❌ 转换失败：'+e.message;}});
/* ---------- 编码 ---------- */
mk('编码','AES加密','用密码加密文本（需 https 环境）',[F.ta('s','明文','要加密的秘密内容'),F.in('p','密码','')],async v=>{
  if(!(window.crypto&&crypto.subtle))return '⚠️ 当前环境不支持 Web Crypto（需 https 页面）';
  if(!v.p)return '❌ 请输入密码';
  try{const salt=crypto.getRandomValues(new Uint8Array(16)),iv=crypto.getRandomValues(new Uint8Array(12));
    const key=await aesKey(v.p,salt),ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},key,utf8b(v.s)));
    const all=new Uint8Array(28+ct.length);all.set(salt);all.set(iv,16);all.set(ct,28);
    return 'AES-256-GCM 密文（Base64，含随机 salt + iv）：\n\n'+u8b64(all)+'\n\n※ 密码丢失无法恢复，请妥善保存';}
  catch(e){return '❌ 加密失败：'+e.message;}});
mk('编码','AES解密','用密码解密上一步的密文',[F.ta('s','密文（Base64）',''),F.in('p','密码','')],async v=>{
  if(!(window.crypto&&crypto.subtle))return '⚠️ 当前环境不支持 Web Crypto（需 https 页面）';
  try{const all=b64u8(v.s.trim());
    if(all.length<29)return '❌ 密文长度不足，请检查是否复制完整';
    const key=await aesKey(v.p,all.subarray(0,16));
    const pt=await crypto.subtle.decrypt({name:'AES-GCM',iv:all.subarray(16,28)},key,all.subarray(28));
    return utf8d(new Uint8Array(pt));}
  catch(e){return '❌ 解密失败：密码不正确，或密文被修改过';}});
/* ---------- 日期 ---------- */
mk('日期','日期批量加减','给多行日期统一加减天数',[F.ta('a','日期列表（每行一个）','2024-01-01\n2024-06-15\n2024-12-31'),F.num('n','天数（可为负）',30)],v=>{
  const lines=v.a.split('\n').map(x=>x.trim()).filter(Boolean);
  if(!lines.length)return '❌ 请输入日期';
  const n=parseInt(v.n)||0,out=[];let bad=0;
  lines.forEach(l=>{const d=pd(l);if(!d){bad++;return;}d.setDate(d.getDate()+n);out.push(l+'　→　'+fmtD(d)+'（周'+W[d.getDay()]+'）');});
  return out.join('\n')+(bad?'\n\n（'+bad+' 行无法识别已跳过）':'')+'\n\n共处理 '+out.length+' 行';});
mk('日期','农历节气查询','公历 ↔ 农历 / 干支 / 节气（首次需联网）',[F.in('d','公历日期','2024-02-10'),F.sel('m','模式',[['s2l','指定日期 → 农历'],['t2l','今天 → 农历']])],async v=>{
  const L=window.Lunar||await loadJS(CDN.lunar).then(()=>window.Lunar);
  if(!L||!L.fromDate)return '❌ 农历组件加载异常，请稍后重试';
  const g=(o,f)=>{try{return typeof o[f]==='function'?o[f]():'';}catch(e){return '';}};
  try{
    let date,label;
    if(v.m==='t2l'){date=new Date();label='今天（'+fmtD(date)+'，周'+W[date.getDay()]+'）';}
    else{const m=/(\d{4})-(\d{1,2})-(\d{1,2})/.exec(v.d||'');
      if(!m)return '❌ 日期格式应为 2024-02-10';
      date=new Date(+m[1],+m[2]-1,+m[3]);label=v.d+'（周'+W[date.getDay()]+'）';}
    const l=L.fromDate(date),fs=(g(l,'getFestivals')||[]).concat(g(l,'getOtherFestivals')||[]);
    return label+'\n农历：'+l.toString()+'\n干支：'+g(l,'getYearInGanZhi')+'年 '+g(l,'getMonthInGanZhi')+'月 '+g(l,'getDayInGanZhi')+'日\n生肖：'+g(l,'getYearShengXiao')+'　星座：'+g(l,'getXingZuo')+'\n节气：'+(g(l,'getJieQi')||'（非节气日）')+'\n节日：'+(fs.join('、')||'（无）');}
  catch(e){return '❌ 查询失败：'+e.message;}});
/* ---------- 开发 ---------- */
mk('开发','YAML转JSON','YAML → JSON（常用子集）',[TA],v=>{
  try{return JSON.stringify(yamlParse(v.s),null,2);}catch(e){return '❌ 解析失败：'+e.message+'\n（支持键值、嵌套、列表、行内 [] {}、引号、注释）';}});
mk('开发','JSON转YAML','JSON → YAML',[TA],v=>{
  try{return yamlDump(JSON.parse(v.s));}catch(e){return '❌ JSON 无效：'+e.message;}});
mk('开发','Cron表达式解析','解析 5 段式 Cron 并预览未来执行时间',[F.in('c','Cron 表达式','*/15 9-18 * * 1-5'),F.num('n','预览次数',5)],v=>{
  let next;try{next=cronNext(v.c,new Date(),Math.max(1,Math.min(20,parseInt(v.n)||5)));}catch(e){return '❌ '+e.message;}
  const f=v.c.trim().split(/\s+/),nm=['分钟','小时','日','月','星期'];
  const desc=x=>{if(x==='*'||x==='?')return '任意';if(x.indexOf('/')>=0){const t=x.split('/');return (t[0]==='*'?'每 ':'从 '+t[0]+' 起每 ')+t[1]+' 个单位';}
    if(x.indexOf(',')>=0)return x.split(',').join('、');if(x.indexOf('-')>0)return x.split('-').join(' 到 ');return x;};
  return '表达式：'+v.c.trim()+'\n\n字段含义：\n'+f.map((x,i)=>'  '+nm[i]+'：'+desc(x)+'（'+x+'）').join('\n')+
    '\n\n未来 '+next.length+' 次执行：\n'+next.map((d,i)=>(i+1)+'. '+fmtT(d)+'（周'+W[d.getDay()]+'）').join('\n')+
    '\n\n※ 按本机时区计算，未考虑夏令时切换';});
mk('开发','SQL格式化','关键字大写 + 换行缩进（轻量实现）',[TA],v=>sqlFmt(v.s)||'❌ 请输入 SQL');
mk('开发','.env与JSON互转','环境变量 ↔ JSON',[F.ta('s','输入内容','DB_HOST=127.0.0.1\nDB_PORT=3306\n# 注释会被忽略\nAPP_NAME="工具箱"'),F.sel('m','方向',[['e2j','.env → JSON'],['j2e','JSON → .env']])],v=>{
  if(v.m==='e2j'){const o={};
    v.s.split('\n').forEach(l=>{l=l.trim();
      if(!l||l.charAt(0)==='#')return;
      const i=l.indexOf('=');
      if(i<0)return;
      const k=l.slice(0,i).trim();let val=l.slice(i+1).trim();
      const q1=val.charAt(0),q2=val.charAt(val.length-1);
      if((q1==='"'&&q2==='"')||(q1==="'"&&q2==="'"))val=val.slice(1,-1);
      o[k]=val;});
    return Object.keys(o).length?JSON.stringify(o,null,2):'❌ 未解析到有效变量';}
  let o;try{o=JSON.parse(v.s);}catch(e){return '❌ JSON 无效：'+e.message;}
  if(o===null||typeof o!=='object'||Array.isArray(o))return '❌ 需要顶层是对象';
  const lines=Object.keys(o).map(k=>{const val=o[k];
    if(val!==null&&typeof val==='object')return k+'='+JSON.stringify(val);
    const s=String(val===null?'':val);
    return k+'='+(/[\s#'"]/.test(s)?'"'+s.replace(/"/g,'\\"')+'"':s);});
  return '# 由 JSON 生成\n'+lines.join('\n');});
TT('User-Agent解析','解析浏览器 / 系统 / 设备信息',s=>{
  const u=s.trim();if(!u)return '❌ 请粘贴 User-Agent 字符串';
  const m=re=>{const r=re.exec(u);return r?r[1]:'';};
  let br='未知',ver='';
  if(/MicroMessenger/i.test(u)){br='微信内置浏览器';ver=m(/MicroMessenger\/([\d.]+)/i);}
  else if(/QQBrowser/i.test(u)){br='QQ浏览器';ver=m(/QQBrowser\/([\d.]+)/i);}
  else if(/EdgA?\//.test(u)){br='Microsoft Edge';ver=m(/EdgA?\/([\d.]+)/);}
  else if(/OPR\/|Opera/.test(u)){br='Opera';ver=m(/OPR\/([\d.]+)/);}
  else if(/Firefox\//.test(u)){br='Firefox';ver=m(/Firefox\/([\d.]+)/);}
  else if(/Chrome\//.test(u)){br='Chrome';ver=m(/Chrome\/([\d.]+)/);}
  else if(/Safari\//.test(u)){br='Safari';ver=m(/Version\/([\d.]+)/);}
  else if(/MSIE|Trident/.test(u)){br='IE';ver=m(/(?:MSIE |rv:)([\d.]+)/);}
  let os='未知';
  if(/Windows NT 10/.test(u))os='Windows 10 / 11';
  else if(/Windows NT 6\.1/.test(u))os='Windows 7';
  else if(/Mac OS X/.test(u))os='macOS '+m(/Mac OS X ([\d_.]+)/).replace(/_/g,'.');
  else if(/Android/.test(u))os='Android '+m(/Android ([\d.]+)/);
  else if(/iPhone|iPad|iPod/.test(u))os='iOS / iPadOS '+m(/OS ([\d_]+)/).replace(/_/g,'.');
  else if(/HarmonyOS/.test(u))os='HarmonyOS';
  else if(/Linux/.test(u))os='Linux';
  return '浏览器：'+br+(ver?' '+ver:'')+'\n操作系统：'+os+'\n设备类型：'+(/iPad|Tablet/.test(u)?'平板':(/Mobi|Android|iPhone/.test(u)?'手机':'桌面电脑'))+
    '\n渲染引擎：'+(/AppleWebKit/.test(u)?(/Gecko\/\d/.test(u)?'WebKit（Blink/兼容）':'WebKit'):(/Gecko\//.test(u)?'Gecko':'未知'))+'\n\n原始 UA：\n'+u;});
mk('开发','JWT生成','用 HS256 密钥签发 JWT',[F.ta('p','Payload（JSON）','{\n  "sub": "1234567890",\n  "name": "工具箱",\n  "admin": true\n}'),F.in('s','密钥 secret','my-secret-key'),F.num('exp','有效期（天，0=不加）',7)],async v=>{
  if(!(window.crypto&&crypto.subtle))return '⚠️ 当前环境不支持 Web Crypto（需 https 页面）';
  if(!v.s)return '❌ 请输入密钥';
  let payload;try{payload=JSON.parse(v.p);}catch(e){return '❌ Payload 不是合法 JSON：'+e.message;}
  const now=Math.floor(Date.now()/1000),days=parseInt(v.exp)||0;
  payload=Object.assign({iat:now},payload);
  if(days>0)payload.exp=now+days*86400;
  const head={alg:'HS256',typ:'JWT'},seg=o=>u8url(utf8b(JSON.stringify(o))),data=seg(head)+'.'+seg(payload);
  try{
    const key=await crypto.subtle.importKey('raw',utf8b(v.s),{name:'HMAC',hash:'SHA-256'},false,['sign']);
    const sig=new Uint8Array(await crypto.subtle.sign('HMAC',key,utf8b(data)));
    return data+'.'+u8url(sig)+'\n\n【Header】\n'+JSON.stringify(head,null,2)+'\n【Payload】\n'+JSON.stringify(payload,null,2);
  }catch(e){return '❌ 签发失败：'+e.message;}});
mkC('开发','文本对比（双栏）','并排高亮显示两段文本差异',host=>{
  host.innerHTML='';
  const a=el('textarea',{cls:'tall',placeholder:'原文本 A'}),b=el('textarea',{cls:'tall',placeholder:'新文本 B'});
  a.value='第一行\n第二行\n第三行';b.value='第一行\n第二行改了\n第三行\n新增行';
  const fa=el('div',{cls:'fld'});fa.append(el('label',{},'文本 A'),a);
  const fb=el('div',{cls:'fld'});fb.append(el('label',{},'文本 B'),b);
  const row=el('div',{cls:'btnrow'}),go=el('button',{cls:'mini pri'},'开始对比'),stat=el('span',{cls:'out'},''),box=el('div');
  row.append(go,stat);host.append(fa,fb,row,box);
  go.onclick=()=>{
    const A=a.value.split('\n'),B2=b.value.split('\n');
    if(A.length*B2.length>400000){box.textContent='文本过大，暂不支持（行数乘积需 < 40 万）';return;}
    const rows=diffRows(A,B2);let h1='',h2='',same=0,del=0,add=0;
    rows.forEach(([t,x,y],i)=>{
      const n=String(i+1).padStart(4,' ')+' ';
      if(t===0){same++;h1+='<div>'+n+escapeHtml(x)+'</div>';h2+='<div>'+n+escapeHtml(y)+'</div>';}
      else if(t<0){del++;h1+='<div class="dl-del">'+n+escapeHtml(x)+'</div>';h2+='<div class="dl-del">'+n+'（无）</div>';}
      else{add++;h1+='<div class="dl-add">'+n+'（新增）</div>';h2+='<div class="dl-add">'+n+escapeHtml(y)+'</div>';}
    });
    stat.textContent='相同 '+same+' 行，删除 '+del+' 行，新增 '+add+' 行';
    box.innerHTML='<div class="diff"><pre>'+h1+'</pre><pre>'+h2+'</pre></div>';
  };
  go.onclick();
});
mk('开发','常用正则速查','22 条收藏级正则，可直接复制',[F.in('k','筛选关键词（可留空）','')],v=>{
  const kw=v.k.trim().toLowerCase(),arr=REGEX_LIB.filter(x=>!kw||(x[0]+x[2]+x[1]).toLowerCase().indexOf(kw)>=0);
  if(!arr.length)return '未找到匹配的正则';
  return '共 '+arr.length+' 条\n\n'+arr.map(x=>'● '+x[0]+'\n  '+x[1]+'\n  说明：'+x[2]).join('\n\n');});
mk('开发','HTTP头字段参考','常用请求/响应头含义速查',[F.in('k','筛选（可留空）','')],v=>{
  const kw=v.k.trim().toLowerCase(),arr=HEADERS.filter(x=>!kw||(x[0]+x[1]).toLowerCase().indexOf(kw)>=0);
  return arr.length?arr.map(x=>x[0].padEnd(32,' ')+x[1]).join('\n'):'未找到匹配的字段';});
mk('开发','自检测试','运行 36 条断言，验证核心算法',[],()=>{
  const R=[],eq=(n,g,w)=>R.push([n,String(g)===String(w),g,w]);
  eq('md5 空串',md5(''),'d41d8cd98f00b204e9800998ecf8427e');
  eq('md5 abc',md5('abc'),'900150983cd24fb0d6963f7d28e17f72');
  eq('md5bytes 与 md5 一致',md5bytes(utf8b('abc')),md5('abc'));
  eq('UTF-8 往返',utf8d(utf8b('你好ab😀')),'你好ab😀');
  eq('中文大写金额',rmb(1234.56),'壹仟贰佰叁拾肆元伍角陆分');
  eq('金额零元整',rmb(0),'零元整');
  eq('金额亿级',rmb(100000001),'壹亿零壹元整');
  eq('数字转罗马',toRoman(1994),'MCMXCIV');
  eq('罗马转数字',fromRoman('MCMXCIV'),'1994');
  eq('Luhn 校验',luhn('4532015112830366').indexOf('✅')===0,true);
  eq('身份证校验',idCheck('11010519491231002X').indexOf('✅')===0,true);
  eq('ISBN-13',isbn('9780306406157'),'✅ ISBN-13 有效');
  eq('小数转分数',frac(0.375),'3/8');
  eq('CSV 解析',JSON.stringify(parseCSV('a,b\n1,"x,y"')),'[["a","b"],["1","x,y"]]');
  eq('凯撒加密',caesar('abc',3),'def');
  eq('摩斯往返',morseD(morseE('SOS')),'SOS');
  eq('Escape 往返',escD(escE('你好a')),'你好a');
  eq('十六进制编码',[...utf8b('中')].map(x=>x.toString(16).padStart(2,'0').toUpperCase()).join(' '),'E4 B8 AD');
  eq('表达式 1',evalExpr('(1+2)^3'),'= 27');
  eq('表达式 2',evalExpr('sqrt(16)+log(100)'),'= 6');
  eq('表达式拦截',evalExpr('alert(1)'),'❌ 不支持的符号：alert');
  eq('HEX→HSL',hex2hsl('#ff0000').join(','),'0,100,50');
  eq('HSL→HEX',hsl2hex(120,100,50),'#00ff00');
  eq('星座查询',zod(3,21),'白羊座');
  eq('ISO 周数',isoWeek(new Date(2024,0,1)),1);
  eq('YAML 解析',JSON.stringify(yamlParse('a: 1\nb:\n  - x\n  - y')),'{"a":1,"b":["x","y"]}');
  eq('YAML 输出',yamlDump({a:1,b:['x']}),'a: 1\nb:\n  - x');
  eq('Cron 非法拦截',(()=>{try{cronFields('abc');return 'no';}catch(e){return 'err';}})(),'err');
  eq('Cron 展开',cronNext('0 9 * * 1-5',new Date(2024,0,1,0,0,0),1)[0].getHours(),9);
  eq('行列式 2×2',det([[1,2],[3,4]]),-2);
  eq('年个税 12 万',applyB(120000,BRACK_Y),9480);
  eq('年终奖 3.6 万',bonusTax(36000),1080);
  eq('双栏对比对齐',JSON.stringify(diffRows(['a','b'],['a','c'])),'[[0,"a","a"],[-1,"b",null],[1,null,"c"]]');
  eq('SQL 首行大写',sqlFmt('select a from b').split('\n')[0],'SELECT a');
  eq('日期格式化',fmtD(new Date(2023,10,15)),'2023-11-15');
  eq('单位换算表',Object.keys(U_LEN).length>5,true);
  const bad=R.filter(x=>!x[1]);
  return '自检结果：'+(R.length-bad.length)+' / '+R.length+' 通过'+(bad.length?'':' 🎉')+'\n\n'+
    R.map(x=>(x[1]?'✅ ':'❌ ')+x[0]+(x[1]?'':'　得到 '+JSON.stringify(x[2])+'，期望 '+JSON.stringify(x[3]))).join('\n');});
/* ---------- 数学 ---------- */
mk('数学','大数运算','BigInt 精确加减乘除与幂',[F.ta('a','数字 A','12345678901234567890'),F.in('b','数字 B','98765432109876543210'),F.sel('op','运算',[['add','A + B'],['sub','A - B'],['mul','A × B'],['div','A ÷ B（商+余数）'],['mod','A mod B'],['pow','A ^ B（B ≤ 2000）'],['gcd','GCD(A, B)']])],v=>{
  let A,B2;try{A=BigInt(v.a.trim());B2=BigInt(v.b.trim());}catch(e){return '❌ 请输入整数（支持超大整数，不支持小数/科学计数法）';}
  const op=v.op;
  if(op==='add')return 'A + B = '+(A+B2);
  if(op==='sub')return 'A - B = '+(A-B2);
  if(op==='mul')return 'A × B = '+(A*B2);
  if(op==='div'){if(B2===0n)return '❌ 除数不能为 0';return 'A ÷ B = '+(A/B2)+'  …… 余 '+(A%B2);}
  if(op==='mod'){if(B2===0n)return '❌ 除数不能为 0';return 'A mod B = '+(A%B2);}
  if(op==='pow'){const e=Number(B2);if(e<0||e>2000)return '❌ 指数需在 0 - 2000 之间';const r=(A**BigInt(e)).toString();
    return 'A ^ B = '+(r.length>200?r.slice(0,80)+'…（共 '+r.length+' 位）':r);}
  let x=A<0n?-A:A,y=B2<0n?-B2:B2;
  while(y){const t=x%y;x=y;y=t;}
  return 'GCD(A, B) = '+x;});
mk('数学','房贷还款对比','等额本息 vs 等额本金',[F.num('p','贷款金额（万元）',100),F.num('r','年利率（%）',4.2),F.num('y','年限',30)],v=>{
  const P=(parseFloat(v.p)||0)*10000,i=(parseFloat(v.r)||0)/100/12,n=(parseFloat(v.y)||0)*12;
  if(!(P>0&&n>0))return '❌ 请输入有效金额与年限';
  const m1=i===0?P/n:P*i*Math.pow(1+i,n)/(Math.pow(1+i,n)-1),t1=m1*n,t2=P+i*P*(n+1)/2;
  return ['【等额本息】','  月供：'+r2(m1)+' 元（每月固定）','  还款总额：'+r2(t1)+' 元','  总利息：'+r2(t1-P)+' 元','',
    '【等额本金】','  首月：'+r2(P/n+P*i)+' 元','  每月递减：'+r2((P/n)*i)+' 元','  末月：'+r2(P/n+(P/n)*i)+' 元','  还款总额：'+r2(t2)+' 元','  总利息：'+r2(t2-P)+' 元','',
    '对比：等额本金少付利息约 '+r2(t1-t2)+' 元，但前期月供更高'].join('\n');});
mk('数学','矩阵行列式','2×2 ~ 8×8 行列式与奇异性',[F.ta('s','矩阵（每行用空格/逗号分隔）','6 1 1\n4 -2 5\n2 8 7')],v=>{
  const rows=v.s.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>l.split(/[\s,;，]+/).filter(Boolean).map(Number));
  if(!rows.length)return '❌ 请输入矩阵';
  if(rows.some(r=>r.some(x=>isNaN(x))))return '❌ 存在无法识别的数字';
  const n=rows.length;
  if(rows.some(r=>r.length!==n))return '❌ 行列式要求方阵（当前 '+n+' 行，各行长度 '+rows.map(r=>r.length).join('/')+'）';
  if(n>8)return '❌ 最多支持 8 阶';
  const d=det(rows);
  return n+' 阶矩阵\n行列式 = '+fmtn(d)+'\n'+(Math.abs(d)<1e-12?'矩阵奇异（不可逆）':'矩阵可逆（|A| ≠ 0）');});
mkC('数学','数据直方图','输入数字 → Canvas 直方图',host=>{
  host.innerHTML='';
  const ta=el('textarea',{cls:'tall'});ta.value='12 15 18 20 22 25 28 30 33 35 38 40 42 45 48 50 55 60 65 70';
  const fld=el('div',{cls:'fld'});fld.append(el('label',{},'数据（空格/逗号/换行分隔）'),ta);
  const bl=el('div',{cls:'fld'}),bn=el('input',{type:'range',min:3,max:30,step:1,value:10});
  bl.append(el('label',{},'分组数量'),bn);
  const cv=el('canvas',{cls:'prev'}),msg=el('p',{cls:'out'},'');
  cv.style.width='100%';host.append(fld,bl,cv,msg);
  const draw=()=>{
    const a=nums(ta.value);
    if(a.length<2){msg.textContent='请输入至少两个数字';return;}
    const k=+bn.value,mn=Math.min.apply(null,a),mx=Math.max.apply(null,a),w=(mx-mn)/k||1;
    const bins=new Array(k).fill(0);
    a.forEach(x=>{let i=Math.floor((x-mn)/w);if(i>=k)i=k-1;if(i<0)i=0;bins[i]++;});
    const W=Math.max(360,cv.clientWidth||620),H=260,pad=40,bw=(W-pad*2)/k,mxC=Math.max.apply(null,bins);
    cv.width=W;cv.height=H;
    const cs=getComputedStyle(document.documentElement),tx=cs.getPropertyValue('--tx')||'#233',sb=cs.getPropertyValue('--sub')||'#888';
    const g=cv.getContext('2d');g.clearRect(0,0,W,H);
    g.strokeStyle='rgba(128,128,128,.4)';g.beginPath();g.moveTo(pad,H-pad);g.lineTo(W-pad,H-pad);g.moveTo(pad,pad-10);g.lineTo(pad,H-pad);g.stroke();
    g.font='12px sans-serif';
    bins.forEach((c,i)=>{const h=(H-pad*2)*(c/mxC||0),x=pad+i*bw+2,y=H-pad-h;
      g.fillStyle='#3b82f6';g.fillRect(x,y,bw-4,h);
      if(c){g.fillStyle=tx;g.fillText(String(c),x+bw/2-6,y-4);}});
    g.fillStyle=sb;g.fillText(fmtn(mn),pad-8,H-16);g.fillText(fmtn(mx),W-pad-34,H-16);
    msg.textContent='数据 '+a.length+' 个｜范围 '+fmtn(mn)+' ~ '+fmtn(mx)+'｜组距 '+fmtn(w)+'｜峰值区间 '+fmtn(mn+(bins.indexOf(mxC)+0.5)*w)+'（'+mxC+' 个）';
    let dr=host.querySelector('.hist-dl');if(!dr){dr=el('div',{cls:'btnrow hist-dl'});cv.after(dr);}
    dr.innerHTML='';const b=el('button',{cls:'mini'},'⬇ 下载图片');b.onclick=()=>cv.toBlob(x=>x&&dl(x,'histogram.png'));dr.appendChild(b);};
  ta.addEventListener('input',draw);bn.addEventListener('input',draw);
  setTimeout(draw,50);
});
/* ---------- 生活 ---------- */
mk('生活','食物热量表','常见食物热量（kcal/100g）',[F.in('k','筛选（如：鸡、蔬菜，可留空）','')],v=>{
  const kw=v.k.trim(),arr=FOOD.filter(x=>!kw||x[0].indexOf(kw)>=0);
  if(!arr.length)return '未找到匹配食物（试试“鸡”“水果”“饭”）';
  return '共 '+arr.length+' 条（每 100g 热量）\n\n'+arr.map(x=>x[0]+'：'+x[1]+' kcal').join('\n')+'\n\n※ 常见参考值，实际随品种与做法变化';});
mk('生活','快递体积重','长宽高 → 体积重与计费重',[F.num('l','长（cm）',40),F.num('w','宽（cm）',30),F.num('h','高（cm）',20),F.num('kg','实际重量（kg）',1.2)],v=>{
  const l=parseFloat(v.l)||0,w=parseFloat(v.w)||0,h=parseFloat(v.h)||0,kg=parseFloat(v.kg)||0;
  const v6=l*w*h/6000,v5=l*w*h/5000,bill=Math.max(kg,v6);
  return '体积：'+fmtn(l*w*h/1e6)+' m³（'+fmtn(l*w*h/1000)+' 升）\n体积重(/6000)：'+r2(v6)+' kg\n体积重(/5000)：'+r2(v5)+' kg\n实际重量：'+fmtn(kg)+' kg\n\n计费重量（按 /6000，取大者并进位 0.5kg）：'+r2(Math.ceil(bill*2)/2)+' kg\n\n※ 各家快递系数不同（常见 6000 或 5000），以实际为准';});
mk('生活','报销合计','多行“项目 金额”自动汇总',[F.ta('s','每行：项目 金额','打车 43.5\n午餐 28\n打印 12.8\n高铁 553')],v=>{
  const rows=v.s.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{
    const m=/(-?\d+(?:\.\d+)?)\s*元?\s*$/.exec(l);
    return m?[l.slice(0,m.index).replace(/[\s:：,，\-]+$/,'')||'未命名',parseFloat(m[1])]:null;}).filter(Boolean);
  if(!rows.length)return '❌ 请按“项目 金额”格式输入，例如：\n打车 43.5';
  const total=rows.reduce((a,b)=>a+b[1],0);
  return '共 '+rows.length+' 笔，合计 '+r2(total)+' 元\n\n明细（金额从高到低）：\n'+
    rows.slice().sort((a,b)=>b[1]-a[1]).map((x,i)=>String(i+1).padStart(2,' ')+'. '+x[0]+'　'+r2(x[1])+' 元').join('\n');});
mk('生活','单价批量对比','多商品单价排序，找出最划算',[F.ta('s','每行：名称, 价格, 数量','A品牌, 19.9, 500\nB品牌, 35, 1000\nC品牌, 9.9, 200')],v=>{
  const rows=v.s.split('\n').map(l=>l.trim()).filter(Boolean).map(l=>{
    const p=l.split(/[,，\t]+/).map(x=>x.trim()),pr=parseFloat(p[1]),q=parseFloat(p[2]);
    return (p.length>=3&&!isNaN(pr)&&!isNaN(q)&&q>0)?{n:p[0],u:pr/q}:null;}).filter(Boolean);
  if(!rows.length)return '❌ 请按“名称, 价格, 数量”格式输入';
  rows.sort((a,b)=>a.u-b.u);
  return rows.map((r,i)=>String(i+1).padStart(2,' ')+'. '+r.n+'　单价 '+fmtn(r.u)+' 元/单位'+(i===0?'　👑 最划算':'　贵 '+(r.u/rows[0].u*100-100).toFixed(1)+'%')).join('\n');});
mk('生活','个税与年终奖','工资个税（年化估算）+ 年终奖单独计税',[F.num('m','税前月薪',20000),F.num('s','五险一金（月）',3000),F.num('a','专项附加扣除（月）',1000),F.num('b','年终奖（0=没有）',36000)],v=>{
  const m=parseFloat(v.m)||0,s=parseFloat(v.s)||0,a=parseFloat(v.a)||0,b=parseFloat(v.b)||0;
  const base=Math.max(0,(m-s-a-5000)*12),tax=applyB(base,BRACK_Y);
  const lines=['【工资薪金个税（年化估算）】','  年应纳税所得额：'+r2(base)+' 元','  全年个税：'+r2(tax)+' 元（月均 '+r2(tax/12)+'）','  税后月收入（已扣五险一金与个税）：'+r2(m-s-tax/12)+' 元'];
  if(b>0){
    const t2=bonusTax(b),rate=b/12<=3000?'3%':b/12<=12000?'10%':b/12<=25000?'20%':b/12<=35000?'25%':b/12<=55000?'30%':b/12<=80000?'35%':'45%';
    lines.push('','【年终奖单独计税】','  年终奖：'+r2(b)+' 元','  税额：'+r2(t2)+' 元（按 '+rate+' 档）','  到手：'+r2(b-t2)+' 元','','  提示：年终奖在档位临界点（36000、144000 等）税额会跳增，发放前建议先测算');
  }
  lines.push('','※ 简化估算（未含其他扣除与汇算差异），最终以年度汇算为准');
  return lines.join('\n');});
/* ================= v2 第 3 段：界面逻辑（v2） ================= */
let LOADER=null,PENDING=null,dispose=null,hist=[];
document.head.appendChild(el('style',{html:CSSV2}));
document.head.appendChild(el('link',{rel:'manifest',href:'manifest.webmanifest'}));
document.head.appendChild(el('meta',{name:'theme-color',content:'#3b82f6'}));
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(function(){});
const LS=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}};
const SS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}};
let FAV=LS('tb_fav',[]),REC=LS('tb_rec',[]);
const slug=n=>encodeURIComponent(n);
/* ---------- 主题 ---------- */
const themeBtn=el('button',{id:'theme'});
function applyTheme(t){
  const real=t==='auto'?(window.matchMedia&&matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):t;
  document.documentElement.dataset.theme=real;
  themeBtn.textContent=t==='auto'?'🌗 跟随系统':(t==='dark'?'🌙 深色':'☀️ 浅色');
}
themeBtn.onclick=()=>{const o=['auto','light','dark'],c=localStorage.getItem('tb_theme')||'auto',n=o[(o.indexOf(c)+1)%o.length];localStorage.setItem('tb_theme',n);applyTheme(n);};
themeBtn.style.marginLeft='10px';
document.querySelector('.sub').appendChild(themeBtn);
applyTheme(localStorage.getItem('tb_theme')||'auto');
if(window.matchMedia){try{matchMedia('(prefers-color-scheme:dark)').addEventListener('change',()=>{if((localStorage.getItem('tb_theme')||'auto')==='auto')applyTheme('auto');});}catch(e){}}
/* ---------- 拖拽导入 ---------- */
const dropLayer=el('div',{cls:'drop'},'📂 松开即可导入文件（图片 / JSON / CSV / MD / YAML）');
document.body.appendChild(dropLayer);
let dragDepth=0;
document.addEventListener('dragenter',e=>{e.preventDefault();dragDepth++;dropLayer.classList.add('on');});
document.addEventListener('dragover',e=>e.preventDefault());
document.addEventListener('dragleave',()=>{if(--dragDepth<=0){dragDepth=0;dropLayer.classList.remove('on');}});
document.addEventListener('drop',e=>{e.preventDefault();dragDepth=0;dropLayer.classList.remove('on');
  const f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];if(f)routeFile(f);});
async function routeFile(f){
  const ext=(f.name.split('.').pop()||'').toLowerCase();
  if(f.type.indexOf('image/')===0){
    if(cur&&cur.accept&&LOADER){LOADER(f);return;}
    PENDING=f;const i=T.findIndex(t=>t.name==='图片压缩转换');if(i>=0)window.openTool(i);return;
  }
  const map={json:'JSON格式化',csv:'CSV转JSON',tsv:'CSV转JSON',md:'Markdown转HTML',html:'HTML转Markdown',htm:'HTML转Markdown',yaml:'YAML转JSON',yml:'YAML转JSON',env:'.env与JSON互转',sql:'SQL格式化',xml:'XML格式化',txt:'字符统计'};
  const name=map[ext]||'字符统计',i=T.findIndex(t=>t.name===name);
  if(i<0)return;
  try{const text=await readFile(f);window.openTool(i);if(T[i].ins&&T[i].ins.length)fillValues({[T[i].ins[0].k]:text});toast('已导入 '+f.name);}
  catch(e){toast('读取失败：'+e.message);}
}
/* ---------- 弹窗新按钮 ---------- */
const rowEl=$('#dlg .row');
const bEx=el('button',{id:'ex'},'示例'),bFav=el('button',{id:'fav'},'☆ 收藏'),bNew=el('button',{id:'newtab'},'↗ 新窗口'),
      bSwap=el('button',{id:'swap'},'输出→输入'),bDl=el('button',{id:'dlbtn'},'下载结果'),bHist=el('select',{id:'hist'});
rowEl.append(bEx,bFav,bNew,bSwap,bDl,bHist);
bHist.title='本工具的历史结果';
/* ---------- 列表渲染 ---------- */
function updFavBtn(){bFav.textContent=(cur&&FAV.indexOf(cur.name)>=0)?'★ 已收藏':'☆ 收藏';}
function toggleFav(n){FAV=FAV.indexOf(n)>=0?FAV.filter(x=>x!==n):FAV.concat([n]);SS('tb_fav',FAV);updFavBtn();buildNav();window.render();}
window.render=function(){
  const kw=$('#q').value.trim().toLowerCase();
  grid.innerHTML='';
  const list=T.map((t,i)=>({t,i})).filter(o=>{const t=o.t;
    if(curCat==='收藏')return FAV.indexOf(t.name)>=0;
    if(curCat==='最近')return REC.indexOf(t.name)>=0;
    if(curCat!=='全部'&&t.cat!==curCat)return false;
    return !kw||(t.name+t.desc+t.cat).toLowerCase().indexOf(kw)>=0;});
  list.forEach(o=>{
    const t=o.t,c=el('button',{cls:'card'});
    const star=el('i',{cls:'star'+(FAV.indexOf(t.name)>=0?' on':'')},FAV.indexOf(t.name)>=0?'★':'☆');
    star.onclick=ev=>{ev.stopPropagation();toggleFav(t.name);};
    c.append(star,el('b',{},t.name),el('span',{},t.desc),el('i',{},t.cat));
    c.onclick=ev=>{if(ev.ctrlKey||ev.metaKey||ev.button===1){window.open(location.pathname+'#t='+slug(t.name));return;}window.openTool(o.i);};
    grid.appendChild(c);
  });
  if(!list.length)grid.appendChild(el('p',{cls:'out'},'没有找到匹配的工具 🤔'));
};
function buildNav(){
  cats.innerHTML='';
  const add=(label,val)=>{const b=el('button',{},label);b.dataset.cat=val;if(val===curCat)b.classList.add('on');
    b.onclick=()=>{curCat=val;buildNav();window.render();};cats.appendChild(b);};
  add('全部 '+T.length,'全部');
  add('⭐ 收藏 '+(FAV.length||''),'收藏');
  add('🕘 最近','最近');
  [...new Set(T.map(t=>t.cat))].forEach(c=>add(c+' '+T.filter(t=>t.cat===c).length,c));
}
$('#q').addEventListener('input',()=>window.render());
/* ---------- 表单 ---------- */
window.renderIns=function(t){
  dform.innerHTML='';
  t.ins.forEach(x=>{
    if(x.t==='chk'){const lb=el('label',{cls:'chk'}),i=el('input',{type:'checkbox',id:'k_'+x.k});i.checked=!!x.v;lb.append(i,document.createTextNode(' '+x.l));dform.appendChild(lb);return;}
    const w=el('div',{cls:'fld'});w.appendChild(el('label',{},x.l||x.k));
    let e;
    if(x.t==='ta')e=el('textarea',{id:'k_'+x.k,rows:x.r||6,placeholder:x.ph||'在此输入内容…'});
    else if(x.t==='sel'){e=el('select',{id:'k_'+x.k});x.o.forEach(o=>e.appendChild(el('option',{value:o[0]},o[1])));}
    else{e=el('input',{id:'k_'+x.k,type:x.t==='num'?'number':'text',placeholder:x.ph||''});if(x.v!==undefined)e.value=x.v;}
    w.appendChild(e);dform.appendChild(w);
  });
};
window.collect=function(){const v={};cur.ins.forEach(x=>{const e=document.getElementById('k_'+x.k);v[x.k]=x.t==='chk'?e.checked:e.value;});return v;};
function fillValues(v){Object.keys(v).forEach(k=>{const e=document.getElementById('k_'+k);if(!e)return;
  if(e.type==='checkbox')e.checked=!!v[k];else e.value=v[k];});}
function exampleFor(t){
  const v={};
  t.ins.forEach(x=>{
    if(x.t==='num')v[x.k]=(x.v!==undefined?x.v:1);
    else if(x.t==='sel')v[x.k]=x.o[0][0];
    else if(x.t==='chk')v[x.k]=x.v;
    else if(x.t==='ta')v[x.k]='示例文本 Example 123\n第二行 hello@example.com\n第三行：2024-01-01';
    else v[x.k]=x.ph||'示例';
  });
  return v;
}
/* ---------- 打开工具 ---------- */
window.openTool=function(i,preset){
  cur=T[i];
  hist=LS('h_'+cur.name,[])||[];
  const isC=!!cur.custom;
  dtitle.textContent=cur.name;
  ddesc.textContent=cur.desc+'　·　'+cur.cat;
  ['ex','run','clr','copy','dlbtn','swap','hist'].forEach(id=>{const b=document.getElementById(id);if(b)b.style.display=isC?'none':'';});
  ['fav','newtab','close'].forEach(id=>{const b=document.getElementById(id);if(b)b.style.display='';});
  dout.textContent='结果将显示在这里…';
  dout.style.display=isC?'none':'';
  if(dispose){try{dispose();}catch(e){}}
  dispose=null;LOADER=null;
  dform.innerHTML='';
  if(isC){try{const r=cur.custom(dform);if(typeof r==='function')dispose=r;}catch(e){dform.appendChild(el('p',{cls:'out'},'❌ '+(e&&e.message?e.message:e)));}}
  else{window.renderIns(cur);if(preset)fillValues(preset);}
  updFavBtn();updHist();
  REC=[cur.name].concat(REC.filter(x=>x!==cur.name)).slice(0,20);SS('tb_rec',REC);
  try{history.replaceState(null,'','#t='+slug(cur.name));}catch(e){location.hash='t='+slug(cur.name);}
  dlg.showModal();
  if(!isC){const f=dform.querySelector('textarea,input,select');if(f)setTimeout(()=>f.focus(),60);}
};
function openByName(n){const i=T.findIndex(t=>t.name===n);if(i>=0)window.openTool(i);}
/* ---------- 运行与结果 ---------- */
window.run=async function(){
  if(!cur||cur.custom)return;
  dout.textContent='计算中…';
  try{
    const r=await cur.fn(window.collect());
    const s=r==null?'(无输出)':String(r);
    dout.textContent=s;
    hist=[s].concat(hist.filter(x=>x!==s)).slice(0,10);
    SS('h_'+cur.name,hist);updHist();
  }catch(e){dout.textContent='❌ 运行出错：'+(e&&e.message?e.message:e);}
};
function updHist(){
  bHist.innerHTML='';
  bHist.appendChild(el('option',{value:''},'历史 ('+hist.length+')'));
  hist.forEach((h,i)=>bHist.appendChild(el('option',{value:String(i)},'#'+(i+1)+' '+(h.split('\n')[0]||'').slice(0,22))));
  bHist.onchange=()=>{if(bHist.value!==''){dout.textContent=hist[+bHist.value];bHist.value='';}};
}
/* ---------- 按钮绑定 ---------- */
$('#run').onclick=()=>window.run();
$('#clr').onclick=()=>{dform.querySelectorAll('textarea,input[type=text],input[type=number]').forEach(e=>e.value='');dout.textContent='结果将显示在这里…';};
$('#close').onclick=()=>dlg.close();
$('#copy').onclick=()=>{
  const t=dout.textContent;
  if(!t||t==='结果将显示在这里…')return;
  const done=()=>toast('已复制到剪贴板 ✓');
  const fb=()=>{const ta=el('textarea',{});ta.value=t;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');done();}catch(e){toast('复制失败，请手动选择');}ta.remove();};
  if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(done,fb);else fb();
};
bEx.onclick=()=>{if(cur&&!cur.custom){fillValues(cur.ex||exampleFor(cur));toast('已填充示例数据');}};
bFav.onclick=()=>{if(cur)toggleFav(cur.name);};
bNew.onclick=()=>{if(cur)window.open(location.pathname+'#t='+slug(cur.name));};
bSwap.onclick=()=>{
  const t=dout.textContent;
  if(!t||t==='结果将显示在这里…')return toast('还没有结果');
  const f=dform.querySelector('textarea,input[type=text]');
  if(!f)return toast('这个工具没有文本输入框');
  f.value=t;toast('已把结果填入第一个输入框');
};
bDl.onclick=()=>{
  const t=dout.textContent;
  if(!t||t==='结果将显示在这里…')return toast('没有可下载的内容');
  const ext=/^\s*[\[{]/.test(t)?'json':'txt';
  dlText(t,cur.name+'.'+ext);toast('已下载 '+cur.name+'.'+ext);
};
dform.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')window.run();});
dlg.addEventListener('close',()=>{if(dispose){try{dispose();}catch(e){}}dispose=null;LOADER=null;});
/* ---------- 快捷键与路由 ---------- */
document.addEventListener('keydown',e=>{
  const tag=(document.activeElement&&document.activeElement.tagName)||'';
  if((e.key==='/'||((e.ctrlKey||e.metaKey)&&e.key==='k'))&&tag!=='INPUT'&&tag!=='TEXTAREA'&&!dlg.open){e.preventDefault();$('#q').focus();}
});
window.addEventListener('hashchange',()=>{
  const m=/[#&]t=([^&]+)/.exec(location.hash);
  if(m){const n=decodeURIComponent(m[1]);if(!cur||cur.name!==n)openByName(n);}
});
/* ---------- 启动 ---------- */
$('#cnt').textContent=T.length;
buildNav();window.render();
(function(){const m=/[#&]t=([^&]+)/.exec(location.hash);if(m)openByName(decodeURIComponent(m[1]));})();
document.querySelector('footer').textContent='单文件工具箱 · 共 '+T.length+' 个工具 · 纯前端 · 支持离线（PWA）· © '+new Date().getFullYear();
console.info('工具箱加载完成：'+T.length+' 个工具');