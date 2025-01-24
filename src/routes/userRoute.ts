import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";
import {  LoginUserSchema, RegistrationSchema } from "../../Schema/user";
import { validationMiddleware } from "../../middlewares/validation";
const router = Router()


router.post('/new', RegistrationSchema, validationMiddleware, registerUser)
router.post('/login', LoginUserSchema, validationMiddleware, loginUser)

export default router