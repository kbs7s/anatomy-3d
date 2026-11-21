import {useEffect,useState} from 'react';
import {CloudOff,CheckCircle2,Download} from 'lucide-react';
import type {Atlas} from './anatomy';
import {assetUrl} from './asset-url';
type Status='checking'|'saving'|'ready'|'unsupported';
/** Shows whether every model chunk is stored on this device, so the site opens without a connection. */
export default function OfflineStatus({atlas,ready}:{atlas:Atlas|null;ready:boolean}){
 const [status,setStatus]=useState<Status>('checking'),[online,setOnline]=useState(typeof navigator==='undefined'?true:navigator.onLine);
 useEffect(()=>{const up=()=>setOnline(true),down=()=>setOnline(false);addEventListener('online',up);addEventListener('offline',down);return()=>{removeEventListener('online',up);removeEventListener('offline',down);};},[]);
 useEffect(()=>{
  if(!('serviceWorker' in navigator)||!('caches' in window)){setStatus('unsupported');return;}
  if(!atlas||!ready)return;
  let stop=false,timer=0;
  const check=async()=>{
   const urls=[assetUrl('/models/atlas.json'),...atlas.chunks.map(c=>assetUrl(c.gzip??c.url))];
   const hits=await Promise.all(urls.map(u=>caches.match(new URL(u,location.href).href)));
   if(stop)return;
   const controlled=!!navigator.serviceWorker.controller,done=hits.every(Boolean)&&controlled;
   setStatus(done?'ready':'saving');
   if(done){navigator.storage?.persist?.().catch(()=>{});return;}
   // On the first visit the viewer can finish downloading before the service worker takes control;
   // fetch the missing files again through the worker so they land in the offline cache.
   if(controlled)await Promise.all(urls.filter((_,i)=>!hits[i]).map(u=>fetch(u).then(r=>r.arrayBuffer()).catch(()=>{})));
   if(!stop)timer=window.setTimeout(check,1500);
  };
  check();return()=>{stop=true;clearTimeout(timer);};
 },[atlas,ready]);
 if(status==='unsupported')return null;
 const text=!online?'وضع عدم الاتصال':status==='ready'?'محفوظ على الجهاز · يعمل بدون إنترنت':status==='saving'?'جارٍ الحفظ للاستخدام بدون إنترنت…':'';
 if(!text)return null;
 return <div className={`offline-status ${status}`} role="status">{!online?<CloudOff size={13}/>:status==='ready'?<CheckCircle2 size={13}/>:<Download size={13}/>}<span>{text}</span></div>;
}
