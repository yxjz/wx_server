# wx_server
### post请求 

##### 1. /decrypt

###### 请求体内容appID sessionKey encryptedData iv

根据openId判断是否已经存在用户，不存在将添加用户信息至数据库

##### 2. /:openId/sub

###### 请求体内容 openId datas

根据openId查找到数据库相应用户 并更新改用户的相应数据datas

##### 3. /getuserbyopenid

###### 请求体内容 openId

根据openId查找到数据库相应用户并返回用户信息

##### 4. /getuserbynickname

###### 请求体内容 nickName

根据nickName查找到数据库相应用户并返回所有符合条件的用户信息（可能重复）

##### 5. /getallusers

返回所有用户信息