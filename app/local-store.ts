import {useCallback,useEffect,useState} from 'react';
import type {Concept,SystemId,View} from './anatomy';
/** Everything the viewer remembers on this device. Stored in localStorage; nothing leaves the device. */
export interface LocalData {
 version:1;
 favorites:Concept[];
 notes:Record<string,{name:string;elements?:string[];text:string;updated:string}>;
 recent:Concept[];
 view?:{visible:SystemId[];view:View;explode:number};
}
const KEY='anatomy3d:data';
const empty=():LocalData=>({version:1,favorites:[],notes:{},recent:[]});
function read():LocalData{
 try{const raw=localStorage.getItem(KEY);if(!raw)return empty();const d=JSON.parse(raw);return {...empty(),...d,version:1};}catch{return empty();}
}
function write(d:LocalData){try{localStorage.setItem(KEY,JSON.stringify(d));}catch{/* storage full or blocked: keep working in memory */}}
const slim=(c:Concept):Concept=>({id:c.id,name:c.name,elements:c.elements});
export function useLocalData(){
 const [data,setData]=useState<LocalData>(read);
 useEffect(()=>{const sync=(e:StorageEvent)=>{if(e.key===KEY)setData(read());};addEventListener('storage',sync);return()=>removeEventListener('storage',sync);},[]);
 const update=useCallback((fn:(d:LocalData)=>LocalData)=>setData(d=>{const next=fn(d);write(next);return next;}),[]);
 return {
  data,
  isFavorite:(id:string)=>data.favorites.some(f=>f.id===id),
  toggleFavorite:(c:Concept)=>update(d=>({...d,favorites:d.favorites.some(f=>f.id===c.id)?d.favorites.filter(f=>f.id!==c.id):[slim(c),...d.favorites]})),
  setNote:(c:Concept,text:string)=>update(d=>{const notes={...d.notes};if(text.trim())notes[c.id]={name:c.name,elements:c.elements,text,updated:new Date().toISOString()};else delete notes[c.id];return {...d,notes};}),
  addRecent:(c:Concept)=>update(d=>({...d,recent:[slim(c),...d.recent.filter(r=>r.id!==c.id)].slice(0,12)})),
  saveView:(view:NonNullable<LocalData['view']>)=>update(d=>JSON.stringify(d.view)===JSON.stringify(view)?d:{...d,view}),
  replaceAll:(next:LocalData)=>update(()=>({...empty(),...next,version:1})),
  clear:()=>update(()=>empty()),
 };
}
/** Validate an imported backup file before it replaces local data. */
export function parseBackup(text:string):LocalData{
 const d=JSON.parse(text);
 if(!d||typeof d!=='object'||!Array.isArray(d.favorites)||typeof d.notes!=='object')throw new Error('الملف ليس نسخة احتياطية صالحة من الأطلس.');
 return {...empty(),...d,version:1};
}
