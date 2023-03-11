if ('undefined' === typeof window) {
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
    )
}
/*import {CacheableResponsePlugin} from 'workbox-cacheable-response'
import {CacheFirst, StaleWhileRevalidate} from 'workbox-strategies'
import {ExpirationPlugin} from 'workbox-expiration'
import {registerRoute} from 'workbox-routing'
import {precacheAndRoute} from "workbox-precaching"
import {pageCache} from 'workbox-recipes'*/

/*pageCache()
// eslint-disable-next-line no-restricted-globals
precacheAndRoute([{"revision":"edb4e1dccc632d5bc4fc5c12e9fce2e6","url":"build/index.html"},{"revision":"740bd77eecc9a8a1e71dd23ebb80d935","url":"build/static/css/main.883a8f4d.css"},{"revision":"5b7be6e48b6bc3fc35bcf8650c19c695","url":"build/static/js/787.ce0f7742.chunk.js"},{"revision":"3b6a07d8652600d3c1de0a4f31a8a688","url":"public/index.html"},{"revision":"0d7edd0caac0f9de8973e6a12d1fd181","url":"public/sw.js"},{"revision":"9ebb57a0df0f3853ebbaa4539e6a0990","url":"rollup.config.js"},{"revision":"271d20c0a1ad9de829b16068f296823a","url":"src/App.css"},{"revision":"802da149e64e147769b790518d3f0fc7","url":"src/App.js"},{"revision":"d18ac434afb00158b91831ac1e36c491","url":"src/App.test.js"},{"revision":"02f8f8940e64dc717505830a104a4be1","url":"src/components/common/Point/Point.module.css"},{"revision":"98bebdac1ccb11186dbe7088105b7bb2","url":"src/components/Main/Main.module.css"},{"revision":"9b8a9fd7d6123272d1ce20dffef87bbd","url":"src/graphql/getAllPoints.js"},{"revision":"0e4a1618d9e11c2a06c554eb4bda413a","url":"src/graphql/getAllRoutes.js"},{"revision":"13375b5814a4707634ee381f1bb08969","url":"src/graphql/getPoint.js"},{"revision":"6c2104b8d219ed99234ae2d6329f4357","url":"src/index.css"},{"revision":"d8142e273a3e94faa3c44e269ec298e4","url":"src/index.js"},{"revision":"240e2381f826a9bb84d178b29b7b9abe","url":"src/reportWebVitals.js"},{"revision":"1a77571e1a8cf36018a41bcedf60db75","url":"src/setupTests.js"},{"revision":"dbda9045261170d2d62959cf66df4fb1","url":"src/styles/Map.css"},{"revision":"4c7ba2fb51483087cc90e56947776f2a","url":"sw-build.js"},{"revision":"a40706f447084668a33012fd68c0feac","url":"webpack-config.js"},{"revision":"ad5fb3c43686f04e58a74a974294f63d","url":"workbox-config.js"}])
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
    /http:\/\/localhost:5000\/src\/images\/maps\/*\/*\/*\/*/,
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
