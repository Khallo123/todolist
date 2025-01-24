import { body } from "express-validator";

export const RegistrationSchema = [
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .notEmpty()
    .withMessage("Email is required"),
    
  body("fullname")
    .isString()
    .isLength({ min: 10, max: 100 })
    .withMessage("Full name must be between 10 and 100 characters")
    .notEmpty()
    .withMessage("Full name is required"),
    
  body("phone_number")
    .isString()
    .isLength({ min: 9, max: 15 })
    .withMessage("Valid phone number is required")
    .notEmpty()
    .withMessage("Phone number is required"),
    
  body("password")
    .isLength({ min: 8, max: 64 })
    .withMessage("Password must be between 8 and 64 characters")
    .notEmpty()
    .withMessage("Password is required"),
    
  body("confirmPassword")
    .isLength({ min: 8, max: 64 })
    .withMessage("Confirm password must be between 8 and 64 characters")
    .notEmpty()
    .withMessage("Confirm password is required")
]

export const LoginUserSchema = [
    body("email").isEmail().withMessage("Please provide valid email address"),
    body("password").isLength({min: 8, max: 64}).withMessage("Password must be atleast 8 charactres")
]