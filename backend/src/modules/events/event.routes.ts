import { Router } from "express";
import * as eventController from "./event.controller.js";
import { createEventSchema, getEventsSchema } from "./event.validation.js";
import { validate } from "../../middleware/validate.middleware.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { authorize } from "../../middleware/authorize.middleware.js";
import { ROLES } from "../../constants/roles.js";

const router = Router();

router.post(
    "/",
    authenticate,
    validate(createEventSchema),
    asyncHandler(eventController.createEvent),
);

router.patch(
    "/:id/approve",
    authenticate,
    authorize(ROLES.ADMIN),
    asyncHandler(eventController.approveEvent),
);

router.patch(
    "/:id/reject",
    authenticate,
    authorize(ROLES.ADMIN),
    asyncHandler(eventController.rejectEvent),
);

router.get(
    "/",
    authenticate,
    validate(getEventsSchema,"query"),
    asyncHandler(eventController.getEvents),
);

export default router;
