const asyncHandler=require('express-async-handler');
const usser=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
exports.registerUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All field require");
    }
    const userAv=await usser.findOne({email});
    if(userAv){res.status(400);throw new Error("User alredy registered");}
    //Hash the password
    const hash=await bcrypt.hash(password,10);
    console.log(hash);
    const user=usser.create({username,email,password:hash});
    if(user){
        res.status(201).json({
            message:"Done",
            user:user.email
        });
    }
    else{
        res.status(400);throw new Error("User data is not valid");
    }
});
exports.currentUser=asyncHandler(async(req,res)=>{
    res.status(200).json(req.user);
});
exports.loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400);throw new Error("All fields are mandatory");
    }
    const user=await usser.findOne({email});
    //compare password with hashed one
    if(user&&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },

        },process.env.ACCESS_TOKEN,
        {expiresIn:"15m"}
        );
        res.status(200).json({
            accessToken
        });
    }
    else{
        res.status(401);
        throw new Error("Check your password and email");
    }
});
