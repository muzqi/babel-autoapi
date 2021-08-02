

[TOC]


# api.ts


## Interface DocI


描述：babelTraverse 返回的 Doc

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`type`|"function"\|"arrow-function"\|"class"\|"ts-interface"\|"ts-interface-function"\|"ts-type"\|"ts-type-function"|true|false|注释类型<br/>|
|`name`|string|true|false|方法名称<br/>|
|`docs`|[]|true|false|注释数组集<br/>|

<br/>


## Interface WrapperDocI


描述：mdTransform 接收的 docs 参数

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`filename`|string|true|false|文件名称<br/>|
|`dataSource`|Array\<TSTypeReference: DocI\>|true|false|文档资源<br/>|

<br/>

## Interface babelTraverse

> @author: muzi<br/>

语法：**babelTraverse**(*sourceCode*: `string`): `Array<TSTypeReference: DocI>`

描述：将源码转换为标准注释对象

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`sourceCode`|string|true|false|源码字符串<br/>|


### 响应

|描述|类型|
|---|---|
|注释对象<br/>|Array\<TSTypeReference: DocI\>|


### 示例
```javascript
const { babelTraverse } = require('babel-autoapi');
const dataSource = babelTraverse(sourceCode);
```

<br>

## Interface mdTransform

> @author: muzi<br/>

语法：**mdTransform**(*docs*: `Array<TSTypeReference: WrapperDocI>`, *toc*: `boolean`): `string`

描述：将注释对象转换为 md 文档字符串

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`docs`|Array\<TSTypeReference: WrapperDocI\>|true|false|处理过的注释对象<br/>|
|`toc`|boolean|true|false|是否在顶部添加 [TOC] 目录<br/>|


### 响应

|描述|类型|
|---|---|
|markdown 标准格式字符串<br/>|string|


### 示例
```javascript
const { babelTraverse, mdTransform } = require('babel-autoapi');
const dataSource = babelTraverse(sourceCode);
const md = mdTransform(
 [{ filename: 'index.ts', dataSource }],
 true,
);
```

<br>
