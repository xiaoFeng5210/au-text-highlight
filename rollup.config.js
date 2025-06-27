import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser' // Optional

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'lib/bundle.cjs.js',
      format: 'cjs', // CommonJS
      sourcemap: true,
    },
    {
      file: 'lib/bundle.esm.js',
      format: 'esm', // ES Module
      sourcemap: true,
    },
    {
      file: 'lib/bundle.umd.js',
      format: 'umd', // UMD
      name: 'MyLibrary',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tslib: 'tslib',
    }),
    terser(), // Optional
  ],
}
