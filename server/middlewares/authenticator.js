const { verifyToken } = require('../helpers/jwt');
const User = require('../models/user');

async function authenticator (req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw ({ name: 'MissingAccessToken' });

    const { email } = verifyToken(access_token);
    
    // *Find User with matched email
    const checkUser = await User.findOneUser(email);
    if (checkUser === 0) throw ({ name: 'InvalidToken' })

    req.user = { 
      id: checkUser[0]._id,
      username: checkUser[0].username,
      email: checkUser[0].email, 
      role: checkUser[0].role 
    };
    
    next();
  } catch (error) {
    next(error)
  }
}

module.exports = authenticator;