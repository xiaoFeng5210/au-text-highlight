import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'

export default [
  // 主构建配置
  {
    input: 'src/index.ts',
    external: (id) => {
      if (id === 'react' || id === 'react-dom')
        return true
      if (id.startsWith('react/') || id.startsWith('react-dom/'))
        return true
      return false
    },
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
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
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
        declaration: true,
        declarationDir: 'lib/types', // 将声明文件放到单独目录
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
    ],
  },
  // 类型声明文件生成配置
  {
    input: 'src/index.ts',
    external: (id) => {
      if (id === 'react' || id === 'react-dom')
        return true
      if (id.startsWith('react/') || id.startsWith('react-dom/'))
        return true
      if (id === 'tslib' || id.includes('tslib'))
        return true
      if (id.includes('node_modules'))
        return true
      return false
    },
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
