const express = require("express")
require("express-async-errors")

const middleware = require("./utils/middleware")

const usersRouter = require("./controllers/users")
const tokenRouter = require("./controllers/token")
const dataRouter = require("./controllers/data")

const app = express()

app.use(middleware.tokenExtractor)

app.use(express.json())

app.use("/api/register", usersRouter)
app.use("/api/token", tokenRouter)
app.use("/api/data", dataRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
