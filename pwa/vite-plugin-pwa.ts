import {createHash} from 'node:crypto';
import {readFileSync,readdirSync,statSync,writeFileSync} from 'node:fs';
import {join,relative} from 'node:path';
import type {Plugin} from 'vite';
/** Writes dist/sw.js with a precache list of the built app shell and a version keyed to the model catalogue. */
export function offlinePlugin(templatePath:string):Plugin{
 let outDir='';
 return {name:'anatomy-offline',apply:'build',configResolved(c){outDir=c.build.outDir;},closeBundle(){
  const walk=(dir:string):string[]=>readdirSync(dir).flatMap(f=>{const p=join(dir,f);return statSync(p).isDirectory()?walk(p):[p];});
  const files=walk(outDir).map(p=>relative(outDir,p).split('\\').join('/'));
  const shell=['./',...files.filter(f=>!f.startsWith('models/')&&f!=='sw.js'&&!f.endsWith('.md')&&!f.endsWith('.woff'))];
  const hash=(list:string[])=>{const h=createHash('sha256');for(const f of list)h.update(f).update(readFileSync(join(outDir,f==='./'?'index.html':f)));return h.digest('hex').slice(0,12);};
  const sw=readFileSync(templatePath,'utf8').replace('__SHELL_VERSION__',hash(shell)).replace('__MODEL_VERSION__',hash(['models/atlas.json'])).replace('__PRECACHE__',JSON.stringify(shell));
  writeFileSync(join(outDir,'sw.js'),sw);
 }};
}
