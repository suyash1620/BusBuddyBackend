import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors'
import UserRouter from './Routers/User.router'
import Buspassrouter from './Routers/Buspass.router'



const app =express();
app.use(express.json());
app.use(cors());

app.use('/uploads',express.static('uploads'))

const PORT=process.env.PORT || 1621

mongoose.connect(process.env.DB_PATH+process.env.DB_NAME)
.then(()=>console.log("Connected!"));

app.listen(PORT,()=>{
    console.log("server is Running on http://localhost:"+PORT)
});

app.use(UserRouter);
app.use(Buspassrouter);