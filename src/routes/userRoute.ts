import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";
import { validationMidlleWare } from "../../middlewares/validation";
import { LoginUserSchema, RegisterUserSchema } from "../../schema/user";
const router = Router()

router.post('/new', RegisterUserSchema,  validationMidlleWare, registerUser)
router.post('/login',LoginUserSchema, validationMidlleWare, loginUser)

export default router