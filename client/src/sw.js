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



self.addEventListener('fetch', async (event) => {
    if (event.request.method === 'POST') {
        event.respondWith(staleWhileRevalidate(event));
    }
});
    workbox.routing.registerRoute(
        new RegExp('localhost:5000/graphql(/)?'),
        async ({event}) => {
            return staleWhileRevalidate(event);
        },
        'POST'
    );
    async function staleWhileRevalidate(event) {
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
    async function getCache(request) {
        let data;
        try {
            let body = await request.json();
            let id = CryptoJS.MD5(body.query).toString();
            data = await idbKeyval.get(id, store);
            if (!data) return null;

            let cacheControl = request.headers.get('Cache-Control');
            let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600;
            if (Date.now() - data.timestamp > maxAge * 1000) {
                console.log(`Срок годности кэша истёк. Запрос к API за свежими данными.`);
                return null;
            }

            console.log(`Загрузка ответа из кэша.`);
            return new Response(JSON.stringify(data.response.body), data.response);
        } catch (err) {
            return null;
        }
    }

async function getPostKey(request) {
    let body = await request.json();
    return JSON.stringify(body);
}

workbox.recipes.pageCache()
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
workbox.routing.registerRoute(
    /http:\/\/localhost:5000\/src\/images\/maps\/*\/*\/*/,
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
        cacheName: 'assets',
        /*plugins: [
            new workbox.expiration.Plugin({
                statuses: [200]
            })
        ]*/
    })
)
