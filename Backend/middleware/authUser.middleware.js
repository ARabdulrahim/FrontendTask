import 'dotenv/config';
import jwt from 'jsonwebtoken';

//authenticate user through jwt token
export const authUser=(req, res, next)=>{
    let token= req.headers['authorization'];
    if(token){
        token= token.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, valid)=>{
            if(err){
                return res.status(400).send({success: false, message:"Provide valid token"});
            }
            req.user=valid;
            next();
        })

    }else{
        return res.status(400).send({success: false, message:"Provide token"});
    }
};