import jwt from "jsonwebtoken";
import {config} from "../config.js";

export const authMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS")
        next()

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token)
            return res.status(403).json({ message: "Пожалуйста, авторизируйтесь"})

        const decodedData = jwt.verify(token, config.secretAccessKey, undefined, undefined)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({ message: "Пожалуйста, авторизируйтесь"})
    }
}