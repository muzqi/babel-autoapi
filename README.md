# babel-autoapi

前端注释自动转译 md 文件。

# Installation

```bash
npm i babel-autoapi
```

# API

`babel-autoapi` 暴露了两个函数方法，供用户自定义使用 `babelTraverse` `mdTransform`。

## Interface DocI

描述：babelTraverse 返回的 Doc

### 参数

| 属性   | 类型                                                                                                          | 是否必填 | 是否只读 | 描述            |
| ------ | ------------------------------------------------------------------------------------------------------------- | -------- | -------- | --------------- |
| `type` | "function"\|"arrow-function"\|"class"\|"ts-interface"\|"ts-interface-function"\|"ts-type"\|"ts-type-function" | true     | false    | 注释类型<br/>   |
| `name` | string                                                                                                        | true     | false    | 方法名称<br/>   |
| `docs` | []                                                                                                            | true     | false    | 注释数组集<br/> |

<br/>

## Interface WrapperDocI

描述：mdTransform 接收的 docs 参数

### 参数

| 属性         | 类型                           | 是否必填 | 是否只读 | 描述          |
| ------------ | ------------------------------ | -------- | -------- | ------------- |
| `filename`   | string                         | true     | false    | 文件名称<br/> |
| `dataSource` | Array\<TSTypeReference: DocI\> | true     | false    | 文档资源<br/> |

<br/>

## babelTraverse

> @author: muzi<br/>

语法：**babelTraverse**(_sourceCode_: `string`): `Array<TSTypeReference: DocI>`

描述：将源码转换为标准注释对象

### 参数

| 属性         | 类型   | 是否必填 | 是否只读 | 描述            |
| ------------ | ------ | -------- | -------- | --------------- |
| `sourceCode` | string | true     | false    | 源码字符串<br/> |

### 响应

| 描述          | 类型                           |
| ------------- | ------------------------------ |
| 注释对象<br/> | Array\<TSTypeReference: DocI\> |

### 示例

```javascript
const { babelTraverse } = require("babel-autoapi");
const dataSource = babelTraverse(sourceCode);
```

<br>

## mdTransform

> @author: muzi<br/>

语法：**mdTransform**(_docs_: `Array<TSTypeReference: WrapperDocI>`, _toc_: `boolean`): `string`

描述：将注释对象转换为 md 文档字符串

### 参数

| 属性   | 类型                                  | 是否必填 | 是否只读 | 描述                           |
| ------ | ------------------------------------- | -------- | -------- | ------------------------------ |
| `docs` | Array\<TSTypeReference: WrapperDocI\> | true     | false    | 处理过的注释对象<br/>          |
| `toc`  | boolean                               | true     | false    | 是否在顶部添加 [TOC] 目录<br/> |

### 响应

| 描述                         | 类型   |
| ---------------------------- | ------ |
| markdown 标准格式字符串<br/> | string |

### 示例

```javascript
const { babelTraverse, mdTransform } = require("babel-autoapi");
const dataSource = babelTraverse(sourceCode);
const md = mdTransform([{ filename: "index.ts", dataSource }], true);
```

<br>

# bash API

```bash
autoapi --h

--merge           是否合并为一个文件输出
--out-filename    输出单一文件的文件名，默认 README，传 merge 时有效
--out-dirname     输出多个文件的文件夹名，当不传 merge 时有效
--toc             输出文件是否带 [TOC] 目录
--help, -h        输出帮助文档
--version, -v     输出 babel-autoapi 版本号
```

```bash
# 编译 src/source/*.js 中所有 js 文件
# 编译 src/source-ts/**/*.ts 中所有 ts 文件
# --merge 将所有文件注释合并输出到执行目录的 README.md 中
autoapi src/source/*.js src/source-ts/**/*.ts --merge --toc --out-filename=README
```

```bash
# 编译 src/helper/*.js 中所有 js 文件
# 将每个文件注释输出到执行目录 apis 文件夹中
autoapi src/helper/*.js --toc --out-dirname=apis
```

# Usage

## function

**In**

```javascript
/**
 * @babel/parser
 * @param {string} sourceCode     源码字符串
 * @param {object} parserOptions  配置项
 * @return {object} 响应AST对象
 * @author muzi
 * @version 1.1.0
 * @example
 * babelParser('console.log("hello babel")');
 */
/**
 * parserOptions
 * @param {'unambiguous' | 'script' | 'module'} sourceType 编译类型
 * @param {Array<string>}                       plugins    插件引用
 */
export const babelParser = (sourceCode, parserOptions = {}) => {};
```

**Out**

```
[TOC]

# function.ts

## Function babelParser

> @author: muzi<br/>
> @version: 1.1.0<br/>

语法：**babelParser**(*sourceCode*: `string`, *parserOptions*: `object`): `object`


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`sourceCode`|string|unknown|unknown|源码字符串<br/>|
|`parserOptions`|object|unknown|unknown|配置项<br/>|

描述：parserOptions

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`sourceType`|"unambiguous"\|"script"\|"module"|unknown|unknown|编译类型<br/>|
|`plugins`|Array\<string\>|unknown|unknown|插件引用<br/>|


### 响应

|描述|类型|
|---|---|
|响应AST对象<br/>|object|


### 示例
\`\`\`javascript
babelParser('console.log("hello babel")');
\`\`\`
```

