const Decrypt = require('../models/decrypt/decrypt');

module.exports.getDecryption = function (appID, sessionKey, encryptedData, iv) {
  return Decrypt.data(appID, sessionKey, encryptedData, iv);
};
