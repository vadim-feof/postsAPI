import User from "../models/User.js";
import Role from "../models/Role.js";

class AuthService {
    async registration(username, password) {
        const userRole = await this.getUserRole()
        return User.create({
            username,
            password: password,
            roles: [userRole.value]
        })
    }

    async getUserByUsername(username) {
        return User.findOne({username});
    }

    async getUserById(_id) {
        return User.findOne({_id});
    }

    async getUserRole() {
        return Role.findOne({value: 'USER'});
    }

    async getUsers() {
        return User.find()
    }
}

export default new AuthService()