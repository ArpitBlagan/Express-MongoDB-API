const mongoose=require("mongoose");
const connectDb=async()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION);
        console.log(connect);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports=connectDb