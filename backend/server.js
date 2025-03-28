

import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
//router imports
import userRouter from "./routes/users/user.route.js";
import authRouter from "./routes/auth/auth.route.js";
import msgRouter from "./routes/message/message.route.js";
import { protectedRoute } from "./middleware/middleware.js";
//util imports
import { app, server } from "./util/socket.js";


mongoose.connect("mongodb://127.0.0.1:27017/chatApp").then(() => console.log("db connect successfully")).catch((err) => console.log("some error occurred", err));




//middlewares
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



//router
app.use('/api/user', protectedRoute, userRouter);
app.use("/api/auth", authRouter);
app.use("/api/message", protectedRoute, msgRouter);



server.listen(8080, () => console.log("server is running on port 8080"));