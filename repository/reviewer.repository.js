const reviewer = require("../model/reviewer.model")
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
    }
}
module.exports = reviewerFunctions