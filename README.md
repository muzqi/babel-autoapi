

[TOC]


# function.ts

## Function getSearchString

> @author: muzi<br/>
> @version: 1.0.0<br/>

语法：**getSearchString**(*search*: `String`): `Object`

描述：

转换查询字符串

这是第二行描述

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`search`|String|未知|未知|查询字符串<br/>|


### 响应

|描述|类型|
|---|---|
|转换后的查询字符串对象<br/>|Object|


### 示例
```javascript
import { getSearchString } from '@helper';
getSearchString('?a=1&b=2'); // -> { a: '1', b: '2' }
```

<br>

## Function setSearchString


语法：**setSearchString**(*searchObj*: `Object`): `String`

描述：转换对象为查询字符串

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`searchObj`|Object|未知|未知|对象格式参数<br/>|


### 响应

|描述|类型|
|---|---|
|返回查询字符串<br/>|String|

<br>

## Function getAppLanguage


语法：**getAppLanguage**(): 

描述：获取 APP 语言
<br>

## Function timeoutPromise


<br>

## Function aesEncrypt


<br>

## Function aesDecrypt


<br>

## Function getUuid


语法：**getUuid**(*len*: `Number`): `String`

描述：生成唯一码

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`len`|Number|未知|未知|生成唯一码长度，默认 32<br/>|


### 响应

|描述|类型|
|---|---|
|uuid<br/>|String|

<br>

## Function judgeAppOS


语法：**judgeAppOS**(): `String`

描述：判断APP当前所属 OS 环境

### 响应

|描述|类型|
|---|---|
|ios / android / undefined<br/>|String|

<br>

## Function judgeAppVersion


语法：**judgeAppVersion**(*supportVersion*: `Object|undefined`): `boolean`

描述：根据支持版本，判断APP版本

### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`supportVersion`|Object/undefined|未知|未知|{ ios: '2.2.0', android: '2.3.0' }<br/>|


### 响应

|描述|类型|
|---|---|
|返回布尔值，是否当前版本支持<br/>|boolean|

<br>
