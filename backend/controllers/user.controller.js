

import User from "../models/user.model.js";
// import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    const loggedInUser = req.user._id;
    //todo: fetch only the user's friends
    const users = await User.find({ _id: { $ne: loggedInUser }}).select("-password");
    return res.status(200).json({users});  
}


export const getSelectedUser = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedUser = await User.findById(id).select("-password");
        if(!selectedUser) {
            return res.status(404).json({ error: "unable to fetch"});
        }
        return res.status(200).json({ selectedUser });
    } catch (error) {
        console.log("error in getSelectedUser controller ", error.message);
        return res.status(500).json({ error: "server is not responding" });
    }
}