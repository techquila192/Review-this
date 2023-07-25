const user = require("../model/user.model")
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
    updateUser : async (email,fullName)=>{
        const result = await user.updateOne({email:email},{
            fullName:fullName
        })
        return result
    },
    deleteUser : async (email)=>{
        const result = await user.deleteOne({email:email})
        return result
    }
}
module.exports = userFunctions