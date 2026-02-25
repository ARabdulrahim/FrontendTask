import 'dotenv/config';
import { User } from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//user register
export const register= async(req, res)=>{
    try{
        let {name, email, password}=req.body;
        let user= await User.findOne({email});
        if(user){
            return res.status(400).send({success:false, message:"user allready registered"});
        }
        let hashPassword= await bcrypt.hash(password, 10);
        let newUser= new User({name, password: hashPassword, email});
        await newUser.save();

        return res.status(201).send({success: true, message:"user registered successful"});
    }catch(err){
        return res.status(500).send({success: false, message:"Internal Server Error "});
    }
};

//user login
export const login=async(req, res)=>{
    try{
        let{email, password}=req.body;
        const user= await User.findOne({email});
        if(!user){
            return res.status(400).send({success:false, message:"user not registered"});
        }
        let iscorrectPassword= await bcrypt.compare(password, user.password);
        if(!iscorrectPassword){
            return res.status(400).send({success:false, message:"Incorrect password"});
        }
        let token= jwt.sign({id:user._id, email}, process.env.JWT_SECRET_KEY);
        return res.status(201).send({success: false, message:"user login successful", token});
    }catch(err){
        console.log(err)
        return res.status(500).send({success: false, message:"Internal Server Error "});
    }
};