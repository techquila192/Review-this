const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    github: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("User",userSchema)