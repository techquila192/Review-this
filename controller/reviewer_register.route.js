const express=require('express');
const router=express.Router();
const reviewerFunctions = require('../repository/reviewer.repository');

router.post('/reviewer-register',async (req,res)=>{
    const github=req.body.github;
    const result=await reviewerFunctions.addReviewer(github).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
});

router.get('/get-reviewer', async (req,res)=>{
    const github=req.body.github;
    const result=await reviewerFunctions.getReviewer(github).catch((err)=>{
        res.status(500).json(err)})
    res.status(200).json(result);
})

router.get('/get-all-reviewer',async (req,res)=>{
const result=await reviewerFunctions.getAllReviewer().catch((err)=>{
    res.status(500).json(err)});
res.status(200).json(result);
})

router.delete('/delete-reviewer',async (req,res)=>{
    const github=req.body.github;
    const result=await reviewerFunctions.deleteReviewer(github).catch((err)=>{
        res.status(500).json(err)});
    res.status(200).json(result);
})

router.patch('/update-reviewer',async (req,res)=>{
    const oldGithub=req.body.oldGithub;
    const newGithub=req.body.newGithub;
    const result=await reviewerFunctions.updateReviewer(oldGithub,newGithub).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

router.patch('/add-reviewer',async (req,res)=>{
    const project_id=req.body.project_id
    const result=await reviewerFunctions.addReviewer(project_id).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})
module.exports=router;

