import express from 'express';
import { authUser } from '../middleware/authUser.middleware.js';
import { createTask, deleteTask, getTask, updateTask } from '../controller/task.controller.js';
const router=express.Router();

router.get("/", authUser, getTask);
router.post("/new", authUser, createTask);
router.put("/:id", authUser, updateTask);
router.delete("/:id", authUser, deleteTask);

export default router;