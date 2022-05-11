const { ObjectId } = require('mongodb');
const { getDb } =  require('../config/mongodb');
const collectionName = 'comments';

class Comment {
  static getAllComments () {
    return getDb().collection(`${collectionName}`).find().toArray();
  };

  static findOneComment (data) {
    return getDb().collection(`${collectionName}`).find({ "_id": ObjectId(data) }).toArray();
  };

  static createComment (data) {
    const { message, tag, UserId } = data;

    return getDb().collection(`${collectionName}`).insertOne({
      message, tag, UserId
    });
  };

  static editComment (data) {
    const { id, message, tag } = data;

    return getDb().collection(`${collectionName}`).updateOne({ "_id": ObjectId(id) }, {
      $set: 
        { message: message, tag: tag }
    });
  };

  static deleteComment (data) {
    const { id } = data;

    return getDb().collection(`${collectionName}`).deleteOne({ "_id": ObjectId(id) })
  }

};

module.exports = Comment;