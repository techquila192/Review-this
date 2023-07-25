const Router = require('express').Router();
const userRoute = require("./user_register.route")

Router.use("/", userRoute)

module.exports = Router;