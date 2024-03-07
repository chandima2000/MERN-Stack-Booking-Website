import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';


declare global {    //The "declare global" statement is used to define a global namespace in TypeScript.
    namespace Express{   // "namespaces" are used to group related code together and avoid naming collisions. 
        //The Express namespace is used to define custom types for the Express.js library.
        interface Request{   //The "Request" interface is extended to include a new property userId of type string.
            userId :string
        }
    }
}

const verifyToken = (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies['auth_token'];
    //check the token is exist
    if(!token){
        return res.status(401).json({message:"unauthorized"});
    }
    //If the token is exist then validate the token using jwt.
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY as string);
        req.userId = (decoded as JwtPayload).userId;
        next(); //After verify the token go to the next middleware
    } catch (error) {
        return res.status(401).json({message:"unauthorized"});
    }
};

export default verifyToken;