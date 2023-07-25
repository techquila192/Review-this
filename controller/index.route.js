const Router = require('express').Router();
const userRoute = require("./user_register.route.js")
const reviewerRoute=require("./reviewer_register.route.js")

Router.use("/", userRoute)
Router.use("/",reviewerRoute)

module.exports = Router;