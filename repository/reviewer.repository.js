const reviewer = require("../model/reviewer.model")
const project = require("../model/project.model")
const reviewerFunctions = {
    addReviewer : async (github)=>{
        const newReviewer = new reviewer({
            github: github
        })
        return await newReviewer.save()
    },
    getReviewer : async (github)=>{
        const result = await reviewer.findOne({github:github})
        return result
    },
    getAllReviewer : async ()=>{
        const result = await reviewer.find()
        return result
    },
    updateReviewer : async (github,newGithub)=>{
        const result = await reviewer.updateOne({github:github},{$set:{github:newGithub}
        })
        return result
    },
    deleteReviewer : async (github)=>{
        const result = await reviewer.deleteOne({github:github})
        return result
    },
    insertReviewer : async (reviewer_github , project_id)=>{
        const reviewer = await reviewer.findOne({github:reviewer_github})
        const project = await project.findOneAndUpdate({_id:project_id}, {$set:{reviewer:reviewer._id}})
        return result
    },
}
module.exports = reviewerFunctions