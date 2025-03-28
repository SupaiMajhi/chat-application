

import { Router } from "express";
import { sendMessage, getMessage } from "../../controllers/message.controller.js";
import { protectedRoute } from "../../middleware/middleware.js";


const router = Router();

//all routes are protected
router.post("/send/:receiverId", protectedRoute, sendMessage);

router.get("/:id", protectedRoute, getMessage);



export default router;