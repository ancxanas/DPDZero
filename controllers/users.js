const usersRouter = require("express").Router()
const prisma = require("../db/prisma")
const bcrypt = require("bcrypt")
const checkPassword = require("../utils/helper").checkPassword

usersRouter.post("/", async (req, res) => {
  const { username, email, password, full_name, age, gender } = req.body

  if (!email || !password || !full_name || !username) {
    throw Error("INVALID_REQUEST")
  }

  if (!checkPassword(password)) {
    throw Error("INVALID_PASSWORD")
  }

  if (age <= 0) {
    throw Error("INVALID_AGE")
  }

  if (!gender || gender === "") {
    throw Error("GENDER_REQUIRED")
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: passwordHash,
      full_name,
      age,
      gender,
    },
  })

  const { password: omitted, ...newUser } = user

  const successResponse = {
    status: "success",
    message: "User successfully registered",
    data: newUser,
  }

  return res.status(201).json(successResponse)
})

module.exports = usersRouter
