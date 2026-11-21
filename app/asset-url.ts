/** Resolve a root-relative public path ("/models/x") against the deploy base, so the site works under a GitHub Pages sub-path. */
export const assetUrl=(path:string)=>import.meta.env.BASE_URL+path.replace(/^\//,'');
