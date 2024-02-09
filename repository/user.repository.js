const user = require("../model/user.model")
const project = require("../model/project.model")

const userFunctions = {
    addUser : async (github)=>{
        const newUser = new user({
            github : github
        })
        return await newUser.save()
    },
    getUserID : async (id)=>{
        const result = await userFunctions.findOne({_id: id})
        return result
    },
    getUser : async (github)=>{
        const result = await user.findOne({github:github})
        return result
    },
    getAllUser : async ()=>{
        const result = await user.find()
        return result
    },
    updateUser : async (github,newGithub)=>{
        const check = await user.findOne({github:newGithub}).catch(err=>{console.log(err)});
        if(check)
        {
        const result = await user.updateOne({github:github},{$set:{github:newGithub}});
        return result
        }
        else
        {
            return  "User already exists";
        }
    },
    deleteUser : async (github)=>{
        const result = await user.deleteOne({github:github})
        return result
    },
    getUserProject : async (github) =>{
        const result = await project.find({projectManager:(await userFunctions.getUser(github))._id})
        return result
    }
}
module.exports = userFunctions