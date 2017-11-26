const express = require('express');

const router = express.Router();

const getDecryptions = require('../services/decrypt/decrypt_service');
const mongo = require('../services/mongoose/mongodb_user');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/openid', (req, res) => {
  // 获取到用户唯一标识openid 并返回
  res.send(req.body.datas);
});

router.post('/decrypt', (req, res) => {
  (async () => {
    // post得到appID sessionKey encryptedData iv，然后调用解密并返回解密的信息
    const after = await getDecryptions.getDecryption(
      req.body.appId,
      req.body.sessionKey,
      req.body.encryptedData,
      req.body.iv,
    );
    // 获取到解密后的信息after 并将after存入数据库
    const user = await mongo.getUserByOpenid(after.openId);
    if (user) return new Error('已经存在用户');
    return mongo.addNewUser(after);
  })()
    .then((r) => {
      console.log(r);
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/:openId/sub', (req, res) => {
  console.log(req.params.openId);
  console.log(req.body);
  (async () => {
    const sub = await mongo.getUserByOpenidAndUpdate(req.params.openId, req.body.datas);
    return sub;
  })()
    .then((r) => {
      console.log(r);
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/getuserbyopenid', (req, res) => {
  (async () => {
    const user = await mongo.getUserByOpenid(req.body.openId);
    return user;
  })()
    .then((r) => {
      console.log(`res ${r}`);
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/getuserbynickname', (req, res) => {
  (async () => {
    const user = await mongo.getUserByNickname(req.body.nickName);
    return user;
  })()
    .then((r) => {
      console.log(r);
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.post('/getallusers', (req, res) => {
  (async () => {
    const users = await mongo.getAllUsers();
    return users;
  })()
    .then((r) => {
      console.log(r);
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
