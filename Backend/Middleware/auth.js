import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Decoded token id:', decoded.id);
            req.user = await User.findById(decoded.id).select("-password");
            console.log('Loaded user from DB for protect middleware:', req.user && { id: req.user._id.toString(), role: req.user.role });
            return next();
        }
        catch(err){
            console.error("Token Verification failed: ",err);
            res.status(401).json({message:"Not authorized, token failed"});
        }
    }
    return res.status(401).json({message:"Not authorized, no token"});
};

