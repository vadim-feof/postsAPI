import Post from "../models/Post.js";
import FileService from "./FileService.js";

class PostService {
    async create(post) {
        //const fileName = FileService.saveFile(picture)
        const createdPost = await Post.create({...post}) // , picture: fileName
        return createdPost
    }

    async getAll(limit = 10, page = 1) {
        if (limit === '-1')
            limit = 0
        const totalCount = await Post.find().count()
        const posts = await Post.find().skip(limit*(page-1)).limit(limit)
        return [posts, totalCount]
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