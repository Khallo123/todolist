import { Request, Response } from "express";
import { defaultErrorMessage } from "../contnents";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import argon2, { hash } from 'argon2'
import { IRegisterUser } from "../types/user";

import {validationResult} from 'express-validator'


interface ICreateUserPayload {
    username: string
    password: string
    phone_number: string 
}
// User Register
export const registerUser = async (req : Request, res : Response) => {
    try {
            
    const data: IRegisterUser = req.body 

        // Check the password
        if(data.password !== data.confirmPassword) {
            res.status(400).json({
                isSuccess: false,
                message: "Password must match."
            })

            return
        }


        // Check if the user already excist
        const user = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if(user){
            res.status(409).json({
                isSuccess: false,
                message: "User is already excisted."
            })

            return
        }


        // Hashed the password
        const hashedPassword = await argon2.hash(data.password)

        // Create user
        const newUser = await prisma.user.create({
            data: {
                fullname: data.fullname,
                password: hashedPassword,
                email: data.email,
                phone_number: data.phone_number
            }
        })

        res.status(201).json({
            isSuccess: true,
            message: "Success!",
            newUser
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

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({
            isSuccess: false,
            errors: errors.array()  
        })

        return
    }

    res.status(200).json({
        isSuccess: true
    })
}