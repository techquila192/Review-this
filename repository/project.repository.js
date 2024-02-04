const user = require("../model/user.model")
const reviewer = require("../model/reviewer.model")
const project = require("../model/project.model")

const projectFunctions= {
    addReviewer : async (reviewer_github,project_id)=>{
        const reviewer_ref= await reviewer.findOne({github:reviewer_github})
        const result = await project.findOneAndUpdate({_id:project_id}, {$set:{reviewer:reviewer_ref._id}})
        return result
    },
    addProject : async(name , description , startDate , endDate , projectManager, github_url)=>{
        const managerId = await user.findOne({email:projectManager})
        const newProject = new project({
            name:name,
            github_url:github_url,
            description:description,
            startDate:startDate,
            endDate:endDate,
            projectManager:managerId._id,
            active:"active"
        })
        return await newProject.save()
    },
    getAllProject: async ()=>{
        const result = await project.find()
        return result
    },
    getProjectByID: async (project_id)=>{
        const result = await project.findOne({_id:project_id})
        return result
    },
    getProjectByURL: async (github_url)=>{
        const result = await project.find({github_url:github_url})
        return result
    },
    addFork: async (project_id,fork_url) =>{
        const result = await project.updateOne({_id:project_id},{$set:{fork_url:fork_url}});
        return result
    }
}

module.exports=projectFunctions;