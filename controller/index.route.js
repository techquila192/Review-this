const Router = require('express').Router();
const userRoute = require("./user_manager.route.js")
const userRegisterRoute = require("./user_register.route.js")
const reviewerRegisterRoute = require("./reviewer_register.route.js")
const reviewerRoute=require("./reviewer_manager.route.js")
const projectRoute=require("./project_manager.route.js")
const webhookRoute = require("./webhook.route.js")

Router.use("/", userRegisterRoute)
Router.use("/", reviewerRegisterRoute)
Router.use("/", userRoute)
Router.use("/", reviewerRoute)
Router.use("/", projectRoute)
Router.use("/", webhookRoute)

module.exports = Router;