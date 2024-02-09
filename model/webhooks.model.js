const mongoose = require("mongoose")
const HookSchema = mongoose.Schema({
    hook_id: {
        type:String,
        required:true
    },
    projectID: {
        type:String, 
        required:true
    }

})

module.exports = mongoose.model("Webhooks",HookSchema)
