const express=require('express');
const router= express.Router();
const projectFunctions = require("../repository/project.repository.js")
const {Octokit} = require("octokit");
const reviewerFunctions = require('../repository/reviewer.repository.js');
const webhookDb = require('../model/webhooks.model.js');


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

router.patch('/remove-reviewer',async (req,res)=>{
    const {project_id} = req.body;
    const reviewer_id = (await projectFunctions.getProjectByID(project_id)).reviewer
    const result=await projectFunctions.removeReviewer(project_id).catch((err)=>{
        res.status(500).json(err.message);
    })
    //remove hook from db
    await webhookDb.deleteOne({projectID: project_id, owner: reviewer_id}).catch((err)=>{res.status(500).json(err.message)})
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

router.get('/get-project-id',async (req,res)=>{
    const {project_id}=req.body;
    const result=await projectFunctions.getProjectByID(project_id).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
})

router.post('/add-fork',async (req,res)=>{
    const {project_id,fork_url}=req.body;
    const project= await projectFunctions.getProjectByID(project_id);
    if(!project.fork_url){
        const octokit = new Octokit({
            auth: req.body.token
        })
    let reviewerId = project.reviewer
    let reviewer = await reviewerFunctions.getReviewerId(reviewerId)
    let parts = fork_url.split("/");
    let repositoryName = parts[parts.length - 1];
    if (repositoryName.endsWith(".git")) {
        repositoryName = repositoryName.slice(0, -4); // Remove the last 4 characters (".git")
    }
    console.log(reviewer);
    const wh_create =  await octokit.request('POST /repos/{owner}/{repo}/hooks', {
            owner: reviewer.github,
            repo:  repositoryName,
            name: 'web',
            active: true,
            events: [
              'push',
              'pull_request'
            ],
            config: {
              url: req.get('origin')+'/api/github-delivery', // add url to handle webhook deliveries
              content_type: 'json',
              insecure_ssl: '0',
              secret: process.env.WEBHOOK_SECRET
            },
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          })
    
    const hook_id=wh_create.data.id            
    const webhookEntry=new webhookDb({hook_id:hook_id, projectID:project_id, owner: reviewerId})
    const wh_save=await webhookEntry.save().catch((err) => {err.message })
    const result = await projectFunctions.addFork(project_id,fork_url).catch((err)=>{
        res.status(err).json(err);
    })
    res.status(200).send("Fork registered successfully!\nWebhook created successfully!");
    }
    else
    {
        res.status(500).json("Fork already exists");
    }
})


/*router.patch('/update-state', async (req, res)=>{
    const {project_id, fork_url, state}=req.body; //close webhook when project is closed

})*/

module.exports=router

