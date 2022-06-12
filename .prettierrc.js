// 参考: https://prettier.io/docs/en/options.html#trailing-commas
module.exports = {
  // 单行最大长度
  printWidth: 100,
  // 设置编辑器每一个水平缩进的空格数
  tabWidth: 2,
  // 是否用Tab替代空格
  useTabs: false,
  // 在句尾添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  // 在任何可能的多行中输入尾逗号。
  trailingComma: 'es5',
  // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
  bracketSpacing: true,
  // 为单行箭头函数的参数添加圆括号。
  arrowParens: 'always',
  endOfLine: 'lf',
};
