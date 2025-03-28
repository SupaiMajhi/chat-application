import express from "express";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { parse } from "cookie";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const app = express();
export const server = createServer(app);

const wss = new WebSocketServer({server});
const clients = new Map();

export const getReceiverSocket = (receiverId) => {
    return clients.get(receiverId);
}

wss.on("connection", async (ws, req) => {
    console.log("a new client is connected");
    //extract cookie
    const cookies = parse(req.headers.cookie);
    const token = cookies.jwt;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    //find user
    const user = await User.findOne({ email });
    clients.set(user.id, ws);
});