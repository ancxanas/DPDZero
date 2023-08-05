const express = require("express")
require("express-async-errors")

const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const config = require("./utils/config")

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

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
