const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
    sender : String,
    receiver : String,
    projectID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
        required:true
    },
    message : String
})

module.exports = mongoose.model("Chat",chatSchema)