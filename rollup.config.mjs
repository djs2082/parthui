import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import { readFileSync } from 'fs';
import url from '@rollup/plugin-url';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import image from '@rollup/plugin-image';
import rebase from "rollup-plugin-rebase"
import strip from 'rollup-plugin-strip';
import alias from '@rollup/plugin-alias';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// Manually read package.json
const packageJson = JSON.parse(
  readFileSync('./package.json', { encoding: 'utf8' })
);

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs.js', // Generates 'index.cjs.js'
      assetFileNames: 'assets/[name][extname]',
      publicPath: '/assets/', // Base path for assets
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].esm.js', // Generates 'index.esm.js'
      assetFileNames: 'assets/[name][extname]',
      publicPath: '/assets/', // Base path for assets
    }
  ],
  // output: [
  //   {
  //     dir: 'dist',
  //     format: 'cjs',
  //     sourcemap: true,
  //     assetFileNames: 'assets/[name][extname]',
  //     publicPath: '/assets/', // Ensure the correct base path
  //   },
  //   {
  //     dir: 'dist',
  //     format: 'esm',
  //     sourcemap: true,
  //     assetFileNames: 'assets/[name][extname]',
  //     publicPath: '/assets/', // Ensure the correct base path
  //   }
  // ],
  makeAbsoluteExternalsRelative: true,
  plugins: [
    strip({
      directives: ['use client'], // Strips 'use client' directive
    }),
    external(),
    resolve({
      browser: true
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist'
    }),
    terser(),
    nodePolyfills(),
    url({
      include: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.svg'],
      limit: 0, // Prevent inlining; always emit files
      emitFiles: true,
      fileName: 'assets/[name][extname]', // Output to 'dist/assets'
    }),
    postcss({
      extensions: ['.css', '.scss'], // Enable SCSS support
      use: ['sass'],                 // Use the Sass preprocessor
    }),
    json(),
    image(),
    alias({
      entries: {
        os: './empty-os.js', // Provide an empty polyfill
      },
    }),
    rebase({
      assetFolder: 'assets',
      keepName: true,
    }),
    {
      name: 'log-plugin',
      buildStart() {
        console.log('Starting Rollup build...');
      },
      generateBundle() {
        console.log('Generating bundle...');
      },
    },
  ],
  external: ['react', 'react-dom', 'os']
  // external: ['react', 'react-dom', '@mui/material']

}