
# class.ts


## Class A

> @author: muzi<br/>

描述：A 类方法


 

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string|未知|未知|this is name<br/>|
|`opt`|object|未知|未知|配置参数<br/>|

<br>

描述：opt 配置参数


 

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`merge`|boolean|未知|未知|是否合并<br/>|

<br>

```javascript
const a = new A('muzi');
```


### 实例属性

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string|未知|未知|this is name<br/>|
|`age`|未知|未知|未知|this is age<br/>|

<br>


### 类方法


#### Function sayHi

> @author: muzi<br/>

语法：**sayHi**(*name*: `string`): `void`

描述：sayHi


##### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string|未知|未知|名字<br/>|

<br>


##### 响应

|描述|类型|
|---|---|
|无任何响应<br/>|void|

<br/>

<br>

#### Function getName


语法：**getName**(): `string`

描述：获取 name


##### 响应

|描述|类型|
|---|---|
|name<br/>|string|

<br/>


##### 示例
```javascript
const a = new A();
const name = a.getName();
```

<br>

# function.ts

## Function sayHi

> @author: muzi<br/>

语法：**sayHi**(*name*: `string`, *age*: `number`, *b*: `boolean`): `void`

描述：sayHi


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string|未知|未知|this is name<br/>|
|`age`|number|未知|未知|this is age<br/>|
|`b`|boolean|未知|未知|这是一个布尔值<br/>|

<br>


### 示例
```javascript
sayHi('muzi'); // -> muzi
```

<br>

# interface.ts


## Interface BarI

> @author: muzi<br/>

描述：A interface


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|string|false|false|test<br/>托尔斯泰<br/>|
|`age`|number,string|true|false||
|`id`|string|true|true||
|`propName: string`|any|true|false||

<br>

## Interface Fn


语法：**Fn**(*age*: `number`, *name?*: `string`): `void`

描述：Fn


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`age`|number|true|false|年龄<br/>|
|`name`|string|false|false|名称<br/>|

<br>


### 响应

|描述|类型|
|---|---|
|无<br/>|void|

<br/>


### 示例
```javascript
fn(18, 'muzi');
```

<br>


## Type Name

> @author: muzi<br/>

描述：定义名称


类型：string,number


<br/>

## Type Function SayHi

> @author: muzi<br/>

语法：**SayHi**(*name*: `TSTypeReference: Name`): `void`

描述：名字


### 参数

|属性|类型|是否必填|是否只读|描述|
|---|---|---|---|---|
|`name`|TSTypeReference: Name|true|false|1<br/>|

<br>


### 响应

|描述|类型|
|---|---|
|void<br/>|void|

<br/>

<br>
