import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import applicationRoute from './routes/applicationRouter.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Routes
// http://localhost:3002
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/apply', applicationRoute)

const HOST = 'mern.website'

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.chckn9c.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        )

        app.listen(PORT, HOST, () => console.log(`Server started on ${HOST}: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}
start()
