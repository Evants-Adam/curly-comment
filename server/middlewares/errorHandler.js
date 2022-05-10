function errorHandler (err, req, res, next) {
  let code, messages;

  switch (err.name) {
    case 'RegisterBadRequest':
      code = 400;
      messages = "Please fill in all fields";
      break;
    case 'EmailNotValid':
      code = 400;
      messages = "Invalid email format";
      break;
    case 'LoginBadRequest':
      code = 400;
      messages = "Invalid email or password";
      break;
    case 'EmailIsUsed':
      code = 409;
      messages = "Email has been used by other user";
      break;
    case 'UsernameIsUsed':
      code = 409;
      messages = "Username has been taken by other user";
      break;
    default:
      code = 500;
      messages = "Internal Server Error";
      break;
  }
  console.log(err)

  res.status(code).json({ message: messages });
}

module.exports = errorHandler;