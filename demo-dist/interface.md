

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
```javascript
babelParser('console.log("hello babel")');
```

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
```javascript
babelTraverse(ast, {
 TSTypeAliasDeclaration(path) {
   // ...
 },
});
```

<br>
