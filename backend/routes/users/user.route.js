

import { Router } from "express";
import { protectedRoute } from "../../middleware/middleware.js";
import { getSelectedUser, getUsers } from "../../controllers/user.controller.js";
const router = Router();


router.get("/users", protectedRoute, getUsers);
router.get("/:id", protectedRoute, getSelectedUser);


export default router;