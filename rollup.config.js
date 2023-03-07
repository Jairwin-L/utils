/**
 * 这是对原始 rollup-plugin-typescript 的重写
 * 这个版本比原来的版本要慢一些，但它会打印出 typescript 句法和语义诊断信息（毕竟是使用 typescript 的主要原因）。
 */
import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';
// 对打包的js进行压缩
import { terser } from 'rollup-plugin-terser';
// 在打包的时候把目标字符串替换
import replace from '@rollup/plugin-replace';
/**
 * 帮助寻找node_modules里的包
 * rollup.js编译源码中的模块引用默认只支持ES6+的模块方式import/export。
 * 然而大量的npm模块是基于CommonJS模块方式，这就导致了大量 npm 模块不能直接编译使用。
 * 所以辅助rollup.js编译支持npm模块和CommonJS模块方式的插件就应运而生
 */
import resolve from '@rollup/plugin-node-resolve';
/**
 * rollup.js编译源码中的模块引用默认只支持 ES6+的模块方式import/export。然而大量的npm模块是基于CommonJS模块方式，这就导致了大量 npm模块不能直接编译使用。
 * 因此使得rollup.js编译支持npm模块和CommonJS模块方式的插件就应运而生
 */
import commonjs from '@rollup/plugin-commonjs';
/**
 * 一个汇总插件，用于将模块化库与子目录捆绑在一起。
 * 使用多个入口点。
 * 在条目中使用 glob。
 * 在 dist 文件夹中保留 src 树结构。
 */
import multiInput from 'rollup-plugin-multi-input';

const pkg = require('./package.json');

const banner = `
/*  ${pkg.name} - ${pkg.description}
*   Author: ${pkg.author}
*   Version: v ${pkg.version}
*/
`;

const isProduction = process.env.NODE_ENV === 'production';
const BABEL_CONFIG = {
  extensions: ['.js', '.ts'],
  babelrc: false, // 使用独立配置，rollup依赖的babelrc配置冲突
  babelHelpers: 'runtime',
  // 备注：无需external-helpers， 用transform-runtime方案替代
  // externalHelpers: true,
  exclude: 'node_modules/**',
  presets: [
    [
      '@babel/env',
      {
        /**
         * https://babeljs.io/docs/en/babel-preset-env#loose
         * 为此预设中允许它们的任何插件启用“松散”转换。
         * 使用 loose 模式，避免产生副作用
         * 参考: https://xiaogliu.github.io/2019/07/24/rollup-config/
         */
        loose: false,
        /**
         * https://babeljs.io/docs/en/babel-preset-env#usebuiltins
         * 启用将 ES 模块语法转换为另一种模块类型。请注意，这cjs只是commonjs
         */
        modules: false,
        /**
         * https://babeljs.io/docs/en/babel-preset-env#usebuiltins
         * 此选项配置如何@babel/preset-env处理 polyfill
         */
        useBuiltIns: false,
        // 避免转换成 CommonJS
        // corejs: 3,
      },
    ],
    // 仅包含：@babel/plugin-transform-typescript
    '@babel/typescript',
  ],
  plugins: [
    // 备注：无需external-helpers， 用transform-runtime方案替代
    // '@babel/plugin-external-helpers',
    [
      // 参考: https://babeljs.io/docs/en/babel-plugin-transform-runtime
      '@babel/plugin-transform-runtime',
      {
        /**
         * https://babeljs.io/docs/en/babel-plugin-transform-runtime#absoluteruntime
         * 这允许用户transform-runtime在整个项目中广泛运行
         * absoluteRuntime: require.resolve('regenerator-runtime'),
         */
        absoluteRuntime: false,
        /**
         * https://babeljs.io/docs/en/babel-plugin-transform-runtime#corejs
         */
        corejs: false,
        /**
         * https://babeljs.io/docs/en/babel-plugin-transform-runtime#helpers
         * 切换内联的 Babel 助手（classCallCheck,extends等）是否替换为对 的调用moduleName
         */
        helpers: true,
        /**
         * https://babeljs.io/docs/en/babel-plugin-transform-runtime#regenerator
         * 切换生成器函数是否转换为使用不污染全局范围的再生器运行时
         */
        regenerator: false,
        /**
         * https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
         * 这允许在像 webpack 这样的模块系统中进行更小的构建
         */
        useESModules: true,
      },
    ],
    '@babel/proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-destructuring',
    // typescript会进行转换
    // '@babel/plugin-transform-async-to-generator',
  ],
};

const commonOptions = {
  // rollup-watch: https://github.com/rollup/rollup-watch
  watch: {
    exclude: ['node_modules/**', 'src/**/*.test.ts'],
  },
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
};

export default [
  // ES
  {
    ...commonOptions,
    /**
     * https://www.rollupjs.com/guide/big-list-of-options#%E6%A0%B8%E5%BF%83%E5%8A%9F%E8%83%BDcore-functionality
     */
    input: ['src/**/*.ts', '!src/**/*.test.ts'],
    output: {
      dir: 'esm',
      format: 'esm',
      indent: false,
      banner,
      sourceMap: 'inline',
    },
    plugins: [
      multiInput({ relative: 'src/' }),
      resolve({
        extensions: ['.js', '.ts'],
      }),
      commonjs({ include: 'node_modules/**' }),
      typescript({
        tsconfigOverride: {
          compilerOptions: { declaration: true, declarationDir: 'esm' },
        },
      }),
      babel(BABEL_CONFIG),
      isProduction &&
        terser({
          output: {
            comments: false,
          },
        }),
    ],
  },
  // CommonJS
  {
    ...commonOptions,
    input: ['src/**/*.ts', '!src/**/*.test.ts'],
    output: {
      dir: 'cjs',
      format: 'cjs',
      indent: false,
      banner,
      sourceMap: 'inline',
    },
    plugins: [
      multiInput({ relative: 'src/' }),
      resolve({
        extensions: ['.js', '.ts'],
      }),
      commonjs({ include: 'node_modules/**' }),
      typescript({
        tsconfigOverride: {
          compilerOptions: { declaration: true, declarationDir: 'cjs' },
        },
      }),
      babel(BABEL_CONFIG),
      isProduction &&
        terser({
          output: {
            comments: false,
          },
        }),
    ],
  },
  // UMD
  {
    ...commonOptions,
    input: ['src/index.ts'],
    output: {
      file: isProduction ? 'umd/index.min.js' : 'umd/index.js',
      format: 'umd',
      name: '@jairwinl/utils',
      banner,
      sourceMap: 'inline',
      globals: {
        tslib: 'tslib',
        dayjs: 'dayjs',
        'lodash.isstring': 'lodash.isstring',
        'lodash.isplainobject': 'lodash.isplainobject',
        'lodash.isfunction': 'lodash.isfunction',
      },
    },
    plugins: [
      resolve({
        extensions: ['.js', '.ts'],
      }),
      commonjs({ include: 'node_modules/**' }),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
            declarationDir: 'cjs',
          },
        },
      }),
      babel(BABEL_CONFIG),
      /**
       * TODO:comments：the next major version maybe remove
       * En：Plugin replace: @rollup/plugin-replace: 'preventAssignment' currently defaults to false.
       * It is recommended to set this option to `true`,
       * as the next major version will default this option to `true`.
       * Zh：插件替换：@rollup/plugin-replace：“preventAssignment”当前默认为 false。
       * 建议将此选项设置为 `true`，因为下一个主要版本将默认此选项为 `true`。
       */
      replace({
        preventAssignment: true,
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      }),
      isProduction &&
        terser({
          output: {
            comments: false,
          },
        }),
    ],
  },
];
