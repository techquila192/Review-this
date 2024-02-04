const mongoose = require("mongoose")
const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    github_url: {
        type: String,
        required:true
    },
    fork_url: String,
    description: String,
    startDate: Date,
    endDate: Date,
    active: String,             //active,inactive or in_progress
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviewer"
    },
})
module.exports = mongoose.model("Project",projectSchema)