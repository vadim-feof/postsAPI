import Router from 'express'
import PostController from "../controllers/PostController.js";

const PostRouter = new Router()

PostRouter.post('/posts', PostController.create)
PostRouter.get('/posts', PostController.getAll)
PostRouter.get('/posts/:id', PostController.getById)
PostRouter.put('/posts', PostController.update)
PostRouter.delete('/posts/:id', PostController.delete)

export default PostRouter