import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
  runtimeHelpers: true,
  // 备注：无需external-helpers， 用transform-runtime方案替代
  // externalHelpers: true,
  exclude: 'node_modules/**',
  presets: [
    [
      '@babel/env',
      {
        // 使用 loose 模式，避免产生副作用
        // 参考: https://xiaogliu.github.io/2019/07/24/rollup-config/
        loose: false,
        modules: false,
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
        // absoluteRuntime: require.resolve('regenerator-runtime'),
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: false,
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
    exclude: ['node_modules/**'],
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
};

export default [
  // ES
  {
    ...commonOptions,
    input: ['src/**/*.ts'],
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
    input: ['src/**/*.ts'],
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
      name: 'jairwin-utils',
      banner,
      sourceMap: 'inline',
      globals: {
        tslib: 'tslib',
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
      replace({
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
