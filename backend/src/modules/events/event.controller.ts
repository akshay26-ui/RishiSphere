import { Request, Response } from "express";
import * as eventService from "./event.service.js";
import { AppError } from "../../utils/AppError.js";

export const createEvent = async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError("Unauthorized",403);
    }

    const result = await eventService.createEvent(
        req.user.enrollmentNumber,
        req.body,
    );

    res.status(201).json(result);
};

export const approveEvent = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const result = await eventService.approveEvent(req.params.id);
    res.status(200).json(result);
};

export const rejectEvent = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const result = await eventService.rejectEvent(req.params.id, req.body.reason);
    res.status(200).json(result);
};

export const getEvents = async (req: Request, res: Response) => {
    const { startDate, endDate, roomId, status, mine } = req.query;
    const result = await eventService.getEvents({
        startDate: startDate ? new Date(startDate as string) : undefined,
        endDate: endDate ? new Date(endDate as string) : undefined,
        roomId: roomId as string,
        status: status as string,
        organizerEnrollmentNumber:
            mine === "true" && req.user ? req.user.enrollmentNumber : undefined,
    });
    res.status(200).json(result);
};
