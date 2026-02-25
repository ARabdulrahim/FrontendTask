import { User } from "../model/user.model.js";

//get profile by id
export const getProfilebyId= async(req, res)=>{
    try{
        let{id}=req.user;
        let user= await User.findById(id);
        if(!user){
            return res.status(403).message({success: false, message:"User not found"})
        }

        return res.status(200).send({success: true, message:"all users are fetched", user});
    }catch(err){
        return res.status(500).send({success: false, message:"Internal Server Error "});        
    }
};

//update profile
export const updateProfile= async(req, res)=>{
    try{
        let{id}=req.params;
        let{name, email}=req.body;
        let user= await User.findByIdAndUpdate(id,{
            name: name,
            email: email
        });

        if(!user){
            return res.status(403).message({success: false, message:"User not found"})
        }

        return res.status(200).send({success: true, message:"profile is updated", user});
    }catch(err){
        return res.status(500).send({success: false, message:"Internal Server Error "});        
    }
};