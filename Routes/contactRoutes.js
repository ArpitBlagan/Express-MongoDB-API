const express=require("express");
const router=express.Router();
const {getAll,getOne,delContact,updateContact,create} =require('../controllers/contact');
const { validateToken } = require("../middleware/validateToken");
router.use(validateToken);
router.route('/').get(getAll).post(create);
router.route('/:id').get(getOne).put(updateContact).delete(delContact);
module.exports=router;