import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/postcss';
import {offlinePlugin} from './pwa/vite-plugin-pwa';
const path=(relative:string)=>fileURLToPath(new URL(relative,import.meta.url));
// base './' keeps every URL relative, so the build works at any GitHub Pages path (user.github.io/<repo>/).
export default defineConfig({base:'./',root:path('./web'),publicDir:path('./public'),plugins:[react(),offlinePlugin(path('./pwa/sw-template.js'))],resolve:{alias:{'@':path('./')}},css:{postcss:{plugins:[tailwindcss()]}},server:{watch:{usePolling:true}},build:{outDir:path('./dist'),emptyOutDir:true,chunkSizeWarningLimit:1200}});