## Typescript

**In**

```javascript
/**
 * ParserOptions
 */
export interface ParserOptionsI {
  sourceType?: "unambiguous" | "script" | "module"; // 编译类型
  plugins?: ["typescript" | "jsx"]; // 插件引用
}

/**
 * @babel/parser
 * @param sourceCode     源码字符串
 * @param parserOptions  配置项
 * @return 响应AST对象
 * @example
 * babelParser('console.log("hello babel")');
 */
export interface BabelParser {
  (sourceCode: string, parserOptions?: ParserOptionsI): object;
}

/**
 * Visitor
 */
export interface VisitorI {
  TSTypeAliasDeclaration: (path: any) => void; // TSTypeAliasDeclaration
}

/**
 * 抽象语法树
 * https://astexplorer.net/
 */
export type AST = object;

/**
 * @babel/traverse
 * @param ast      AST语法树
 * @param visitor  遍历函数
 * @return 无响应
 * @example
 * babelTraverse(ast, {
 *  TSTypeAliasDeclaration(path) {
 *    // ...
 *  },
 * });
 */
export type BabelTraverse = (ast: AST, visitor: VisitorI) => void;
```

**Out**

```
[TOC]

# interface.ts


## Interface ParserOptionsI


描述：ParserOptions

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`sourceType`|"unambiguous"\|"script"\|"module"|false|false|编译类型<br/>|
|`plugins`|["typescript"\|"jsx"]|false|false|插件引用<br/>|

<br/>

## Interface BabelParser


语法：**BabelParser**(*sourceCode*: `string`, *parserOptions?*: `TSTypeReference: ParserOptionsI`): `object`


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`sourceCode`|string|true|false|源码字符串<br/>|
|`parserOptions`|TSTypeReference: ParserOptionsI|false|false|配置项<br/>|


### 响应

|描述|类型|
|---|---|
|响应AST对象<br/>|object|


### 示例
\`\`\`javascript
babelParser('console.log("hello babel")');
\`\`\`

<br>


## Interface VisitorI


描述：Visitor

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`TSTypeAliasDeclaration`|function|true|false|TSTypeAliasDeclaration<br/>|

<br/>


## Type AST


描述：

抽象语法树

https://astexplorer.net/

类型：object


<br/>

## Type Function BabelTraverse


语法：**BabelTraverse**(*ast*: `TSTypeReference: AST`, *visitor*: `TSTypeReference: VisitorI`): `void`


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`ast`|TSTypeReference: AST|true|false|AST语法树<br/>|
|`visitor`|TSTypeReference: VisitorI|true|false|遍历函数<br/>|


### 响应

|描述|类型|
|---|---|
|无响应<br/>|void|


### 示例
\`\`\`javascript
babelTraverse(ast, {
 TSTypeAliasDeclaration(path) {
   // ...
 },
});
\`\`\`
```

## Class

**In**

```javascript
/**
 * A 类方法
 * @param {string} name this is name
 * @param {object} opt  配置参数
 * @example const a = new A('muzi');
 * @author muzi
 */
/**
 * opt 配置参数
 * @param {boolean} merge 是否合并
 */
class A {
  name: string; // @param {string|'test'} name this is name
  age: number; // this is age
  constructor(name) {
    this.name = name;
  }

  /**
   * sayHi
   * @author muzi
   * @param {number} age 年龄
   * @return {void} 无任何响应
   */
  sayHi(age) {
    console.log(this.name, age);
  }

  /**
   * 获取 name
   * @return {string} name
   * @example
   * const a = new A();
   * const name = a.getName();
   */
  getName() {
    return this.name;
  }
}
```

**Out**

```
[TOC]

# class.ts


## Class A

> @author: muzi<br/>

描述：A 类方法



|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string|unknown|unknown|this is name<br/>|
|`opt`|object|unknown|unknown|配置参数<br/>|

描述：opt 配置参数



|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`merge`|boolean|unknown|unknown|是否合并<br/>|

\`\`\`javascript
const a = new A('muzi');
\`\`\`


### 实例属性

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string\|"test"|unknown|unknown|this is name<br/>|
|`age`|unknown|unknown|unknown|this is age<br/>|


### 类方法


#### Function sayHi

> @author: muzi<br/>

语法：**sayHi**(*name*: `string`): `void`

描述：sayHi

##### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string|unknown|unknown|名字<br/>|


##### 响应

|描述|类型|
|---|---|
|无任何响应<br/>|void|

<br>

#### Function getName


语法：**getName**(): `string`

描述：获取 name

##### 响应

|描述|类型|
|---|---|
|name<br/>|string|


##### 示例
\`\`\`javascript
const a = new A();
const name = a.getName();
\`\`\`
```

# logs

> 0.0.1

- 第一次发布，基本功能完善。

> 0.0.2

- 优化 README.md 文档；
- 新增 -h 命令。

> 0.0.3

- 修复了 function 空 `leadingComments` bug；
- 优化了 helper 代码组织结构；
- 支持 `jsx` 类型语言；
- 对外暴露了 `babelTraverse` `mdTransform` 两个方法；
- README.md 新增 logs 日志记录。

> 0.0.5

- 新增 --v 命令

> 0.0.6

- 解决依赖包未下载的问题

> 0.0.7

- 增加 --version --help 命令
- package.json 定义了 engines 环境
