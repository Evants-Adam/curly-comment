const { ObjectId } = require('mongodb');
const { getDb } =  require('../config/mongodb');
const { hashPassword } = require('../helpers/hash');
const collectionName = 'users';

class User {
  static createUser (data) {
    const username = data.username.toLowerCase();
    const email = data.email.toLowerCase();
    const password = hashPassword(data.password);

    return getDb().collection(`${collectionName}`).insertOne({
      username, email, password, role: 'User'
    });
  };

  static checkEmail (email) {
    let emailCheck = email.toLowerCase();
    return getDb().collection(`${collectionName}`).find({ email: { $regex : emailCheck, $options : 'i' } }, { password: 0 }).toArray();
  };

  static checkUsername (username) {
    let usernameCheck = username.toLowerCase();
    return getDb().collection(`${collectionName}`).find({ username:  { $regex : usernameCheck, $options : 'i' } }, { password: 0 }).toArray();
  };

  static findOneUser (email) {
    let emailCheck = email.toLowerCase();
    return getDb().collection(`${collectionName}`).find({   email: { $regex : emailCheck, $options : 'i' } }).toArray();
  };
};

module.exports = User;