import { userSchema } from '../utils/schema.validation.js';

export const handleRegisterValidation=(req, res, next)=>{
    try{
        let resp= userSchema.validate(req.body);
        if(resp.error){
            return res.status(400).send({message: resp.error.message});
        }
        next();
    }catch(err){
        return res.status(500).send({sucees: false, message:"Internal server error"});
    }
}