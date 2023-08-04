require("dotenv").config()

const PORT = process.env.PORT

const POSTGRES_URI = process.env.POSTGRES_URI

const SECRET = process.env.SECRET

module.exports = { PORT, POSTGRES_URI, SECRET }
