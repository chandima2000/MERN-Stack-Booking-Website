"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies['auth_token'];
    //check the token is exist
    if (!token) {
        return res.status(401).json({ message: "unauthorized" });
    }
    //If the token is exist then validate the token using jwt.
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next(); //After verify the token go to the next middleware
    }
    catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
};
exports.default = verifyToken;
