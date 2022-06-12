/* istanbul ignore */
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // 使用 loose 模式，避免产生副作用
        // 参考: https://xiaogliu.github.io/2019/07/24/rollup-config/
        loose: true,
        modules: 'auto',
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
        absoluteRuntime: false,
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
        // modules: false,
      },
    ],
    '@babel/plugin-transform-destructuring',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-async-to-generator',
  ],
  exclude: 'node_modules/**',
  comments: false,
};
