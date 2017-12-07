const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest: './mongodb/db' });

const getDecryptions = require('../services/decrypt/decrypt_service');
const mongo = require('../services/mongoose/mongodb_user');
const files = require('../services/file_operation/file_operation');

router.get('/', (req, res) => {
  res.send('what???');
});

/**
 * 对收到的签名加密数据进行解密 返回用户明文信息
 * 传入参数 appID sessionKey encryptedData iv
 */
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
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * 客户端每次提交create请求 则会在数据库创建一个对象 用于存储文章的标题内容等等
 * 传入参数 openId
 */
router.post('/create', (req, res) => {
  (async () => {
    // 根据openId查询workId 如果已经存在则workId++ 不存在则从1开始
    const user = await mongo.getUserByOpenid(req.body.openId);
    let worksId = user.works.length;
    if (user.works.length) {
      worksId = user.works.length++;
      const datas = {
        title: '',
        main: '',
        fontsize: 14,
        color: '#353535',
        worksId: worksId,
      };
      const created = await mongo.getUserByOpenidAndCreate(req.body.openId, datas);
      return created;
    } else {
      const datas = {
        title: '',
        main: '',
        fontsize: 14,
        color: '#353535',
        worksId: 0,
      };
      const created = await mongo.getUserByOpenidAndCreate(req.body.openId, datas);
      return created;
    }
  })()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * 每次提交sub请求 则会将用户传入的数据存入数据库
 * 传入参数 openId worksId works
 */
router.post('/sub', upload.single('file'), (req, res) => {
  (async () => {
    // 如果有上传的文件则整理存储文件 没有则正常存储内容
    if (req.file) {
      // 上传文件需要客户端在header内加入键firstanddelete 如果此键值为1 则表明为第一次上传 将删除对应目录下所有文件 防止重复 值为1时则正常上传
      if (req.headers.firstanddelete === '1') {
        const filesUrl = `mongodb/db/${req.body.openId}/${req.body.worksId}`;
        await files.deleteall(filesUrl);
        await mongo.getUserByOpenidAndUpdate(req.body.openId, req.body.worksId, req.body.works, 'image', true);
        await mongo.getUserByOpenidAndUpdate(req.body.openId, req.body.worksId, req.body.works, 'tape', true);
      }
      const file = await mongo.getFiles(req.body.openId, req.body.worksId, req.file.originalname, req.file.path, req.file.mimetype);
      return file;
    } else {
      const user = await mongo.getUserByOpenidAndUpdate(req.body.openId, req.body.worksId, req.body.works);
      return user;
    }
  })()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * 编辑文章时需要下载图片/录音等文件
 * 传入参数 openId worksId filepath (header)
 */
router.get('/download', (req, res) => {
  (async () => {
    // 先根据openId worksId查到文件的数组 如果有相应数据则返回文件
    const user = await mongo.getUserByOpenidAndWorksid(req.headers.openid, req.headers.worksid);
    return user;
  })()
    .then((r) => {
      if (r) {
        const path = `./${req.headers.filepath.split(',')[1]}`;
        const name = path.substr(-17);
        res.download(path, name, (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        res.send('have no access');
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * 查询指定openId的works内容
 * 传入参数 openId worksId
 */
router.post('/getworks', (req, res) => {
  (async () => {
    const user = await mongo.getUserByOpenidAndWorksid(req.body.openId, req.body.worksId);
    return user;
  })()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * 查询指定openId的内容
 * 传入参数 openId
 */
router.post('/getuserbyopenid', (req, res) => {
  (async () => {
    const user = await mongo.getUserByOpenid(req.body.openId);
    return user;
  })()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * 查询指定nickName的内容
 * 传入参数 nickName
 */
router.post('/getuserbynickname', (req, res) => {
  (async () => {
    const user = await mongo.getUserByNickname(req.body.nickName);
    return user;
  })()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

/**
 * 查询所有用户信息
 */
router.post('/getallusers', (req, res) => {
  (async () => {
    const users = await mongo.getAllUsers();
    return users;
  })()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
