import PostService from "../services/PostService.js";

class postController {
    async create(req, res) {
        try {
            const post = await PostService.create(req.body) // , req.files.picture
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const {_limit, _page} = req.query
            const [posts, totalCount] = await PostService.getAll(_limit, _page)
            res.header('X-Total-Count', totalCount)
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getById(req, res) {
        try {
            const post = await PostService.getById(req.params.id)
            return res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const updatedPost = await PostService.update(req.body)
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params
            const deletedPost = await PostService.delete(id)
            return res.json(deletedPost)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

export default new postController()