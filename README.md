# @jairwinl/utils

## 在线文档

- [@jairwinl/utils 文档](https://utils-doc.vercel.app)
- [备用地址](http://util-doc.jairwin.cn)
- [npm](https://www.npmjs.com/package/@jairwinl/utils)

## 说明

> 阅读对象：库使用者

### 安装和使用

```
// 安装
pnpm add @jairwinl/utils
```

### 引入

```ts
// 1. 单个方法引入方式(✅ 推荐)
import { isArray } from '@jairwinl/utils/esm/isArray';
console.log(isArray(array));

// 2. 批量引入多个方法(❌ 不推荐，所有函数会构建到产物中)
import { isArray } from '@jairwinl/utils/esm';
console.log(isArray(array));

// 3. 引入某个子包(❌ 不推荐，包大小太大)
import * as isArray from '@jairwinl/utils/esm';
console.log(isArray(array));

// 4. 引入整个库(❌ 不推荐，包大小太大)
import * as @jairwinl/utils from '@jairwinl/utils/esm';
console.log(isArray(array));
```

### 代码提示

vscode 代码提示：安装`steoates.autoimport`插件，并在工程根目录创建 index.d.ts, 然后添加如下内容
index.d.ts

```typescript
/* 引入对应的{esm/umd/cjs}/index.d.ts */
/// <reference path="@jairwinl/utils/esm/index.d.ts" />
```

## 维护

> 阅读对象：库函维护者

### build

```
pnpm build
```

> 构建 js 库，构建成功后将根据不同的模块化方式分别输出到 esm/umd/cjs 目录，并将 JSDOC 文档输出到 doc/(doc/用于部署为在线文档)

#### publish

1. 切换到 main 分支
2. 执行发布命令

```sh
npm run pub:major / pub:minor / pub:patch
```

- pub:major：不兼容，或很大的变更
- pub:minor：小版本迭代，比如新增 utils，必须兼容
- pub:patch：bugfix、文档修改

### 单元测试

命令：

```sh
pnpm build && pnpm test

# 如果只是修改单测，只需
pnpm test
```

## 开发规范

### 目录结构

```
|____README.md
|____package.json
|____src                源码
| |____index.ts         入口
|____test/            	单元测试
|____esm/             	[构建产物]es module产物，适用于浏览器以及小程序
|____umd/             	[构建产物]umd产物，通用模块定义，适用于amd, script tag等场景
|____cjs/             	[构建产物]common js产物，适用于 Node 或 Browserify/webpack
|____doc/             	[构建生成]jsdoc文档，主要作用文档站点部署
|____jsdoc.json         jsdoc配置
|____rollup.config.js   打包配置
|___ __docdash          docdash相关文档配置文件
|____jsdoc.json 				jsdoc配置
```

## refs

- 选择 rollup 原因（仅供参考）
  - [为什么说 rollup 比 webpack 更适合打包库](https://segmentfault.com/a/1190000038708512)
  - [rollup 打包产物解析及原理（对比 webpack）](https://juejin.cn/post/7054752322269741064)
- [JSDoc Guide](https://yuri4ever.github.io/jsdoc/)
- 生成文档: [docdash](https://github.com/clenemt/docdash)
- [JSDOC](https://jsdoc.app/index.html#block-tags)
- [docdash 范例](http://clenemt.github.io/docdash/utils_logger.js.html)
- [tsd 输出配置参考](https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/)
- 接口设计[参考](https://yanhaijing.com/javascript/2018/08/17/2020-js-lib/)
- rollup-plugin-babel 配置: [参考](https://github.com/rollup/rollup-plugin-babel#configuring-babel)

### Typescript Definitions

采用`@types`方式独立输出 tsd 需要向[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)提 PR，维护不方便；js 和 types 一致性难保障[参考](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)。最终选择直接将 tsd 输出到打包产物目录中。
