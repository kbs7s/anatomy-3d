/* Anatomy 3D service worker. Generated at build time from pwa/sw-template.js. */
const SHELL_CACHE='shell-__SHELL_VERSION__';
const MODEL_CACHE='models-__MODEL_VERSION__';
const SHELL=__PRECACHE__;
const scope=self.registration.scope;
const abs=p=>new URL(p,scope).href;

self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const shell=await caches.open(SHELL_CACHE);
  await shell.addAll(SHELL.map(abs));
  // The catalogue is small; geometry chunks are stored as the viewer downloads them.
  const models=await caches.open(MODEL_CACHE);
  if(!(await models.match(abs('models/atlas.json'))))await models.add(abs('models/atlas.json'));
  await self.skipWaiting();
 })());
});

self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key!==SHELL_CACHE&&key!==MODEL_CACHE)await caches.delete(key);
  await self.clients.claim();
 })());
});

async function cacheFirst(request,cacheName){
 const cache=await caches.open(cacheName);
 const hit=await cache.match(request,{ignoreSearch:true});
 if(hit)return hit;
 const response=await fetch(request);
 if(response.ok&&response.status===200)cache.put(request,response.clone());
 return response;
}

async function networkFirstPage(request){
 const cache=await caches.open(SHELL_CACHE);
 try{
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),4000);
  const response=await fetch(request,{signal:controller.signal});clearTimeout(timer);
  if(response.ok)cache.put(abs('./'),response.clone());
  return response;
 }catch{
  return (await cache.match(abs('./')))||(await cache.match(abs('index.html')))||Response.error();
 }
}

self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET')return;
 const url=new URL(request.url);
 if(url.origin!==location.origin||!url.href.startsWith(scope))return;
 if(request.mode==='navigate'){event.respondWith(networkFirstPage(request));return;}
 const path=url.href.slice(scope.length);
 if(path.startsWith('models/')){event.respondWith(cacheFirst(request,MODEL_CACHE));return;}
 event.respondWith(cacheFirst(request,SHELL_CACHE));
});

