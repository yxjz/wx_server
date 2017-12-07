### 微信小程序服务端实例

> 服务对象为微信小程序客户端，此实例为笔记小程序的服务端 因此提供简单笔记类app需要的接口

---

## ⊙ 接口简介

##### 1. /decrypt

- method: POST

- 对收到的签名加密数据进行解密 返回用户明文信息

- ###### 传入参数 appID sessionKey encryptedData iv

##### 2. /create

- method: POST

- 客户端每次提交create请求 则会在数据库创建一个对象 用于存储文章的标题内容等等

- ###### 传入参数 openId

##### 3./sub

- method: POST

- 每次提交sub请求 则会将用户传入的数据存入数据库

- ###### 传入参数 openId worksId works

##### 4./download

- method: GET

- 编辑文章时需要下载图片/录音等文件

- ###### 传入参数 openId worksId filepath (header)

##### 5./getworks

- method: POST

- 查询指定openId的works内容

- ###### 传入参数 openId worksId

##### 6./getuserbyopenid

- method: POST

- 查询指定openId的内容

- ###### 传入参数 openId

7./getuserbynickname

- method: POST

- 查询指定nickName的内容

- ###### 传入参数 nickName

##### 8./getallusers

- method: POST

- 查询所有用户信息