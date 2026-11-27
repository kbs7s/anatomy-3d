import {useCallback,useEffect,useRef,useState} from 'react';
import type {Atlas} from './anatomy';
import {assetUrl} from './asset-url';
export type OfflineState='unsupported'|'checking'|'missing'|'downloading'|'ready';
/** Tracks whether the catalogue and every geometry chunk are in the service worker's cache, and can fill the gaps. */
export function useOfflineCache(atlas:Atlas|null){
 const [state,setState]=useState<OfflineState>('checking'),[cached,setCached]=useState(0),[usage,setUsage]=useState<{used:number;quota:number}|null>(null),[persisted,setPersisted]=useState(false);
 const busy=useRef(false);
 const urls=useCallback(()=>atlas?[assetUrl('/models/atlas.json'),...atlas.chunks.map(c=>assetUrl(c.gzip??c.url))].map(u=>new URL(u,location.href).href):[],[atlas]);
 const total=atlas?atlas.chunks.length+1:0;
 const measure=useCallback(async()=>{
  try{const e=await navigator.storage?.estimate?.();if(e)setUsage({used:e.usage??0,quota:e.quota??0});setPersisted(!!(await navigator.storage?.persisted?.()));}catch{}
 },[]);
 const check=useCallback(async()=>{
  if(!('serviceWorker' in navigator)||!('caches' in window)){setState('unsupported');return [] as string[];}
  const list=urls();const hits=await Promise.all(list.map(u=>caches.match(u)));
  const missing=list.filter((_,i)=>!hits[i]);setCached(list.length-missing.length);
  if(!busy.current)setState(missing.length===0&&!!navigator.serviceWorker.controller?'ready':'missing');
  measure();return missing;
 },[urls,measure]);
 const download=useCallback(async()=>{
  if(busy.current||!atlas)return;busy.current=true;setState('downloading');
  try{
   await navigator.serviceWorker.ready;
   if(!navigator.serviceWorker.controller)await new Promise<void>(r=>{navigator.serviceWorker.addEventListener('controllerchange',()=>r(),{once:true});setTimeout(r,4000);});
   const missing=await check();
   for(const u of missing){try{const r=await fetch(u,{cache:'reload'});await r.arrayBuffer();}catch{}await check();}
   try{if(navigator.storage?.persist)setPersisted(await navigator.storage.persist());}catch{}
  }finally{busy.current=false;await check();}
 },[atlas,check]);
 useEffect(()=>{if(!atlas)return;let stop=false,timer=0;const loop=async()=>{const missing=await check();if(!stop&&missing.length)timer=window.setTimeout(loop,2000);};loop();return()=>{stop=true;clearTimeout(timer);};},[atlas,check]);
 return {state,cached,total,usage,persisted,download,refresh:check};
}
export const formatMB=(bytes:number)=>`${(bytes/1048576).toLocaleString('ar',{maximumFractionDigits:1})} ميغابايت`;
