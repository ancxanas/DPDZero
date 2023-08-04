const tokenRouter = require("express").Router()
const prisma = require("../db/prisma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = require("../utils/config").SECRET

tokenRouter.post("/", async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw Error("MISSING_FIELDS")
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    throw Error("INVALID_CREDENTIALS")
  }

  const userForToken = {
    id: user.id,
    username: user.username,
  }

  const token = jwt.sign(userForToken, SECRET, {
    expiresIn: 60 * 60,
  })

  const successResponse = {
    status: "success",
    message: "Access token generated successfully",
    data: {
      access_token: token,
      expires_in: 3600,
    },
  }

  res.status(200).json(successResponse)
})

module.exports = tokenRouter
