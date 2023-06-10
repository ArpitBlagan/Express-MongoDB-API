const asyncHandler=require('express-async-handler');
const jwt=require('jsonwebtoken');

exports. validateToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.authorization||req.headers.Authorization;
    console.log(authHeader);
    if(authHeader&&authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
            req.user=decoded.user;
            next()
        });
    }else{
        res.status(404);throw new Error("jwt is not correct or expired");
    }
});