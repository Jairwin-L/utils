# jairwin-utils

## 在线文档

[jairwin-utils文档](https://utils-doc.vercel.app)

## 说明

>阅读对象：库使用者

### 安装和使用

```
// 安装
pnpm i jairwin-utils
```

### 引入

```ts
// 1. 单个方法引入方式(✅ 推荐)
import { isArray } from 'jairwin-utils/esm/isArray';
console.log(isArray(array));

// 2. 批量引入多个方法(❌ 不推荐，所有函数会构建到产物中)
import { isArray } from 'jairwin-utils/esm';
console.log(isArray(array));

// 3. 引入某个子包(❌ 不推荐，包大小太大)
import * as isArray from 'jairwin-utils/esm';
console.log(isArray(array));

// 4. 引入整个库(❌ 不推荐，包大小太大)
import * as jairwin-utils from 'jairwin-utils/esm';
console.log(isArray(array));
```

### 代码提示

vscode代码提示：安装`steoates.autoimport`插件，并在工程根目录创建index.d.ts, 然后添加如下内容
index.d.ts

```typescript
 /* 引入对应的{esm/umd/cjs}/index.d.ts */
 /// <reference path="jairwin-utils/esm/index.d.ts" />
```

## 维护

>阅读对象：库函维护者

### build

```
pnpm run build
```

>构建js库，构建成功后将根据不同的模块化方式分别输出到esm/umd/cjs目录

### 单元测试

命令：

```sh
pnpm run build && pnpm run test

# 如果只是修改单测，只需
pnpm run test
```


## 开发规范

### 目录结构

```
|____README.md
|____package.json
|____src                源码
| |____index.ts         入口
|____test/            	单元测试
|____esm/             	[构建产物]es module产物，主要用在小程序中
|____umd/             	[构建产物]umd产物，主要用作amd, script tag等场景
|____cjs/             	[构建产物]common js产物，主要用于node
|____dist/            	[构建生成]jsdoc文档
|____doc/             	[构建生成]jsdoc文档
|____jsdoc.json         jsdoc配置
|____rollup.config.js   打包配置
|___ __docdash          docdash相关文档配置文件
|____jsdoc.json 				jsdoc配置
```

## refs

- [JSDoc Guide](https://yuri4ever.github.io/jsdoc/)
- 生成文档: [docdash](https://github.com/clenemt/docdash)
- [JSDOC](https://jsdoc.app/index.html#block-tags)
- [docdash范例](http://clenemt.github.io/docdash/utils_logger.js.html)
- [tsd输出配置参考](https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/)
- 接口设计[参考](https://yanhaijing.com/javascript/2018/08/17/2020-js-lib/)
- rollup-plugin-babel 配置: [参考](https://github.com/rollup/rollup-plugin-babel#configuring-babel)

### Typescript Definitions

采用`@types`方式独立输出tsd需要向[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)提PR，维护不方便；js和types一致性难保障[参考](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)。最终选择直接将tsd输出到打包产物目录中。
