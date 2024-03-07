import express, {Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then (() => {
        console.log("Connected to the DB.")
    })
    .catch((error) => {
        console.log(error)
    })


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials:true
    }
)); 


//Test the api end-point
app.get("/api/test", async (req:Request, res:Response) => {
        res.json({message : " This is from express Endpoint."})
});

//Register the end-point
app.use('/api/users',userRoutes);

app.use('/api/auth',authRoutes);


app.listen(7000, () => {
    console.log("Server is running on port 7000")
});
