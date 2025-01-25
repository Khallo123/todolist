import { Request, Response } from "express";
import { defaultErrorMessage } from "../contnents";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import argon2, { hash } from 'argon2'
import { ILoginUser, IRegisterUser } from "../types/user";
import { validationResult } from "express-validator";



// User Register
export const registerUser = async (req : Request, res : Response) => {
    try {
        const data: IRegisterUser = req.body

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).json({
                isSuccess: false,
                errors: errors.array()
            })

            return
        }

    // Check if the password match
    if(data.password !== data.confirmPassword){
        res.status(400).json({
            isSuccess: false,
            message: "Passwords must match!"
        })

        return
    }

    // Hashed password
    const hashedPassword = await argon2.hash(data.password)

    // Check if the user already excisted
    const user = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })

    if(user){
        res.status(409).json({
            isSuccess: false,
            message: "User is already excist!"
        })

        return
    }

    // Create new user
    const newUser = await prisma.user.create({
        data: {
            fullname: data.fullname,
            password: hashedPassword,
            email: data.email,
            phone_number: data.phone_number
        }
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}

export const loginUser = async (req : Request, res : Response) => {
    try {
        const data: ILoginUser = req.body

        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })

        if(!user){
            res.status(400).json({
                isSuccess: false,
                message: "Email is incorrect!"
            })

            return
        }

        const isPasswordCorrect = await argon2.verify(user.password, data.password)

        if(!isPasswordCorrect){
            res.status(400).json({
                isSuccess: false,
                message: "Password is incorrect!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}