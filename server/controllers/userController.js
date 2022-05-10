const { comparePassword } = require('../helpers/hash');
const User = require('../models/user');

class UserController {
  static async createUser (req, res, next) {
    try {
      const { username, email, password } = req.body;

      // Start of Input validation
      if (!username || !email || !password) throw ({ name: 'RegisterBadRequest' });

      if (!email.includes('@')) throw ({ name: 'EmailNotValid' });

      const checkResultUsername = await User.checkUsername(username);
      if (checkResultUsername.length !== 0) throw ({ name: "UsernameIsUsed" });
      
      const checkResultEmail = await User.checkEmail(email);
      if (checkResultEmail.length !== 0) throw ({ name: "EmailIsUsed" });
      // End of Input validation

      const register = await User.createUser({ username, email, password });

      res.status(201).json(register);
    } catch (error) {
      next(error)
    }
  };

  static async loginUser (req, res, next) {
    try {
      const { email, password } = req.body;

      // Start of Input validation
      if (!email || !password) throw ({ name: 'LoginBadRequest' });
    } catch (error) {
      next(error)
    }
  }
};

module.exports = UserController;