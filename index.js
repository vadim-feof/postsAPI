import express from 'express'
import mongoose from 'mongoose'
import PostRouter from "./routes/PostRouter.js";
import fileUpload from 'express-fileupload'

const PORT = process.env.PORT || 5000
const DB_URL = `mongodb+srv://root:root@mycluster.mcpuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});
app.use(express.json()) // express по умолчанию не преобразует json
app.use(express.static('static'))
app.use(fileUpload({}))

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
