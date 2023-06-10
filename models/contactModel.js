const mongoose=require('mongoose');
const contactSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
    ,name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        required:[true,"please add the your email"]
    },
    phone:{
        type:Number,
        required:[true,"please add the phone number"]
    },
},
{
    timestamps:true,
});
module.exports=mongoose.model("Contactt",contactSchema);