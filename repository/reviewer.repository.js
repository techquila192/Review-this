const reviewer = require("../model/reviewer.model")
const project = require("../model/project.model")

const reviewerFunctions = {
    addReviewer : async (github)=>{
        const newReviewer = new reviewer({
            github: github
        })
        return await newReviewer.save()
    },
    getReviewerId : async (id)=>{
        const result = await reviewer.findOne({_id: id})
        return result
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
    getReviewerProject : async (github) =>{
        const result = await project.find({reviewer:(await reviewerFunctions.getReviewer(github))._id})
        return result
    }
}
module.exports = reviewerFunctions