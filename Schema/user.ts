import {body} from 'express-validator'

export const RegisterUserSchema = [
    body("email").isEmail().notEmpty().withMessage("Please add valid email address"),
    body("phone_number").isString().isLength({min: 9, max: 15 }).notEmpty(),
    body("fullname").isString().isLength({min: 10, max: 100}).withMessage("Valid phone number is required").notEmpty(),
    body("password").isLength({min: 8, max: 64 }).notEmpty().withMessage("Password must be between 8 and 64 characters"),
    body("confirmPassword").isLength({min: 8, max: 64}).notEmpty().withMessage("Confirm password must be between 8 and 64 characters")
]

export const LoginUserSchema = [
    body("email").isEmail().notEmpty().withMessage("Please add valid email address"),
    body("password").isLength({min: 8, max: 64}).notEmpty().withMessage("Confirm password must be between 8 and 64 characters")
]