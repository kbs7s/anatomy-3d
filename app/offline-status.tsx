import {CloudOff,CheckCircle2,Download} from 'lucide-react';
import {useEffect,useState} from 'react';
import type {OfflineState} from './offline-cache';
/** Small badge under the title: saved on this device, saving, or offline. Tapping it opens the library panel. */
export default function OfflineStatus({state,cached,total,onOpen}:{state:OfflineState;cached:number;total:number;onOpen:()=>void}){
 const [online,setOnline]=useState(typeof navigator==='undefined'?true:navigator.onLine);
 useEffect(()=>{const up=()=>setOnline(true),down=()=>setOnline(false);addEventListener('online',up);addEventListener('offline',down);return()=>{removeEventListener('online',up);removeEventListener('offline',down);};},[]);
 if(state==='unsupported'||state==='checking')return null;
 const ready=state==='ready';
 const text=!online?'وضع عدم الاتصال':ready?'محفوظ على الجهاز · يعمل بدون إنترنت':`جارٍ الحفظ للعمل بدون إنترنت ${Math.round(cached/Math.max(total,1)*100)}٪`;
 return <button type="button" className={`offline-status ${ready?'ready':'saving'}`} onClick={onOpen} aria-label={`${text}. فتح محفوظاتي`}>{!online?<CloudOff size={13}/>:ready?<CheckCircle2 size={13}/>:<Download size={13}/>}<span>{text}</span></button>;
}
