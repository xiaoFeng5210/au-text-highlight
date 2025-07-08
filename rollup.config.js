import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'

const reactGlobals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'react/jsx-runtime': 'jsxRuntime', // 添加 react/jsx-runtime 的全局变量名
  'tslib': 'tslib', // 添加 tslib 的全局变量名
}

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
        globals: reactGlobals,
      },
      {
        file: 'lib/bundle.esm.js',
        format: 'esm', // ES Module
      },
      {
        file: 'lib/bundle.umd.js',
        format: 'umd', // UMD
        name: 'AuTextHighlight',
        globals: reactGlobals,
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
      terser(),
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
