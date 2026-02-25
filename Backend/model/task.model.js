import mongoose from 'mongoose';

const taskSchema= new mongoose.Schema({
    autherId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type: String,
        require: true
    },
    status:{
        type:String,
        enum:["Active", "Paused", "Success"],
        default: "Active"
    },
},{timestamps: true});

export const Task= mongoose.model("Task", taskSchema);
