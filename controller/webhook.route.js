const express=require('express');
const router=express.Router();
const authWebhook = require('../middleware/authWebhook.js');
const webhookDb = require('../model/webhooks.model.js');
const deliveryDb = require('../model/deliveries.model.js');
const projectFunctions = require("../repository/project.repository.js")

router.post('/github-delivery', authWebhook, async (req, res) => {
const eventType=req.headers['x-github-event']
if(eventType=='ping')
{
res.status(200).send("Successfully delivered")
return
}
const hook_id = req.headers['x-github-hook-id'] 
const timestamp = new Date()
const webhookEntry = await webhookDb.findOne({hook_id: hook_id}).catch((err)=> console.log(err.message));
const project = await projectFunctions.getProjectByID(webhookEntry.projectID).catch((err)=> console.log(err.message));
const user = project.projectManager
const reviewer = project.reviewer
const event = req.body
var message = ""
if(eventType=='push')
{
    for(let commit of event.commits)
    {
        message += "[" +event.sender.login+ "]" + "Commit #"+commit.id.substring(0,7) + ": "+ commit.message + "\n"
    }
}
else if(eventType=='pull_request')
{
    const pull_request = event.pull_request
    message = "[" +event.sender.login+ "]" + "Pull Request #"+ pull_request.id + " " + event.action + ": " + pull_request.title
}

const delivery = await new deliveryDb({
    type: eventType, 
    timestamp: timestamp, 
    message: message, 
    projectID: webhookEntry.projectID, 
    user: user, 
    reviewer: reviewer
}).save().catch(err => {err.message }) 

res.status(200).send("Added successfully")
})

module.exports = router;