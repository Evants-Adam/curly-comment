const UserController = require('../controllers/userController');
const router = require('express').Router();

// *Available API*
router.get('/', (req, res) => res.send('Hallo'))
router.post('/user/register', UserController.createUser)

module.exports = router;