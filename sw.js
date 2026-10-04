const ROOT=new URL('./',self.location.href);
const PREFIX=ROOT.pathname==='/'?'moxing-':'moxing-'+encodeURIComponent(ROOT.pathname)+'-';
const CACHE=PREFIX+'bb9847e0bbcd';
const FILES=["assets/hero-v2.webp","assets/index-BBhI0e7w.css","assets/index-BTanj8cM.js","assets/v02/enemy-atlas-0.webp","assets/v02/enemy-atlas-1.webp","assets/v02/enemy-clips.json","assets/v02/hero-atlas-0.webp","assets/v02/hero-atlas-1.webp","assets/v02/hero-clips.json","assets/v03/hero-slash2-v3.webp","assets/v07/bamboo-ink-v7.webp","assets/v07/bridge-ink-v7.webp","assets/v07/gorge-ink-v7.webp","assets/v07/marsh-ink-v7.webp","assets/v07/snow-ink-v7.webp","assets/v07/temple-ink-v7.webp","icon.svg","index.html","manifest.webmanifest"].map(file=>new URL(file,ROOT).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(async cache=>{
  for(const file of FILES)await cache.add(file);
})));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(
  keys.filter(key=>key.startsWith(PREFIX)&&key!==CACHE).map(key=>caches.delete(key))
)).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==ROOT.origin||!url.pathname.startsWith(ROOT.pathname))return;
  event.respondWith(caches.open(CACHE).then(async cache=>{
    const cached=await cache.match(event.request,{ignoreVary:true});if(cached)return cached;
    try{return await fetch(event.request)}catch(error){
      if(event.request.mode==='navigate')return await cache.match(new URL('index.html',ROOT).href);
      throw error;
    }
  }));
});