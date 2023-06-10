const Contactt =require('../models/contactModel');
const asyncHandler=require('express-async-handler');
exports.getAll=asyncHandler(async(req,res)=>{
    const contacts=await Contactt.find({user_id:req.user.id});
    res.status(200).json({message:"All contacts",data:contacts});
});
exports.getOne=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const contact=await Contactt.findById(id);
    if(!contact){
        res.status(404);throw new Error("Not a valid ID");
    }
    res.status(200).json(contact);
});
exports.delContact=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).json({message:"Not valid ID"});
    }
    const contact=await Contactt.findById(id);
    if(!contact){
        res.status(404);throw new Error("Not a valid ID");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(404);throw new Error("Authorization Error");
    }
    await Contactt.deleteOne({_id:req.params.id});
    res.status(200).json({message:"Deleted"});
});
exports.updateContact=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(404).json({message:"Not valid ID"});
    }
    
    const contact=await Contactt.findById(id);

    if(!contact){
        res.status(404);throw new Error("Invalid ID");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(404);throw new Error("Not Found");
    }
    const ff=await Contactt.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );res.status(200).json(ff);
});
exports.create=asyncHandler(async(req,res)=>{
    console.log(req.body);
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("all fields require");
    }
    const contact=await Contactt.create({
        user_id:req.user.id,
        name,
        email,
        phone
    });
    res.status(200).json({message:"created",data:contact});
})