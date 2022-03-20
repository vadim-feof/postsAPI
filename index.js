import express from 'express'
import mongoose from 'mongoose'
import PostRouter from "./routes/PostRouter.js";
import fileUpload from 'express-fileupload'
import {cors} from "./middleware/CORS-middleware.js";
import AuthRouter from "./routes/AuthRouter.js";
import {config} from "./config.js";

const PORT = process.env.PORT || 5000
const DB_URL = config.DB_URL

const app = express()

app.use(cors);
app.use(express.json()) // express по умолчанию не преобразует json
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api', AuthRouter)
app.use('/api', PostRouter)


async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log("SERVER WORKING PORT", PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
