const { ObjectId } = require('mongodb');
const { getDb } =  require('../config/mongodb');
const { hashPassword } = require('../helpers/hash');
const collectionName = 'users';

class User {
  static createUser (data) {
    const { username, email } = data;
    const password = hashPassword(data.password);

    return getDb().collection(`${collectionName}`).insertOne({
      username, email, password, role: 'User'
    });
  };

  static checkEmail (email) {
    return getDb().collection(`${collectionName}`).find({ email }).toArray();
  };

  static checkUsername (username) {
    let usernameCheck = username.toLowerCase();
    return getDb().collection(`${collectionName}`).find({ username:  { $regex : usernameCheck, $options : 'i' } }).toArray();
  }
};

module.exports = User;