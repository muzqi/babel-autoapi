

[TOC]


# function.ts

## Function babelParser

> @author: muzi<br/>
> @version: 1.1.0<br/>

语法：**babelParser**(*sourceCode*: `string`, *parserOptions*: `object`): `object`


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`sourceCode`|string|未知|未知|源码字符串<br/>|
|`parserOptions`|object|未知|未知|配置项<br/>|

描述：parserOptions

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`sourceType`|"unambiguous"\|"script"\|"module"|未知|未知|编译类型<br/>|
|`plugins`|Array\<string\>|未知|未知|插件引用<br/>|


### 响应

|描述|类型|
|---|---|
|响应AST对象<br/>|object|


### 示例
```javascript
babelParser('console.log("hello babel")');
```

<br>
