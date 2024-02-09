const express=require('express');
const router= express.Router();
const userFunctions = require("../repository/user.repository");
const jwt = require('jsonwebtoken');
/*const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();*/
const secret_key = process.env.JWT_SECRET;
const axios=require('axios');
const {Octokit} = require("octokit");



router.get('/user-github-login', async (req,res) => {
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
        code: code
      };
      try{
      const response=await axios.post('https://github.com/login/oauth/access_token', requestData, config);
      const access_token=response.data.access_token;
      const octokit = new Octokit({
        auth: access_token
      });

      try{

      const user_info=(await octokit.request('GET /user')).data;

      const username = user_info["login"];
      const name = user_info["name"];
      const picture = user_info["avatar_url"];

      console.log(username,name,picture);
      const user_exists = await userFunctions.getUser(username);
      console.log(user_exists);
      if (!user_exists)
      {
      
      const result = await userFunctions.addUser(username).catch((err)=>{
      res.status(500).json(err);
      })
      
      }

      const jwt_token=jwt.sign({ username: username, name:name, picture:picture , type : "user", token : access_token},secret_key);
      res.status(200).json(jwt_token);

    }
    catch(err){
      res.status(500).send(err.message);
    }
     
      }
      catch(err){
        res.status(403).send(err.message);
      } 
        
});



/*router.post('/user-google-login', async (req,res) => {

   //verify csrf
  
  const csrfTokenCookie = req.cookies['g_csrf_token'];
    if (!csrfTokenCookie) {
        return res.status(400).send('No CSRF token in Cookie.');
    }

    const csrfTokenBody = req.body['g_csrf_token'];
    if (!csrfTokenBody) {
        return res.status(400).send('No CSRF token in post body.');
    }

    if (csrfTokenCookie !== csrfTokenBody) {
        return res.status(400).send('Failed to verify double submit cookie.');
    }

    // CSRF token verification passed

  const idToken  = req.body.credential;
  console.log(req.body);
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const email= payload['email'];
    const name= payload['name'];
    const picture= payload['picture'];
    console.log(email, name);
    const user_exists = await userFunctions.getUser(email);
    if (!user_exists)
    {
    // add user info to body and redirect to sign up
    res.send("Sign up");
    //sign up page
    }

    const jwt_token=jwt.sign({name:name, email:email, picture:picture},secret_key);
    res.json(jwt_token);
    
});*/


router.post('/user-register',async (req,res)=>{
    const github=req.body.github;
    const result = await userFunctions.addUser(github).catch((err)=>{
    res.status(500).json(err);
    })
    res.status(200).json(result)
});

module.exports=router;