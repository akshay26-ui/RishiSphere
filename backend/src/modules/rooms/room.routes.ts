import { Router } from "express";
import * as roomController from "./room.controller.js";
import { createRoomSchema, updateRoomSchema } from "./room.validation.js";
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ROLES } from "../../constants/roles.js";
import { roomAvailabilitySchema } from "../events/event.validation.js";

const router = Router();

router.post(
    "/",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(createRoomSchema),
    asyncHandler(roomController.createRoom),
);

router.get("/", authenticate, asyncHandler(roomController.getAllRooms));

router.patch(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    validate(updateRoomSchema),
    asyncHandler(roomController.updateRoom),
);

router.delete(
    "/:id",
    authenticate,
    authorize(ROLES.ADMIN),
    asyncHandler(roomController.deleteRoom),
);

router.get(
    "/unavailable",
    authenticate,
    validate(roomAvailabilitySchema,"query"),
    asyncHandler(roomController.getUnavailableRooms),
);

export default router;
