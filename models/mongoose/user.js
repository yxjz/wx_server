const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  openId: { type: String, required: true, index: 1 },
  nickName: { type: String, required: true, index: 1 },
  gender: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  language: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  watermark: { type: Object, required: true },
  datas: { type: Object, required: false },
});

const UserModel = mongoose.model('user', UserSchema);

// 存储用户数据
async function insert(user) {
  const created = await UserModel.create(user);
  return created;
}

// 根据openId查询
async function getOneByOpenid(id) {
  const user = await UserModel.findOne({ openId: id });
  return user;
}

// 根据openId查询并更新
async function getOneByOpenidAndUpdate(id, datas) {
  const user = await UserModel.findOneAndUpdate({ openId: id }, {datas: datas});
  return user;
}

// 根据nickName查询
async function getOneByNickname(name) {
  const user = await UserModel.findOne({ nickName: name });
  return user;
}

// 列出所有用户
async function list(params) {
  const match = {};
  const flow = UserModel.find(match);
  const users = await flow.exec();
  return users;
}

module.exports = {
  insert,
  getOneByOpenid,
  getOneByOpenidAndUpdate,
  getOneByNickname,
  list,
};
