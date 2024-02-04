const express=require('express');
const router=express.Router();
const reviewerFunctions = require('../repository/reviewer.repository');
const jwt = require('jsonwebtoken');
const secret_key = process.env.JWT_SECRET;
const axios=require('axios');
const {Octokit} = require("octokit");


router.get('/reviewer-github-login', async(req, res) => {
    const code = req.query.code;
    const state = req.query.state; //check state
    const config = {
        headers: {
          'Accept': 'application/json' // Setting the Accept header to application/json
        }
      };
    const requestData = {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code: code,
      };
      try{
      const response=await axios.post('https://github.com/login/oauth/access_token', requestData, config);
      const access_token=response.data.access_token;
      const octokit = new Octokit({
        auth: access_token
      });

      try{

      const reviewer_info=(await octokit.request('GET /user')).data;

      const username = reviewer_info["login"];
      const name = reviewer_info["name"];
      const picture = reviewer_info["avatar_url"];

      console.log(username,name,picture);
      const reviewer_exists = await reviewerFunctions.getReviewer(username);
      console.log(reviewer_exists);
      if (!reviewer_exists)
      {
      // add user info to body and redirect to sign up
      res.send("Sign up");
      //sign up page
      }

      const jwt_token=jwt.sign({ username: username, name:name, picture:picture, type : "reviewer", token : access_token},secret_key);
      res.json(jwt_token);

    }
    catch(err){
      res.status(500).send(err.message);
    }
     
      }
      catch(err){
        res.status(403).send(err.message);
      } 
           
});



router.post('/reviewer-register',async (req,res)=>{
    const github=req.body.github;
    const result=await reviewerFunctions.addReviewer(github).catch((err)=>{
        res.status(500).json(err);
    })
    res.status(200).json(result);
});

module.exports=router;
