import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export type UserType = {
    _id: string;
    email:string;
    password:string;
    firstName:string;
    lastName: string;
};

const userSchema = new mongoose.Schema({
    email:{type : String, required: true, unique:true},  //
    password:{type :String ,required:true},
    firstName: {type: String, required:true},
    lastName: {type: String, required:true}
});


//This code is a Mongoose middleware function that is applied before saving a document in a 
//Mongoose schema, specifically the userSchema.

userSchema.pre("save", async function (next) {    //The next argument is a callback function 
            //that should be called when the current operation is finished.
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();  // The next() function is called to move on to the next middleware function 
             //or to save the document to the database.
});




const User = mongoose.model<UserType>("User",userSchema);

export default User;