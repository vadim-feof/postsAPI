import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {config} from '../config.js'
import {validationResult} from "express-validator";
import AuthService from "../services/AuthService.js";

function generateAccessToken(id, roles) {
    const payload = {
        id, roles
    }
    return jwt.sign(payload, config.secretAccessKey, {expiresIn: "24h"}, undefined)
}

class AuthController {
    async registration(req, res) {
        try {
            const validError = validationResult(req)
            if (!validError.isEmpty())
                return res.status(400).json({ message: "Ошибка валидации", validError})

            const {username, password} = req.body

            const candidate = await AuthService.getUserByUsername(username)
            if (candidate)
                return res.status(400).json({ message: "Username already exist"})

            const hashPassword = bcrypt.hashSync(password, 7)
            const user = await AuthService.registration(username, hashPassword)

            return res.json({
                message: "User created successfully",
                username: user.username
            })
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await AuthService.getUserByUsername(username)
            if (!user)
                return res.status(400).json({ message: `Username ${username} not exist`})

            const checkPassword = bcrypt.compareSync(password, user.password)
            if (!checkPassword)
                return res.status(400).json({ message: 'Wrong password'})

            const token = generateAccessToken(user._id, user.roles)
            res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Authorisation error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await AuthService.getUsers()
            res.json(users)
        }
        catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getById(req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }
}

export default new AuthController()