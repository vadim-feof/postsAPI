import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {config} from '../config.js'
import {validationResult} from "express-validator";
import AuthService from "../services/AuthService.js";

function generateAccessToken(id, roles) {
    const payload = {
        _id: id, roles
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
                return res.status(400).json({ message: `Пользователь ${username} не существует`})

            const checkPassword = bcrypt.compareSync(password, user.password)
            if (!checkPassword)
                return res.status(400).json({ message: 'Проверьте логин или пароль'})

            const token = generateAccessToken(user._id, user.roles)
            res.json({token, username})
        } catch (e) {
            console.log(e)
            res.status(400).json({ message: "Authorization error"})
        }
    }

    async auth(req, res) {
        try {
            const user = await AuthService.getUserById(req.user._id)

            const token = generateAccessToken(req.user._id, req.user.roles)
            res.json({token, username: user.username})
        } catch (e) {
            res.status(401).json({ message: "Пожалуйста авторизируйтесь"})
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