import { Router } from "express";
import {
    registerUser,
    loginUser,
    refreshAccessToken,
    getCurrentUser,
} from "./user.controller.js";
import { loginSchema, registerSchema } from "./user.validation.js";
import { validate } from "../../middleware/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(registerUser));
router.post("/login", validate(loginSchema), asyncHandler(loginUser));
router.post("/refresh", asyncHandler(refreshAccessToken));
router.get("/me", authenticate, asyncHandler(getCurrentUser));

export default router;
