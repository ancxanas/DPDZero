const jwt = require("jsonwebtoken")
const logger = require("./logger")
const SECRET = require("./config").SECRET
const prisma = require("../db/prisma")

const tokenExtractor = async (req, res, next) => {
  const authorization = await req.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    req.token = authorization.replace("Bearer ", "")
  }

  next()
}

const userExtractor = async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, SECRET)

  if (!decodedToken.id) {
    throw Error("INVALID_TOKEN")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: decodedToken.id,
    },
  })

  const { password: omitted, ...userDetails } = user

  req.user = userDetails

  next()
}

const unknownEndpoint = (req, res) => {
  return res.status(404).json({
    status: "error",
    code: "NOT_FOUND",
    message: "Requested resource was not found",
  })
}

const errorHandler = (err, req, res, next) => {
  logger.info(err)

  if (
    (err.name === "PrismaClientValidationError" &&
      err.message.includes(
        "`full_name` is missing" ||
          "`password` is missing" ||
          "`email` is missing" ||
          "`username` is missing"
      )) ||
    err.message === "INVALID_REQUEST"
  ) {
    res.status(400).json({
      status: "error",
      code: "INVALID_REQUEST",
      message:
        "Invalid request. Please provide all required fields: username, email, password, full_name.",
    })
  } else if (
    (err.name === "PrismaClientValidationError" &&
      err.message.includes("`key` is missing")) ||
    err.message === "INVALID_KEY"
  ) {
    res.status(400).json({
      status: "error",
      code: "INVALID_KEY",
      message: "The provided key is not valid or missing.",
    })
  } else if (
    (err.name === "PrismaClientValidationError" &&
      err.message.includes("`value` is missing")) ||
    err.message === "INVALID_VALUE"
  ) {
    res.status(400).json({
      status: "error",
      code: "INVALID_VALUE",
      message: "The provided value is not valid or missing.",
    })
  } else if (err.message === "GENDER_REQUIRED") {
    return res.status(400).json({
      status: "error",
      code: "GENDER_REQUIRED",
      message:
        "Gender field is required. Please specify the gender (e.g., male, female, non-binary).",
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
  } else if (
    err.name === "PrismaClientKnownRequestError" &&
    err.code === "P2002" &&
    err.meta.target[0] === "key"
  ) {
    res.status(400).json({
      status: "error",
      code: "KEY_EXISTS",
      message:
        "The provided key already exists in the database. To update an existing key, use the update API.",
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
  } else if (
    err.name === "JsonWebTokenError" ||
    err.message === "INVALID_TOKEN"
  ) {
    return res.status(401).json({
      status: "error",
      code: "INVALID_TOKEN",
      message: "Invalid access token provided",
    })
  } else if (err.message === "KEY_NOT_FOUND") {
    return res.status(404).json({
      status: "error",
      code: "KEY_NOT_FOUND",
      message: "The provided key does not exist in the database.",
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

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
}
