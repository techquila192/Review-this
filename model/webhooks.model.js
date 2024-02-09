const mongoose = require("mongoose")
const HookSchema = mongoose.Schema({
    hook_id: {
        type:String,
        required:true
    },
    projectID: {
        type:String, 
        required:true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Reviewer",
        required:true
    }

})

module.exports = mongoose.model("Webhooks",HookSchema)
