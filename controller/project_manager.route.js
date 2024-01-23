const express=require('express');
const router= express.Router();
const projectFunctions = require("../repository/project.repository.js")

router.post('/add-project',async (req,res)=>{
    const {name , description , startDate , endDate , projectManager, github_url}=req.body;
    const result=await projectFunctions.addProject(name , description , startDate , endDate , projectManager, github_url).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

router.patch('/insert-reviewer',async (req,res)=>{
    const {github,project_id}=req.body;
    const result=await projectFunctions.addReviewer(github,project_id).catch((err)=>{
        res.status(500).json(err.message);
    })
    res.status(200).json(result);
})

router.get('/get-all-project',async (req,res)=>{
    const result=await projectFunctions.getAllProject().catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

router.get('/get-project-url',async (req,res)=>{
    const {github_url}=req.body;
    const result=await projectFunctions.getProjectByURL(github_url).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

module.exports=router

