@en
## FileObj

### Base properties

|Name|Description|
|-|-|
|name|File name|
|file|Original file object|
|size|File size|
|type|File type|
|index|File index|
|uid|File id|
|percent||
|status|File state|
|abort|A function for canceling uploading|
|state|File state, init/uploading/error/success|
|response|Uploading response|
|error|Uploading error|

### Optional properties

|Name|Description|
|-|-|
|url|Uploading interface|
|data|Data filed|
|headers|Request headers|
|withCredentials|Whether uploading with `cookie`|
|onProgress|Callback for uploading|
|onError|Callback for error|
|onSuccess|Callback for successful|

@cn
## 文件对象

### 基础属性

|名称|说明|
|-|-|
|file|原始文件对象|
|name|文件名称|
|size|文件大小|
|type|文件类型|
|index|文件的序号|
|uid|文件id|
|percent|文件上传进度|
|status|文件状态|
|abort|用于取消上传的函数|
|state|文件状态，init/uploading/error/success|
|response|文件上传响应|
|error|文件上传错误|

### 可选属性

|名称|说明|
|-|-|
|url|上传接口|
|data|数据域|
|headers|请求头|
|withCredentials|是否传送`cookie`|
|onProgress|上传时回调|
|onError|上传出错回调|
|onSuccess|上传成功回调|
