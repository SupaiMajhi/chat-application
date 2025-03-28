


import Message from "../models/message.model.js";
import { getReceiverSocket } from "../util/socket.js";

export const sendMessage = async (req, res) => {
        const myId = req.user.id;
        const { content } = req.body;
        const { receiverId } = req.params;
    try{
        const message = new Message({
            senderId: myId,
            receiverId,
            content
        });
        await message.save();
        const receiverSocket = getReceiverSocket(receiverId);
        const senderSocket = getReceiverSocket(myId);
        receiverSocket.send(JSON.stringify({ "type": "newMessage", "message": message }));
        senderSocket.send(JSON.stringify({ "type": "newMessage", "message": message }));
        return res.status(200).json({ "message": message });
    }
    catch (error) {
        console.error("server not working", error.message);
        return res.status(500).json({ "error": "server is not responding" });
    }
}


export const getMessage = async (req, res) => {
    try {
        const friendId = req.params.id;
        const myId = req.user._id;
        const messages = await Message.find({ $or: [
            {senderId: myId, receiverId: friendId},
            {senderId: friendId, receiverId: myId}
        ]});
        return res.status(200).json({ "type": "history", "message": messages });
    } catch (error) {
        console.log("error in getMessage", error.message);
        return res.status(500).json({ "error":"server is not responding" });
    }
}
