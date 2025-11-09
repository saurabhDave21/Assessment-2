import mongoose from "mongoose";
import { parseJsonSourceFileConfigFileContent } from "typescript";
import bcrypt from "bcryptjs";

const userschema = new mongoose.Schema(
  {
   name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true,
        trim: true,
    },
    
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Staff'], 
        default: 'Staff', 
    },
    phone: {
        type: String,
        required: true,
    },
    
    // City
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
  },{timestamps:true})


  userschema.pre("save",async function(next){
     if(!this.isModified("password"))next();
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password,salt);
     next();
  })

  userschema.methods.matchPassword = async function (entredPassword) {
    return await bcrypt.compare(entredPassword, this.password);
  }

  const User = mongoose.model("User",userschema)

  export default User;