
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectedRoute = async (req, res, next) => {
    const token = req.cookies.jwt;
    try {
        if(!token) return res.status(401).json({ "error": "unauthorized" });
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        //todo: if token is expired or token is not valid
        const user = await User.findOne({email}).select("-password");
        if(!user) return res.status(403).json({ "error": "Forbidden" });
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ "error": `Internal server error ${error.message}` });
    }
   
}