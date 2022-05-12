const User = require('../models/user');
const { comparePassword } = require('../helpers/hash');
const { signToken } = require('../helpers/jwt');

class UserController {
  static async getProfile (req, res, next) {
    try {
      res.status(200).json(req.user)
    } catch (error) {
      next(error)
    }
  };

  static async createUser (req, res, next) {
    try {
      const { username, email, password } = req.body;

      // Start of Inputs validation
      if (!username || !email || !password) throw ({ name: 'RegisterBadRequest' });

      if (!email.includes('@')) throw ({ name: 'EmailNotValid' });

      const checkResultUsername = await User.checkUsername(username);
      if (checkResultUsername.length !== 0) throw ({ name: "UsernameIsUsed" });
      
      const checkResultEmail = await User.checkEmail(email);
      if (checkResultEmail.length !== 0) throw ({ name: "EmailIsUsed" });
      // End of Inputs validation

      const register = await User.createUser({ username, email, password });

      res.status(201).json(register);
    } catch (error) {
      next(error)
    }
  };

  static async loginUser (req, res, next) {
    try {
      const { email, password } = req.body;

      // Start of Inputs validation
      if (!email || !password) throw ({ name: 'LoginBadRequest' });

      const checkUser = await User.findOneUser(email);
      if (checkUser.length === 0) throw ({ name: 'LoginBadRequest' });
      
      const verifyPassword = comparePassword(password, checkUser[0].password);
      if (!verifyPassword) throw ({ name: 'LoginBadRequest' });
      // End of Inputs validation

      // Sign JWT
      const accessToken = signToken ({ email: checkUser[0].email });

      res.status(200).json({ access_token: accessToken })
    } catch (error) {
      next(error)
    }
  }
};

module.exports = UserController;