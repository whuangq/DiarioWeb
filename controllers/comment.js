const { Comment } = require('../models');

class CommentController {
  async index(req, res, next) {
    try {
      const postId = req.params.postId;
      const comments = await Comment.findAll({
        where: {
          postId: postId,
        },
      });
      res.render('comments/index', { title: 'Comentarios', comments });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const postId = req.params.postId;
      await Comment.create({
        text: req.body.text,
        email: req.body.email,
        postId: postId,
      });
      res.redirect(`/posts/${postId}/comments`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
