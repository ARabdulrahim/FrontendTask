import { Task } from "../model/task.model.js";

//create new task
export const createTask= async(req, res)=>{
    try{
        let {title, status}=req.body;
        let id=req.user.id;
        let newTask= new Task({title, status, autherId: id});
        await newTask.save();
        return res.status(201).send({success: true, message:"Task is created",newTask});
    }catch(err){
        return res.status(500).send({success: false, message:"Internal Server Error "});     
    }
};

//get task by autherid
export const getTask= async(req, res)=>{
    try{
        let id=req.user.id;
        let tasks=await Task.find({autherId: id});
        if(!tasks){
            return res.status(403).send({success: false, message:"Task not found"});
        }
        return res.status(200).send({success: true, message:"Task is fetched",tasks});
    }catch(err){
        return res.status(500).send({success: false, message:"Internal Server Error "});     
    }
};

//update task
export const updateTask= async(req, res)=>{
    try{
        let{id}=req.params;
        let{title, status}=req.body;
        let task= await Task.findByIdAndUpdate(id,{title, status});
        if(!task){
            return res.status(403).send({success: false, message:"Task not found"});
        }
        return res.status(200).send({success: true, message:"Task is updated",task});
    }catch(err){
        return res.status(500).send({success: false, message:"Internal Server Error "});     
    }
};

//remove task
export const deleteTask= async(req, res)=>{
    try{
        let{id}=req.params;
        let task= await Task.findByIdAndDelete(id);
        if(!task){
            return res.status(403).send({success: false, message:"Task not found"});
        }
        return res.status(200).send({success: true, message:"Task is deleted",task});
    }catch(err){
        return res.status(500).send({success: false, message:"Internal Server Error "});     
    }
};