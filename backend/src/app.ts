import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middleware/error.middleware.js";

import userRoutes from "./modules/users/user.routes.js";
import roomRoutes from "./modules/rooms/room.routes.js";
import eventRoutes from "./modules/events/event.routes.js";

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
// Error handling middleware should be registered after all other middleware and routes
app.use(errorMiddleware);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/events", eventRoutes);

export default app;
