import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './Config/db.js'
import authRoutes from './routes/auth.js';

dotenv.config();
const PORT=process.env.PORT||5000;
const app=express();


app.use(express.json());

app.use("/api/users",authRoutes);

app.get('/',(req,res)=>{
    res.send("Hello Backend!");
})

connectDB();

app.listen(PORT,()=>{
    {/*Server is Start*/}
    console.log(`Server is running on port ${PORT}`);
})