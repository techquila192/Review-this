const express = require("express")
const app = express()
const port = 3000
const indexRoute = require("./controller/index.route")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Home route")
})


app.use("/api", indexRoute)


app.listen(port, async () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {console.log("Connected to database")})
    console.log(`Server is running on port ${port}`)
})