const dataRouter = require("express").Router()
const prisma = require("../db/prisma")
const userExtractor = require("../utils/middleware").userExtractor

dataRouter.get("/:key", userExtractor, async (req, res) => {
  const key = req.params.key

  const found = await prisma.data.findUnique({
    where: {
      key,
    },
  })

  if (!found) {
    throw Error("KEY_NOT_FOUND")
  }

  const successResponse = {
    status: "success",
    data: {
      key,
      value: found.value,
    },
  }

  res.json(successResponse)
})

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

  return res.status(201).json(successResponse)
})

module.exports = dataRouter
