const express = require("express")
const app = express()
const port = 5000
const dotenv = require("dotenv").config()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
exports.io = io;
const indexRoute = require("./controller/index.route")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const clientID=process.env.GITHUB_CLIENT_ID;
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.json())

app.get("/", (req, res) => {
    res.render('server.ejs',{client_id: clientID, origin: req.protocol + '://' + req.get('host')});
    
    //res.send("Home route")
})


app.use("/api", indexRoute)


server.listen(port, async () => {
    await mongoose.connect(process.env.MONGO_URL).then(() => {console.log("Connected to database")})
    console.log(`Server is running on port ${port}`)
})

