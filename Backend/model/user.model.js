import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    }
});

const User= mongoose.model("user", userSchema);

export{User};