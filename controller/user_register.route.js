const express=require('express');
const router= express.Router();
const userFunctions = require("../repository/user.repository")

router.post('/user-register',async (req,res)=>{
    const email=req.body.email;
    const fullName=req.body.fullName;
    const result = await userFunctions.addUser(email,fullName).catch((err)=>{
    res.status(500).json(err);
    })
    res.status(200).json(result)
});

router.get('/get-user', async (req,res)=>
{
    const email=req.body.email;
    const result= await userFunctions.getUser(email).catch((err)=>{
    res.status(500).json(err)});
    res.status(200).json(result);
})

router.get('/get-all-user', async (req,res)=>
{
    const result= await userFunctions.getAllUser().catch((err)=>{
    res.status(500).json(err)});
    res.status(200).json(result);
})

router.delete('/delete-user',async(req,res)=>
{
    const email=req.body.email;
    const result= await userFunctions.deleteUser(email).catch((err)=>{
    res.status(500).json(err)});
    res.status(200).json(result);
})

router.patch('/update-user',async(req,res)=>{
    const oldEmail=req.body.oldEmail;
    const newEmail=req.body.newEmail;
    const newFullName=req.body.newFullName;
    const result=await userFunctions.updateUser(oldEmail,newEmail,newFullName).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

module.exports=router;