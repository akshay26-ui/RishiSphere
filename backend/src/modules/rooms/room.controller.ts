import { Request, Response } from "express";
import * as roomService from "./room.service.js";
import { AppError } from "../../utils/AppError.js";

export const createRoom = async (req: Request, res: Response) => {
    const result = await roomService.createRoom(req.body);
    res.status(201).json(result);
};

export const getAllRooms = async (req: Request, res: Response) => {
    const result = await roomService.getAllRooms();
    res.status(200).json(result);
};

export const updateRoom = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const result = await roomService.updateRoom(req.params.id, req.body);
    res.status(200).json(result);
};

export const deleteRoom = async (
    req: Request<{ id: string }>,
    res: Response,
) => {
    const roomId = req.params.id;
    if (!roomId) {
        throw new AppError("Room ID missing",400);
    }
    const result = await roomService.deleteRoom(roomId);
    res.status(200).json(result);
};

export const getUnavailableRooms = async (req: Request, res: Response) => {
    const { startTime, endTime } = req.query;
    const result = await roomService.getUnavailableRooms({
        startTime: new Date(startTime as string),
        endTime: new Date(endTime as string),
    });
    res.status(200).json(result);
};
