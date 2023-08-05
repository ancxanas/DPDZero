const dataRouter = require("express").Router()
const prisma = require("../db/prisma")
const userExtractor = require("../utils/middleware").userExtractor

dataRouter.post("/", userExtractor, async (req, res) => {
  const { key, value } = req.body

  if (!key) {
    throw Error("INVALID_KEY")
  }

  if (!value) {
    throw Error("INVALID_VALUE")
  }

  await prisma.data.create({
    data: {
      key,
      value,
    },
  })

  const successResponse = {
    status: "success",
    messag: "Data stored successfully",
  }

  return res.json(successResponse)
})

module.exports = dataRouter
