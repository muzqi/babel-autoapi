

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

```javascript
const a = new A('muzi');
```


### 实例属性

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string\|"test"|unknown|unknown|this is name<br/>|
|`age`|unknown|unknown|unknown|this is age<br/>|


### 类方法


#### Function sayHi

> @author: muzi<br/>

语法：**sayHi**(*age*: `number`): `void`

描述：sayHi

##### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`age`|number|unknown|unknown|年龄<br/>|


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
```javascript
const a = new A();
const name = a.getName();
```

<br>
