const express=require('express');
const router= express.Router();
const userFunctions = require("../repository/user.repository")

router.post('/user-register',async (req,res)=>{
    const email=req.body.email;
    const fullName=req.body.fullName;
    const result = await userFunctions.addUser(email,fullName)
    res.status(200).json(result)
});

module.exports=router;