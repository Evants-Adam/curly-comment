const Comment = require('../models/comment');

class CommentController {
  static async getAllComments (req, res, next) {
    try {
      const comments = await Comment.getAllComments();

      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  };

  static async getOneComment (req, res, next) {
    try {
      const { id } = req.params;

      const comment = await Comment.findOneComment(id)
      if (comment.length === 0) throw ({ name: "CommentNotFound" });

      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };

  static async createComment (req, res, next) {
    try {
      const { message, tag } = req.body;

      // Start of Inputs validation
      if (!message) throw ({ name: "MessageBadRequest" });
      if (!tag) throw ({ name: "TagBadRequest"});
      // End of Inputs validation

      const postComment = await Comment.createComment({ message, tag, UserId: req.user.id });
  
      res.status(201).json(postComment);
    } catch (error) {
      next(error);
    }
  };

  static async deleteComment (req, res, next) {
    try {
      const { id } = req.params;

      // Start of Inputs validation
      const checkComment = await Comment.findOneComment(id);
      if (checkComment.length === 0) throw ({ name: "CommentNotFound" });

      if (req.user.role !== "Admin" && checkComment[0].UserId.toString() !== req.user.id.toString()) throw ({ name: "Forbidden" });
      // End of Inputs validation

      const deleteComment = await Comment.deleteComment({ id })

      res.status(201).json({ message: "Comment has been deleted successfully" })
    } catch (error) {
      next(error)
    }
  }

  static async editComment (req, res, next) {
    try {
      const { id } = req.params;
      const { message, tag } = req.body;

      // Start of Inputs validation
      const checkComment = await Comment.findOneComment(id);
      if (checkComment.length === 0) throw ({ name: "CommentNotFound" });

      if (req.user.role !== "Admin" && checkComment[0].UserId.toString() !== req.user.id.toString()) throw ({ name: "Forbidden" });

      if (!message) throw ({ name: "MessageBadRequest" });
      if (!tag) throw ({ name: "TagBadRequest"});
      // End of Inputs validation

      const editComment = await Comment.editComment({ id, message, tag, UserId: req.user.id });

      res.status(201).json({ message: "Comment has been edited successfully" });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = CommentController;