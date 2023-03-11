import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import {terser} from "rollup-plugin-terser";
import { rollupPluginHTML } from '@web/rollup-plugin-html';
import styles from 'rollup-plugin-styles';
import jsx from 'rollup-plugin-jsx'

export default {
    input: "src/index.js",
    output: {
        file: "dist/bundle.js",
        format: "iife",
        sourcemap: true,
    },
    plugins: [
        nodeResolve({
            extensions: [".js"],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify( 'development' )
        }),
        babel({
            presets: ["@babel/preset-react"],
        }),
        commonjs(),
        serve({
            open: true,
            verbose: true,
            contentBase: ["", "public"],
            host: "localhost",
            port: 3000,
        }),
        livereload({ watch: "dist" }),
        terser(),
        styles(),
        jsx( {factory: 'React.createElement'} )
    ]
};