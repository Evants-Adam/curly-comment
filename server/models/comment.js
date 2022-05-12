const { ObjectId } = require('mongodb');
const { getDb } =  require('../config/mongodb');
const collectionName = 'comments';

class Comment {
  static async getAllComments () {
    const allComments = await getDb().collection(`${collectionName}`).find().toArray();
    
    const newAllComments = await Promise.all(allComments.map(async (el) => {
      const user = await getDb().collection(`users`).find({ "_id": ObjectId(el.UserId) }, { projection: { "_id": 0, password: 0 } }).toArray();
      
      return { ...el, User: { ...user[0] } };
    }));

    return newAllComments;
  };

  static async findOneComment (data) {
    const comment = await getDb().collection(`${collectionName}`).find({ "_id": ObjectId(data) }).toArray();

    const newComment = await Promise.all(comment.map(async (el) => {
      const user = await getDb().collection(`users`).find({ "_id": ObjectId(el.UserId) },{ projection: { "_id": 0, password: 0 } }).toArray();
      
      return { ...el, User: { ...user[0] } };
    }));

    return newComment;
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