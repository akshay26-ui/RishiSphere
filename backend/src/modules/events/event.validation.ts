import { z } from "zod";

export const createEventSchema = z
    .object({
        title: z.string().min(3),
        description: z.string().optional(),
        type: z.string(),
        roomId: z.uuid(),
        startTime: z.iso.datetime(),
        endTime: z.iso.datetime(),
    })
    .refine(
        (data) => {
            return new Date(data.endTime) > new Date(data.startTime);
        },

        {
            message: "End time must be after start time",
            path: ["endTime"],
        },
    );

export const roomAvailabilitySchema = z
    .object({
        startTime: z.iso.datetime(),
        endTime: z.iso.datetime(),
    })
    .refine(
        (data) => {
            return new Date(data.endTime) > new Date(data.startTime);
        },
        {
            message: "End time must be after start time",
            path: ["endTime"],
        },
    );

export const getEventsSchema = z.object({
    startDate: z.iso.datetime().optional(),
    endDate: z.iso.datetime().optional(),
    roomId: z.uuid().optional(),
    status: z.string().optional(),
    mine: z.enum(["true", "false"]).optional(),
});
