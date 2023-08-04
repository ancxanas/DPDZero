const logger = require("./logger")

const errorHandler = (err, req, res, next) => {
  logger.info(err)

  if (err.message === "GENDER_REQUIRED") {
    return res.status(400).json({
      status: "error",
      code: "GENDER_REQUIRED",
      message:
        "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
    })
  } else if (err.name === "PrismaClientValidationError") {
    res.status(400).json({
      status: "error",
      code: "INVALID_REQUEST",
      message:
        "Invalid request. Please provide all required fields: username, email, password, full_name.",
    })
  } else if (err.message === "INVALID_PASSWORD") {
    return res.status(400).json({
      status: "error",
      code: "INVALID_PASSWORD",
      message:
        "The provided password does not meet the requirements. Password must be at least 8 characters long and contain a mix of uppercase and lowercase letters, numbers, and special characters.",
    })
  } else if (err.message === "INVALID_AGE") {
    return res.status(400).json({
      status: "error",
      code: "INVALID_AGE",
      message: "Invalid age value. Age must be a positive integer.",
    })
  } else if (
    err.name === "PrismaClientKnownRequestError" &&
    err.code === "P2002" &&
    err.meta.target[0] === "email"
  ) {
    return res.status(400).json({
      status: "error",
      code: "EMAIL_EXISTS",
      message:
        "The provided email is already registered. Please use a different email address.",
    })
  } else if (
    err.name === "PrismaClientKnownRequestError" &&
    err.code === "P2002" &&
    err.meta.target[0] === "username"
  ) {
    return res.status(400).json({
      status: "error",
      code: "USERNAME_EXISTS",
      message:
        "The provided username is already taken. Please choose a different username.",
    })
  } else if (err.message === "MISSING_FIELDS") {
    return res.status(400).json({
      status: "error",
      code: "MISSING_FIELDS",
      message: "Missing fields. Please provide both username and password.",
    })
  } else if (err.message === "INVALID_CREDENTIALS") {
    return res.status(400).json({
      status: "error",
      code: "INVALID_CREDENTIALS",
      message:
        "Invalid credentials. The provided username or password is incorrect",
    })
  } else {
    res.status(500).json({
      status: "error",
      code: "INTERNAL_SERVER_ERROR",
      message: "An internal server error occurred. Please try again later.",
    })
  }

  next(err)
}

module.exports = { errorHandler }
