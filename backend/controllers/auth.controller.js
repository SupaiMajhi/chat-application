


import User from "../models/user.model.js";
import { genSaltandhashPassword, generateToken } from "../util/util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    if (!username || !password || !email)
      return res.status(400).json({ error: "All fields are required" });
    //check if user already exist
    const alreadyExist = await User.findOne({ $or: [{email}, {username}] });
    if (alreadyExist)
      return res.status(400).json({ error: "username or email already exist" });
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password must be 6 character long" });
    }
    const hasedPassword = await genSaltandhashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hasedPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "user created successfully", "status": "success" });
  } catch (error) {
    res.status(500).json({ error: `Internal server error, ${error.message}` });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res.status(400).json({ error: "All fields are required" });
    const user = await User.findOne({ username });
    if (!user)
      return res.status(401).json({ "error": "Invalid username or password" });
    const result = await bcrypt.compare(password, user.password);
    if (!result)
      return res.status(401).json({ "error": "Invalid username or password" });
    if (result) {
      //implement the token for singIn
      const token = generateToken(user.email);
      res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      //redirect the user to the homepage
      return res.status(200).json({
        "status": "success",
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        "message": "Loggedin successfully"
      });
    }
  } catch (error) {
    //remove the error.message after the development
    console.log("error in login controller", error.message);
    return res
      .status(500)
      .json({ error: `server is not responding${error.message}` });
  }
};

export const updateUser = async (req, res) => {
  const { username, toUpdate } = req.body;
  try {
    //todo: create toUpdte in frontend => toUpdte = {}, using "[]" create updateField and updateValue these are two distinct objects
    await User.updateOne({ username }, { $set: toUpdate });
    return res.status(200).json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  } catch (error) {
    return res.status(500).json({ "message":`Internal server error, ${error.message}`});
  }
};


export const logoutController = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:0});
    return res.status(200).json({ "message": "Logout Successfully" });
  } catch (error) {
    console.log("error in logout", error.message);
    return res.status(500).json({ "error": `Internal server errror, ${error.message}` });
  }
}


export const checkAuth = async (req, res) => {
  try{
    return res.status(200).json({ "user": req.user });
  } catch(error) {
    console.log(error.message);
    return res.status(500).json({ "error": `Internal server error ${error.message}` });
  }
}