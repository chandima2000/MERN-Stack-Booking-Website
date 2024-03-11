import express,{Request,Response} from "express";
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";


const router = express.Router();
const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limits : {
        fileSize : 5 * 1024 * 1024   // Maximum Size 5MB
    }
})

// api/my-hotels       
router.post("/", 
            verifyToken,
            [
                body("name").notEmpty().withMessage("Name is required"),
                body("city").notEmpty().withMessage("City is required"),
                body("country").notEmpty().withMessage("Country is required"),
                body("description").notEmpty().withMessage("Description is required"),
                body("type").notEmpty().withMessage("Hotel type is required"),
                body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
                body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
              ],
            // This is going to be upload maximum 6 files
            upload.array("imageFiles",6), 
            async (req: Request, res: Response) =>{

                try {
                    const imageFiles = req.files as Express.Multer.File[];
                    const newHotel : HotelType = req.body;
                    

                    // 1. Upload the images to cloudinary
                    const uploadPromises = imageFiles.map( async (image) => {
                        const b64 = Buffer.from(image.buffer).toString("base64"); //Convert Images into the base64
                        let dataURI = "data:" + image.mimetype + ";base64," + b64 ;
                        const res = await cloudinary.v2.uploader.upload(dataURI);
                        return res.url;
                    });

                    const imageUrls = await Promise.all(uploadPromises); //  Wait until all promises are resolved

                    // 2. if the upload was successful, add the URLs to the new Hotel.

                    newHotel.imageUrls = imageUrls;
                    newHotel.lastUpdated = new Date();
                    newHotel.userId = req.userId;

                    // 3. Save the New Hotels in our Database
                    const hotel = new Hotel(newHotel);
                    await hotel.save();

                    // 4. Return a JSON response with the newly created Hotel
                    res.status(201).send(hotel);

                } catch (error) {
                    console.log("Error Creating hotel : ",error);
                    res.status(500).json({message: "Image Upload Error"});
                }

});


export default router;