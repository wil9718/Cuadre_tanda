var C='cuadre-v1',A=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(A)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.open(C).then(function(c){return c.match(e.request,{ignoreSearch:true}).then(function(r){
    var f=fetch(e.request).then(function(n){if(n&&(n.ok||n.type==='opaque'))c.put(e.request,n.clone());return n}).catch(function(){return r});
    return r||f})}));
});
