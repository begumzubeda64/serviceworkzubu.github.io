const cacheName = 'v1';

const cacheAssets = [
    '',
   './main.js',
   './main2.js',
   './js/bootstrap.min.js',
   './js/jquery.js',
   './js/popper.js',
   './bootstrap.min.css',
   './home.html'
];
//Call Install event
self.addEventListener('install', e => {
    console.log("Service worker: Installed");

    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files')
                cache.addAll(cacheAssets)
                .then(() => console.log('Assets added to cache'))
                .catch(err => console.log('Error while fetching assets', err));
            })
            .then(() => self.skipWaiting())
    );
});

//Call Activate Event
self.addEventListener('activate', e => {
    console.log("Service worker: Activated");
    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service worker: Fetching');
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request)));
});