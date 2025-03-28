

import express from "express";
import { signupUser, loginUser, updateUser, logoutController, checkAuth } from "../../controllers/auth.controller.js";
import { protectedRoute } from "../../middleware/middleware.js";

const router = express.Router();
router.post("/signup", signupUser);

router.post("/login", loginUser);


router.put("/update", protectedRoute, updateUser);

router.post("/logout", protectedRoute, logoutController);

router.get("/check-auth", protectedRoute, checkAuth);


export default router;