const WXBizDataCrypt = require('./WXBizDataCrypt');

class Decrypt {
  constructor(appID, sessionKey, encryptedData, iv) {
    this.appID = appID;
    this.sessionKey = sessionKey;
    this.encryptedData = encryptedData;
    this.iv = iv;
  }

  static data(appID, sessionKey, encryptedData, iv) {
    const pc = new WXBizDataCrypt(appID, sessionKey);
    return pc.decryptData(encryptedData, iv);
  }
}

module.exports = Decrypt;
