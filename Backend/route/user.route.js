import express from 'express';
import {getProfilebyId, updateProfile } from '../controller/user.controller.js';
import { authUser } from '../middleware/authUser.middleware.js';
const router=express.Router();

router.get("/", authUser, getProfilebyId)
router.put("/:id", authUser, updateProfile);

export default router;