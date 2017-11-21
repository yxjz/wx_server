const express = require('express');

const router = express.Router();

const getDecryption = require('../services/decrypt_service');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/openid', (req, res) => {
  // 获取到用户唯一标识openid 并返回
  res.send(req.body.datas);
});

router.post('/decrypt', (req, res) => {
  // post得到appID sessionKey encryptedData iv，然后调用解密并返回解密的信息
  const after = getDecryption.getDecryption(req.body.appID, req.body.sessionKey, req.body.encryptedData, req.body.iv);
  res.send(after);
});

module.exports = router;
