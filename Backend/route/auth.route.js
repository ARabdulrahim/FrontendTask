import express from 'express';
import { login, register } from '../controller/auth.controller.js';
import { handleRegisterValidation } from '../middleware/schema.validate.middleware.js';
const router=express.Router();

router.post("/register", handleRegisterValidation, register);
router.post("/login", login);

export default router;