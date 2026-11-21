import {createRoot} from 'react-dom/client';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-600.css';
import Home from '../app/page';
import '../app/globals.css';
createRoot(document.getElementById('root')!).render(<Home/>);
if('serviceWorker' in navigator&&import.meta.env.PROD){
 addEventListener('load',()=>{navigator.serviceWorker.register('./sw.js').catch(()=>{});});
}
