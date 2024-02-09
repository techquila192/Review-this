const express=require('express');
const router= express.Router();
const userFunctions = require("../repository/user.repository");


router.get('/get-user', async (req,res)=>
{
    const github=req.body.github;
    const result= await userFunctions.getUser(github).catch((err)=>{
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
    const github=req.body.github;
    const result= await userFunctions.deleteUser(github).catch((err)=>{
    res.status(500).json(err)});
    res.status(200).json(result);
})

router.patch('/update-user',async(req,res)=>{
    const oldGithub=req.body.oldGithub;
    const newGithub=req.body.newGithub;
    const result=await userFunctions.updateUser(oldGithub,newGithub).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

router.get('/get-user-projects',async(req,res)=>{
    const user = req.body.github;
    const result = await userFunctions.getUserProject(user).catch((err)=>{ 
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

module.exports=router;