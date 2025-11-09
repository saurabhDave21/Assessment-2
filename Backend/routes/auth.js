import express from 'express';
import User from '../models/User.js';
import { protect} from '../Middleware/auth.js';
import jwt from 'jsonwebtoken';

const  router = express.Router();

// Register a new user
router.post('/register',async (req,res)=>{
    const {name,email,password,role,phone,city,country} = req.body;
    try{
        if(!name || !email || !password || !role || !phone || !city || !country){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }   

        const user = await User.create({
            email,
            name,
            password,
            role,
            phone,
            city,
            country
        });
        const token = generateToken(user._id);
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            city:user.city,
            country:user.country,
            token,
        })
    }
    catch(err){
        res.status(500).json({message:"Server Error"})
    }
})



//login for user endpoint
router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }
        const user = await User.findOne({email})

        if(!user ||  !(await user.matchPassword(password))){
            return res.status(401).json({message:"Invalid email or password"})  
        }
        const token = generateToken(user._id);
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            city: user.city,
            country: user.country,
            token,
        })
    }
    catch(err){
        res.status(500).json({message:"Server Error"})
    }
})



router.get("/me", protect, async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json(user);
})

// Get all users (protected route)
router.get("/all", protect, async (req, res) => {
    try {
       
        const role = (req.user && req.user.role) ? req.user.role.toString().trim().toLowerCase() : '';
        console.log('Requesting user role:', role);
        if (role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin only." });
        }
        
        const users = await User.find({})
            .select('-password')
            .sort({ createdAt: -1 }) 
            .lean();
            
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: "Server Error" });
    }
});

//Generate JWT token
export const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"30d",
    });
}

export default router;