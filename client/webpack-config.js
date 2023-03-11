// Inside of webpack.config.js:
const {InjectManifest} = require('workbox-webpack-plugin');
const replace = require('webpack-plugin-replace')
module.exports = {
    // Other webpack config...
    plugins: [
        // Other plugins...
        new InjectManifest({
            // These are some common options, and not all are required.
            // Consult the docs for more info.
            exclude: [/.../, '...'],
            maximumFileSizeToCacheInBytes: 150000,
            swSrc: './src/sw.js',
            swDest: './build/sw.js',

        }),
        new replace({
            'process.env.NODE_ENV':JSON.stringify('production')
        }),
    ],

};
