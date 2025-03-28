

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const genSaltandhashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}


export const generateToken = (email) => {
    return jwt.sign({email}, process.env.JWT_SECRET);
}

