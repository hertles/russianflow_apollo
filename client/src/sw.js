if ('undefined' === typeof window) {
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
    )
}
importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js');
importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js');

// Init indexedDB using idb-keyval, https://github.com/jakearchibald/idb-keyval
const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}

// Workbox with custom handler to use IndexedDB for cache.
workbox.routing.registerRoute(
    new RegExp('localhost:5000/graphql(/)?'),
    // Uncomment below to see the error thrown from Cache Storage API.
    //workbox.strategies.staleWhileRevalidate(),
    async ({
               event
           }) => {
        return staleWhileRevalidate(event);
    },
    'POST'
);

/*
// When installing SW.
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
*/

// Return cached response when possible, and fetch new results from server in
// the background and update the cache.
self.addEventListener('fetch', async (event) => {
    if (event.request.method === 'POST') {
        event.respondWith(staleWhileRevalidate(event));
    }

    // TODO: Handles other types of requests.
});

async function staleWhileRevalidate(event) {
    let promise = null;
    let cachedResponse = await getCache(event.request.clone());
    let fetchPromise = fetch(event.request.clone())
        .then((response) => {
            setCache(event.request.clone(), response.clone());
            return response;
        })
        .catch((err) => {
            console.error(err);
        });
    return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise;
}

async function serializeResponse(response) {
    let serializedHeaders = {};
    for (var entry of response.headers.entries()) {
        serializedHeaders[entry[0]] = entry[1];
    }
    let serialized = {
        headers: serializedHeaders,
        status: response.status,
        statusText: response.statusText
    };
    serialized.body = await response.json();
    return serialized;
}

async function setCache(request, response) {
    var key, data;
    let body = await request.json();
    let id = CryptoJS.MD5(body.query).toString();

    var entry = {
        query: body.query,
        response: await serializeResponse(response),
        timestamp: Date.now()
    };
    idbKeyval.set(id, entry, store);
}

async function getCache(request) {
    let data;
    try {
        let body = await request.json();
        let id = CryptoJS.MD5(body.query).toString();
        data = await idbKeyval.get(id, store);
        if (!data) return null;

        // Check cache max age.
        let cacheControl = request.headers.get('Cache-Control');
        let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
        if (Date.now() - data.timestamp > maxAge * 1000) {
            console.log(`Cache expired. Load from API endpoint.`);
            return null;
        }

        console.log(`Load response from cache.`);
        return new Response(JSON.stringify(data.response.body), data.response);
    } catch (err) {
        return null;
    }
}

async function getPostKey(request) {
    let body = await request.json();
    return JSON.stringify(body);
}
/*import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies'
import {ExpirationPlugin} from 'workbox-expiration'
import {registerRoute} from 'workbox-routing'
import {precacheAndRoute} from "workbox-precaching"
import {pageCache} from 'workbox-recipes'*/

/*pageCache()
// eslint-disable-next-line no-restricted-globals
precacheAndRoute([{"revision":"edb4e1dccc632d5bc4fc5c12e9fce2e6","url":"build/index.html"},{"revision":"740bd77eecc9a8a1e71dd23ebb80d935","url":"build/static/css/main.883a8f4d.css"},{"revision":"5b7be6e48b6bc3fc35bcf8650c19c695","url":"build/static/js/787.ce0f7742.chunk.js"},{"revision":"3b6a07d8652600d3c1de0a4f31a8a688","url":"public/index.html"},{"revision":"0d7edd0caac0f9de8973e6a12d1fd181","url":"public/sw.js"},{"revision":"9ebb57a0df0f3853ebbaa4539e6a0990","url":"rollup.config.js"},{"revision":"271d20c0a1ad9de829b16068f296823a","url":"src/App.css"},{"revision":"802da149e64e147769b790518d3f0fc7","url":"src/App.js"},{"revision":"d18ac434afb00158b91831ac1e36c491","url":"src/App.test.js"},{"revision":"02f8f8940e64dc717505830a104a4be1","url":"src/components/common/Point/Point.module.css"},{"revision":"98bebdac1ccb11186dbe7088105b7bb2","url":"src/components/Main/Main.module.css"},{"revision":"9b8a9fd7d6123272d1ce20dffef87bbd","url":"src/graphql/getAllPoints.graphql"},{"revision":"0e4a1618d9e11c2a06c554eb4bda413a","url":"src/graphql/getAllRoutes.graphql"},{"revision":"13375b5814a4707634ee381f1bb08969","url":"src/graphql/getPoint.graphql"},{"revision":"6c2104b8d219ed99234ae2d6329f4357","url":"src/index.css"},{"revision":"d8142e273a3e94faa3c44e269ec298e4","url":"src/index.js"},{"revision":"240e2381f826a9bb84d178b29b7b9abe","url":"src/reportWebVitals.js"},{"revision":"1a77571e1a8cf36018a41bcedf60db75","url":"src/setupTests.js"},{"revision":"dbda9045261170d2d62959cf66df4fb1","url":"src/styles/Map.css"},{"revision":"4c7ba2fb51483087cc90e56947776f2a","url":"sw-build.js"},{"revision":"a40706f447084668a33012fd68c0feac","url":"webpack-config.js"},{"revision":"ad5fb3c43686f04e58a74a974294f63d","url":"workbox-config.js"}])
registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
            })
        ]
    })
)
registerRoute(({request}) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new StaleWhileRevalidate({
        // помещаем файлы в кеш с названием 'assets'
        cacheName: 'assets',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [200]
            })
        ]
    })
)*/

workbox.recipes.pageCache()
// eslint-disable-next-line no-restricted-globals
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
workbox.routing.registerRoute(
    /http:\/\/localhost:5000\/src\/images\/*\/*\/*/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'images'
    })
)
workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            /*            new workbox.cacheableResponse.Plugin({
                            statuses: [0, 200]
                        }),*/
            /*new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 дней
            })*/
        ]
    })
)

workbox.routing.registerRoute(({request}) =>
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'worker',
    new workbox.strategies.StaleWhileRevalidate({
        // помещаем файлы в кеш с названием 'assets'
        cacheName: 'assets',
        /*plugins: [
            new workbox.expiration.Plugin({
                statuses: [200]
            })
        ]*/
    })
)
