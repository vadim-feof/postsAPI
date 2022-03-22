import Router from 'express'
import UserController from "../controllers/AuthController.js";
import {check} from 'express-validator'
import {authMiddleware} from "../middleware/authMiddleware.js";
import {roleMiddleware} from "../middleware/roleMiddleware.js";

const AuthRouter = new Router()

AuthRouter.post('/registration', [
    check('username', "Имя пользователя должно быть от 2 до 20 символов")
        .isLength({min: 2, max: 20}),
    check('password', "Пароль должен быть от 4 до 10 символов")
        .isLength({min: 4, max: 10})
],UserController.registration)
AuthRouter.post('/login', UserController.login)
AuthRouter.get('/auth', authMiddleware, UserController.auth)
AuthRouter.get('/users', roleMiddleware(["ADMIN"]), UserController.getUsers)
AuthRouter.get('/users/:id', authMiddleware, UserController.getById)

export default AuthRouter