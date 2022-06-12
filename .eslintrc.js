module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
    // 'plugin:prettier/recommended',
    // , 'airbnb'
  ],
  plugins: ['@typescript-eslint'], //定义了该eslint文件所依赖的插件
  parserOptions: {
    ecmaVersion: 2017,
  },
  globals: {
    // navigator: true,
    my: true,
    App: true,
    getApp: true,
    Page: true,
    Component: true,
    getCurrentPages: true,
  },
  overrides: [
    // [no-dupe-class-members] false negative for method overload
    // tsc throws an error for duplicate methods without ESLint.
    // https://github.com/typescript-eslint/typescript-eslint/issues/291#issuecomment-464448699
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-dupe-class-members': 'off',
      },
    },
  ],
  rules: {
    'standard/no-callback-literal': 'off',
    // 基本
    'no-undef-init': 2,
    'no-var': 2,
    // require or disallow space before function opening parenthesis
    // https://eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    // require trailing commas in multiline object literals
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        // functions: 'always-multiline',
      },
    ],

    // 引用
    // suggest using of const declaration for variables that are never modified after declared
    'prefer-const': 0,
    // 'prefer-const': [
    //   'warn',
    //   {
    //     destructuring: 'any',
    //     ignoreReadBeforeAssign: true
    //   }
    // ],

    // 对象
    'no-new-object': 2,
    // require method and property shorthand syntax for object literals
    // https://eslint.org/docs/rules/object-shorthand
    'object-shorthand': [
      'warn',
      'always',
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],

    // 数组
    'no-array-constructor': 2,

    // 解构
    // Prefer destructuring from arrays and objects
    // https://eslint.org/docs/rules/prefer-destructuring
    'prefer-destructuring': [
      'warn',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: true,
          object: true,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],

    // 字符串
    'prefer-template': 2,
    // specify whether double or single quotes should be used
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-eval': 2,
    'no-useless-escape': 1,

    // 函数
    'prefer-rest-params': 1,
    'no-new-func': 2,
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // rule: https://eslint.org/docs/rules/no-param-reassign.html
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // lux的state
          'acc', // for reduce accumulators
          'accumulator', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for Koa routing
          'req', // for Express requests
          'request', // for Express requests
          'res', // for Express responses
          'response', // for Express responses
          '$scope', // for Angular 1 scopes
        ],
      },
    ],
    'prefer-spread': 2,

    // 箭头函数
    // suggest using arrow functions as callbacks
    'prefer-arrow-callback': [
      'error',
      {
        allowNamedFunctions: false,
        allowUnboundThis: true,
      },
    ],
    // require space before/after arrow function's arrow
    // https://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['error', { before: true, after: true }],

    // 类
    'no-useless-constructor': 1,
    'no-dupe-class-members': 2,

    // 模块
    'import/no-mutable-exports': 2,
    'import/prefer-default-export': 0,
    'import/first': 2,

    // 迭代器
    'no-iterator': 2,
    // disallow certain syntax forms
    // https://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'ForOfStatement',
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    // 属性
    // encourages use of dot notation whenever possible
    'dot-notation': ['error', { allowKeywords: true }],

    // 变量
    'no-multi-assign': 2,
    // disallow declaration of variables that are not used in the code
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    // 比较运算符
    // require the use of === and !==
    // https://eslint.org/docs/rules/eqeqeq
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    'no-nested-ternary': 2,
    // disallow the use of Boolean literals in conditional expressions
    // also, prefer `a || b` over `a ? a : b`
    // https://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    // disallow un-paren'd mixes of different operators
    // https://eslint.org/docs/rules/no-mixed-operators
    'no-mixed-operators': [
      'error',
      {
        // the list of arthmetic groups disallows mixing `%` and `**`
        // with other arithmetic operators.
        groups: [
          ['%', '**'],
          ['%', '+'],
          ['%', '-'],
          ['%', '*'],
          ['%', '/'],
          ['**', '+'],
          ['**', '-'],
          ['**', '*'],
          ['**', '/'],
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],

    // 代码块
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],
    // enforce one true brace style
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    // disallow else after a return in an if
    // https://eslint.org/docs/rules/no-else-return
    'no-else-return': ['error', { allowElseIf: false }],
    // require or disallow a space immediately following the // or /* in a comment
    // https://eslint.org/docs/rules/spaced-comment
    'spaced-comment': [
      'error',
      'always',
      {
        line: {
          exceptions: ['-', '+'],
          markers: ['=', '!'], // space here to support sprockets directives
        },
        block: {
          exceptions: ['-', '+'],
          markers: ['=', '!'], // space here to support sprockets directives
          balanced: true,
        },
      },
    ],

    // 空白
    // this option sets a specific tab width for your code
    // https://eslint.org/docs/rules/indent
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        // MemberExpression: null,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
        ignoredNodes: [
          'JSXElement',
          'JSXElement > *',
          'JSXAttribute',
          'JSXIdentifier',
          'JSXNamespacedName',
          'JSXMemberExpression',
          'JSXSpreadAttribute',
          'JSXExpressionContainer',
          'JSXOpeningElement',
          'JSXClosingElement',
          'JSXText',
          'JSXEmptyExpression',
          'JSXSpreadChild',
        ],
        ignoreComments: false,
      },
    ],
    'space-before-blocks': 2,
    // require a space before & after certain keywords
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true },
        },
      },
    ],
    'space-infix-ops': 2,
    // disallow padding within blocks
    'padded-blocks': ['error', { blocks: 'never', classes: 'never', switches: 'never' }],
    // require or disallow spaces inside parentheses
    'space-in-parens': ['error', 'never'],
    // enforce spacing inside array brackets
    'array-bracket-spacing': ['error', 'never'],
    // require padding inside curly braces
    'object-curly-spacing': ['error', 'always'],
    // specify the maximum length of a line in your program
    // https://eslint.org/docs/rules/max-len
    'max-len': [
      'error',
      100,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    // 逗号
    // enforce one true comma style
    'comma-style': [
      'error',
      'last',
      {
        exceptions: {
          ArrayExpression: false,
          ArrayPattern: false,
          ArrowFunctionExpression: false,
          CallExpression: false,
          FunctionDeclaration: false,
          FunctionExpression: false,
          ImportDeclaration: false,
          ObjectExpression: false,
          ObjectPattern: false,
          VariableDeclaration: false,
          NewExpression: false,
        },
      },
    ],
    // 分号
    // require or disallow use of semicolons instead of ASI
    semi: ['error', 'always'],
    'no-new-wrappers': 2,

    // 命名规则
    // require camel case names
    'no-underscore-dangle': 0,
    camelcase: ['error', { properties: 'never' }],
    // require a capital letter for constructors
    'new-cap': [
      'error',
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
      },
    ],
  },
};
