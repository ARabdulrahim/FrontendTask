import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDB } from './config/initDB.js';
import authRoute from './route/auth.route.js';
import userRoute from './route/user.route.js';
import taskRoute from './route/task.route.js';

const app=express();
let port=process.env.PORT || 3000;


//db connection 
connectToDB();

app.use(express.json());
app.use(cors());

//routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/task", taskRoute);

app.listen(port, ()=>{
    console.log(`server is runing on ${port}`)
});