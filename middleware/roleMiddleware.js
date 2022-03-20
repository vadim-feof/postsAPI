import jwt from "jsonwebtoken";
import {config} from "../config.js";

export const roleMiddleware = (roles) => {
    return function (req, res, next) {
        if (req.method === "OPTIONS")
            next()

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token)
                return res.status(403).json({ message: "You are not authorized"})

            const {roles: userRoles} = jwt.verify(token, config.secretAccessKey, undefined, undefined)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role))
                    hasRole = true
            })
            if (!hasRole)
                return res.status(403).json({ message: "Access denied"})
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({ message: "You are not authorized"})
        }
    }
}