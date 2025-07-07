import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'

export default [
  // 主构建配置
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'], // 将 React 标记为外部依赖
    output: [
      {
        file: 'lib/bundle.cjs.js',
        format: 'cjs', // CommonJS
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
      {
        file: 'lib/bundle.esm.js',
        format: 'esm', // ES Module
      },
      {
        file: 'lib/bundle.umd.js',
        format: 'umd', // UMD
        name: 'AuTextHighlight',
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    ],
    plugins: [
      resolve({
        browser: true,
        dedupe: ['react', 'react-dom'],
      }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.*', 'demo/**/*'],
        declaration: false, // 在主构建中不生成声明文件
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        presets: [
          ['@babel/preset-react', { runtime: 'automatic' }],
          '@babel/preset-typescript',
        ],
      }),
      terser(),
    ],
  },
  // 类型声明文件生成配置
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    output: {
      file: 'lib/index.d.ts',
      format: 'esm',
    },
    plugins: [
      dts({
        tsconfig: './tsconfig.json',
        exclude: ['**/*.test.*', 'demo/**/*'],
      }),
    ],
  },
]
