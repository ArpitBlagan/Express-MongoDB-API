const express=require('express');
const {validateToken}=require('../middleware/validateToken');
const {loginUser,currentUser,registerUser} =require('../controllers/user')
const userRouter=express.Router();
userRouter.post('/login',loginUser);
userRouter.post('/register',registerUser);

userRouter.get('/current',validateToken,currentUser)
// userRouter.route('/').get(getUsers).post(createUser);
// userRouter.route('/:id').get(getUser).put(updateUser).delete(delUser);
module.exports=userRouter;