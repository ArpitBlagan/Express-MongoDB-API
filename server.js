const express=require("express");
const dotenv=require("dotenv").config();
const connectDb =require('./config/dbConnection');
const app=express();
const port=process.env.PORT;
const router=require('./Routes/contactRoutes');
const userRouter=require('./Routes/userRoute');
const { errorHandler } = require("./middleware/errorHandler");
connectDb();
//Body parser to parse the body that we get in req..
app.use(express.json());
app.use('/api/contacts',router);
app.use('/api/user',userRouter);
app.use(errorHandler)
app.listen(process.env.port,()=>{
    console.log(`Server running on ${port}`);
});
