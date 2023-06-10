const { contants } = require("../contants");
exports.errorHandler=(err,req,res,next)=>{
    res.status(res.statusCode).json({
        message:err.message
    })
    next();
}