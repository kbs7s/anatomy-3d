import {useRef,useState} from 'react';
import {CheckCircle2,Download,FileDown,FileUp,HardDrive,Star,StickyNote,Trash2,History} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Sheet,SheetContent,SheetTitle,SheetDescription} from '@/components/ui/sheet';
import type {Concept} from './anatomy';
import {arabicName} from './i18n-ar';
import {parseBackup,type useLocalData} from './local-store';
import {formatMB,type useOfflineCache} from './offline-cache';
const label=(c:{name:string})=>arabicName(c.name)||c.name;
type Local=ReturnType<typeof useLocalData>;type Offline=ReturnType<typeof useOfflineCache>;
export default function LibraryPanel({open,onOpenChange,local,offline,onChoose}:{open:boolean;onOpenChange:(o:boolean)=>void;local:Local;offline:Offline;onChoose:(c:Concept)=>void}){
 const file=useRef<HTMLInputElement>(null),[message,setMessage]=useState(''),[confirmClear,setConfirmClear]=useState(false);
 const {data}=local,notes=Object.entries(data.notes).sort((a,b)=>b[1].updated.localeCompare(a[1].updated));
 const pct=Math.round(offline.cached/Math.max(offline.total,1)*100);
 const exportData=()=>{const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`anatomy-3d-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);setMessage('تم تنزيل ملف النسخة الاحتياطية.');};
 const importData=async(f:File)=>{try{local.replaceAll(parseBackup(await f.text()));setMessage('تم استيراد بياناتك.');}catch(e){setMessage(e instanceof Error&&/[؀-ۿ]/.test(e.message)?e.message:'تعذّر قراءة الملف.');}};
 const go=(c:Concept)=>{onOpenChange(false);onChoose(c);};
 return <Sheet open={open} onOpenChange={o=>{onOpenChange(o);if(!o){setConfirmClear(false);setMessage('');}}}><SheetContent className="about-sheet library-sheet glass">
  <div className="eyebrow">محفوظة على هذا الجهاز فقط</div><SheetTitle className="structure-title">محفوظاتي</SheetTitle><SheetDescription>بياناتك ونماذج التشريح مخزّنة في متصفحك، وتعمل بدون إنترنت.</SheetDescription>
  <section className="library-block"><h3><HardDrive size={15}/>العمل بدون إنترنت</h3>
   {offline.state==='unsupported'?<p>هذا المتصفح لا يدعم التخزين للعمل بدون إنترنت. جرّب Chrome أو Edge أو Safari حديثاً.</p>:<>
    <p>{offline.state==='ready'?<span className="ok"><CheckCircle2 size={14}/> كل الملفات محفوظة ({offline.total} ملفاً). الموقع يعمل بدون اتصال.</span>:`محفوظ ${offline.cached} من ${offline.total} ملفاً (${pct}٪).`}</p>
    <div className="loading-track"><i style={{width:`${pct}%`}}/></div>
    {offline.state!=='ready'&&<Button className="primary-action" disabled={offline.state==='downloading'||!navigator.onLine} onClick={offline.download}><Download size={17}/>{offline.state==='downloading'?'جارٍ التنزيل…':'تنزيل كل الملفات الآن'}</Button>}
    {offline.usage&&<p className="small-note">المساحة المستخدمة: {formatMB(offline.usage.used)}{offline.persisted?' · التخزين محمي من الحذف التلقائي':''}</p>}
    <p className="small-note">لاستخدامه كتطبيق على جهازك: من قائمة المتصفح اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية». يفتح بعدها مثل أي تطبيق، حتى بدون إنترنت.</p>
   </>}
  </section>
  <section className="library-block"><h3><Star size={15}/>المفضلة <small>{data.favorites.length}</small></h3>
   {data.favorites.length?data.favorites.map(c=><div className="library-row" key={c.id}><button type="button" onClick={()=>go(c)}>{label(c)}</button><Button variant="ghost" className="icon-button" aria-label={`إزالة ${label(c)} من المفضلة`} onClick={()=>local.toggleFavorite(c)}><Trash2 size={14}/></Button></div>):<p className="small-note">اضغط على النجمة في بطاقة أي جزء لإضافته هنا.</p>}
  </section>
  <section className="library-block"><h3><StickyNote size={15}/>ملاحظاتي <small>{notes.length}</small></h3>
   {notes.length?notes.map(([id,nt])=><button type="button" className="library-note" key={id} onClick={()=>go({id,name:nt.name,elements:nt.elements??[]})}><strong>{label(nt)}</strong><span>{nt.text}</span></button>):<p className="small-note">اكتب ملاحظة في بطاقة أي جزء، وتُحفظ تلقائياً.</p>}
  </section>
  {data.recent.length>0&&<section className="library-block"><h3><History size={15}/>آخر ما شاهدته</h3><div className="library-chips">{data.recent.map(c=><button type="button" key={c.id} onClick={()=>go(c)}>{label(c)}</button>)}</div></section>}
  <section className="library-block"><h3><FileDown size={15}/>نسخة احتياطية</h3>
   <p className="small-note">انقل المفضلة والملاحظات إلى جهاز آخر عبر ملف.</p>
   <div className="library-actions"><Button variant="ghost" onClick={exportData}><FileDown size={15}/>تصدير</Button><Button variant="ghost" onClick={()=>file.current?.click()}><FileUp size={15}/>استيراد</Button>
    <Button variant="ghost" className={confirmClear?'danger':''} onClick={()=>{if(confirmClear){local.clear();setConfirmClear(false);setMessage('تم مسح بياناتك من هذا الجهاز.');}else setConfirmClear(true);}}><Trash2 size={15}/>{confirmClear?'اضغط مرة أخرى للتأكيد':'مسح البيانات'}</Button></div>
   <input ref={file} type="file" accept="application/json,.json" hidden onChange={e=>{const f=e.target.files?.[0];if(f)importData(f);e.target.value='';}}/>
   {message&&<p className="small-note" role="status">{message}</p>}
  </section>
 </SheetContent></Sheet>;
}
