const jwt = require('jsonwebtoken')
const io = require("../server.js").io

function authorization(req, res, next) {



    next();
}



module.exports = authorization;