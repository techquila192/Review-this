const mongoose = require("mongoose")
const deliverySchema = mongoose.Schema({
type: {
    type: String,
    required: true
},
timestamp : {
    type: Date,
    required: true
},
message : String,
projectID : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
},
user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
},
reviewer : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviewer"
}
})

module.exports = mongoose.model("Delivery",deliverySchema)