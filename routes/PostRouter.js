import Router from 'express'
import PostController from "../controllers/PostController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

const PostRouter = new Router()

PostRouter.post('/posts', authMiddleware, PostController.create)
PostRouter.get('/posts', authMiddleware, PostController.getAll)
PostRouter.get('/posts/:id', authMiddleware, PostController.getById)
PostRouter.put('/posts', authMiddleware, PostController.update)
PostRouter.delete('/posts/:id', authMiddleware, PostController.delete)

export default PostRouter