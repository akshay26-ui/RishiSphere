import { z } from "zod";

export const createRoomSchema = z.object({
    name: z.string().min(2),

    capacity: z.number().min(1),

    description: z.string().optional(),
});

export const updateRoomSchema = createRoomSchema.partial();
