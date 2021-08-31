const CACHE_ELEMENTOS = [
    './',
    'https://unpkg.com/react@17/umd/react.production.min.js',
    'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    'https://unpkg.com/@babel/standalone/babel.min.js',
    './style.css',
    './components/Contador.js'
]

const CACHE_NAME = 'v3_cache_contador_react'

self.addEventListener('install', (e)=>{
  e.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
          cache.addAll(CACHE_ELEMENTOS).then(()=>{
              self.skipWaiting()
          }).catch(console.log)
      })
  )
})

const cacheWhitelist = [CACHE_NAME]

self.addEventListener('activate', (e)=>{
    e.waitUntil(
        caches.keys().then(cachesNames =>{
            return Promise.all(cachesNames.map(cacheName =>{
                 return cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
            }))
        }).then(()=> self.clients.claim())
    )
  })


  self.addEventListener('fetch', (e)=>{
    e.respondWith(
        caches.match(e.request).then((res) => {
            if(res){
                return res
            }
            return fetch(e.request)
        })
    )
  })