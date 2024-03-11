import express, {Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from "mongoose";
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import myHotelRoutes from './routes/my-hotels'

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})


mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then (() => {
        console.log("Connected to the DB")
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

app.use(express.static(path.join(__dirname,"../../frontend/dist")));


//Test the api end-point
app.get("/api/test", async (req:Request, res:Response) => {
        res.json({message : " This is from express Endpoint."})
});

//Register the end-point
app.use('/api/users',userRoutes);

app.use('/api/auth',authRoutes);

app.use('api/my-hotels',myHotelRoutes)


app.listen(7000, () => {
    console.log("Server is running on port 7000")
});
