const user = require("../model/user.model")
const project = require("../model/project.model")
const userFunctions = {
    addUser : async (email,fullName)=>{
        const newUser = new user({
            email:email,
            fullName:fullName
        })
        return await newUser.save()
    },
    getUser : async (email)=>{
        const result = await user.findOne({email:email})
        return result
    },
    getAllUser : async ()=>{
        const result = await user.find()
        return result
    },
    updateUser : async (oldEmail,newEmail,newFullName)=>{
        const result = await user.updateOne({email:oldEmail},{
            $set: {email:newEmail, fullName:newFullName}})
        return result
    },
    deleteUser : async (email)=>{
        const result = await user.deleteOne({email:email})
        return result
    }
}
module.exports = userFunctions