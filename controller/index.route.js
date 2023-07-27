const Router = require('express').Router();
const userRoute = require("./user_register.route.js")
const reviewerRoute=require("./reviewer_register.route.js")
const projectRoute=require("./project_manager.route.js")

Router.use("/", userRoute)
Router.use("/",reviewerRoute)
Router.use("/",projectRoute)

module.exports = Router;