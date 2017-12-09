const rp = require('request-promise');

async function httpsRequest(appid, secret, code, next) {
  const data = {
    appid: appid,
    secret: secret,
    js_code: code,
    grant_type: 'authorization_code',
  };

  const options = {
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: data,
  };

  const result = await rp(options)
    .then((r) => {
      return r;
    })
    .catch((e) => {
      next(e);
    });
  return result;
}

module.exports = { httpsRequest };
