

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
```javascript
babelParser('console.log("hello babel")');
```

<br>
