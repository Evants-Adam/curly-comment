const CommentController = require('../controllers/commentController');
const UserController = require('../controllers/userController');
const router = require('express').Router();
const authenticator = require('../middlewares/authenticator');

// *Available API*
router.post('/register', UserController.createUser)
router.post('/login', UserController.loginUser)
router.get('/comments', CommentController.getAllComments);
router.get('/comments/:id', CommentController.getOneComment);

// Authenticator Middleware
router.use(authenticator);

// *Protected API*
router.post('/comments', CommentController.createComment);
router.put('/comments/:id', CommentController.editComment);
router.delete('/comments/:id', CommentController.deleteComment);

module.exports = router;