import { Request, Response } from "express";
import { defaultErrorMessage } from "../contnents";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


interface ICreateUserPayload {
    username: string
    password: string
    phone_number: string 
}

// Get All Users
export const getAllUsers = async (req : Request, res : Response) => {
    try {
        const users = await prisma.users.findMany()

        if(!users){
            res.status(404).json({
                isSuccess: false,
                message: "Users not found!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            message: "Successfully fetched users!",
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}

//  Create New User
export const createNewUser = async (req : Request, res : Response) => {
    try {
        const {username, password, phone_number} = req.body as ICreateUserPayload

        
        if(!username || !password || !phone_number) {
            res.status(401).json({
                isSuccess: false,
                message: "Validation error!"
            })

            return
        }

        const users = await prisma.users.create({
            data: {
                username,
                password,
                phone_number
            }
        })

        res.status(201).json({
            isSuccess: true,
            message: "Successfully created!",
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}

// Get Single User
export const getSingleUser = async (req : Request, res : Response) => {
    try {

        const {id} = req.params

        const users = await prisma.users.findUnique({
            where: {id: Number(id)}
        })

        if(!users) {
            res.status(400).json({
                isSuccess: false,
                message: "Validation error!"
            })

            return
        }

        res.status(200).json({
            isSuccess: true,
            message: "Successfylly fetched user!",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}

// Update User
export const updateUser = async (req : Request, res : Response) => {
    try {

        const {id} = req.params
        const {username, password, phone_number} = req.body as ICreateUserPayload

        if(!id || (!username && !password && !phone_number)){
            res.status(400).json({
                isSuccess: false,
                message: "Validation error!"
            })

            return
        }

        const users = await prisma.users.update({
            where: {id: Number(id)},
            data: {
                username,
                password,
                phone_number
            }
        })

        res.status(200).json({
            isSuccess: true,
            message: "Successfully updated user",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            isSuccess: false,
            message: defaultErrorMessage
        })
    }
}