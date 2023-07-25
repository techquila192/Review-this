const mongoose = require("mongoose")
const reviewerSchema = mongoose.Schema({
    github:{
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("Reviewer",reviewerSchema)