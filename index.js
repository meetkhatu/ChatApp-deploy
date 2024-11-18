import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"
import mongoose from 'mongoose'
import userRoute from './Routes/user.route.js'
import messageRoute from './Routes/message.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import { app, server } from './SocketIO/server.js'

dotenv.config()


const PORT = process.env.PORT || 5002
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/chat'

app.use(cors({
    origin: ['http://localhost:5002','http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.use(express.json())
app.use(cookieParser())


try {
    mongoose.connect(url)
    console.log(`MongoDB connected at ${url}`)
} catch (error) {
    console.log(error)
}


app.use('/user', userRoute)
app.use('/message', messageRoute)



// DEPLOYMENT CODE

if(process.env.NODE_ENV === 'production'){
    try{
        const dirPath = path.resolve()
        console.log("Serving static files from:", dirPath);  // Log the path to check if it's correct
        app.use(express.static('./frontend/build'));  // Serve static files (JS, CSS, etc.)

        // Fallback for React Router (catch-all route to serve index.html for SPA)
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(dirPath, './frontend/build','index.html'));
        });
    } catch(error){
        console.log("Error in Production: ",error)
    }
}




server.listen(PORT, () => {
    console.log(`Server started on ${PORT}`)
})