import Post from "../models/Post.js";
import FileService from "./FileService.js";

class PostService {
    async create(post, picture) {
        const fileName = FileService.saveFile(picture)
        const createdPost = await Post.create({...post, picture: fileName})
        return createdPost
    }

    async getAll() {
        const posts = await Post.find()
        return posts
    }

    async getById(id) {
        if (!id)
            throw new Error("ID поста не указан")
        const post = await Post.findById(id)
        return post
    }

    async update(post) {
        if (!post._id)
            throw new Error("ID поста не указан")
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        return updatedPost
    }

    async delete(id) {
        if (!id)
            throw new Error("ID поста не указан")
        const deletedPost = await Post.findByIdAndDelete(id)
        return deletedPost
    }
}

export default new PostService()