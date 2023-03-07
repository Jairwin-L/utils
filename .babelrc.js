module.exports = {
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
        loose: true,
        /**
         * https://babeljs.io/docs/en/babel-preset-env#usebuiltins
         * 启用将 ES 模块语法转换为另一种模块类型。请注意，这cjs只是commonjs
         */
        modules: 'auto',
        /**
         * https://babeljs.io/docs/en/babel-preset-env#usebuiltins
         * 此选项配置如何@babel/preset-env处理 polyfill
         */
        useBuiltIns: false,
        // 避免转换成 CommonJS
        // corejs: 3,
      },
    ],
    '@babel/preset-typescript',
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
        regenerator: true,
        /**
         * https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
         * 这允许在像 webpack 这样的模块系统中进行更小的构建
         */
        useESModules: false,
        // modules: false,
      },
    ],
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-async-to-generator',
  ],
  exclude: 'node_modules/**',
	/**
	 * https://babeljs.io/docs/en/options#comments
	 * shouldPrintComment如果没有给出函数，则提供默认注释状态。有关详细信息，请参阅该选项的默认值
	 */
  comments: false,
};
