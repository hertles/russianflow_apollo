const {injectManifest} = require('workbox-build')

injectManifest({
    // These are some common options, and not all are required.
    // Consult the docs for more info.
    globDirectory: '.',
    swSrc: './src/sw.js',
    swDest: './build/sw.js',
    maximumFileSizeToCacheInBytes: 150000,
}).then(()=>{console.log('\nНовая версия ServiceWorker готова\n')})
