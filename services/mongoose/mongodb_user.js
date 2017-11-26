const User = require('../../models/mongoose/user');

async function addNewUser(data) {
  const user = await User.insert(data);
  return user;
}

async function getUserByOpenid(id) {
  const user = await User.getOneByOpenid(id);
  return user;
}

async function getUserByOpenidAndUpdate(id, datas) {
  const user = await User.getOneByOpenidAndUpdate(id, datas);
  return user;
}

async function getUserByNickname(name) {
  const user = await User.getOneByNickname(name);
  return user;
}

async function getAllUsers() {
  const users = await User.list();
  return users;
}

module.exports = {
  addNewUser,
  getUserByOpenid,
  getUserByOpenidAndUpdate,
  getUserByNickname,
  getAllUsers,
};
