import { Router } from "express";
import { registerUser } from "../controllers/userController";
const router = Router()


router.post('/new', registerUser)

export default router