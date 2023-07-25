const express=require('express');
const router= express.Router();

router.post('/user-register',(req,res)=>{
    const email=req.body.email;
    const fullName=req.body.fullName;
});