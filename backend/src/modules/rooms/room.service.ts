import { db } from "../../db/index.js";
import { rooms } from "../../db/schema/rooms.js";
import type { CreateRoomInput, UpdateRoomInput } from "./room.types.js";
import { and, eq, gt, lt, inArray } from "drizzle-orm"; import { events } from "../../db/schema/events.js";
import { EVENT_STATUS } from "../../constants/eventStatus.js";

export const createRoom = async (data: CreateRoomInput) => {
    // Check duplicate name
    const existingRoom = await db
        .select()
        .from(rooms)
        .where(eq(rooms.name, data.name));

    if (existingRoom.length) {
        throw new Error("Room already exists");
    }

    const room = await db.insert(rooms).values(data).returning();

    return {
        success: true,

        message: "Room created successfully",

        data: room[0],
    };
};

export const getAllRooms = async () => {
    const allRooms = await db.select().from(rooms);

    return {
        success: true,

        data: allRooms,
    };
};

export const updateRoom = async (
    roomId: string,

    data: UpdateRoomInput,
) => {
    const updatedRoom = await db
        .update(rooms)
        .set(data)
        .where(eq(rooms.id, roomId))
        .returning();

    if (!updatedRoom.length) {
        throw new Error("Room not found");
    }

    return {
        success: true,

        message: "Room updated successfully",

        data: updatedRoom[0],
    };
};

export const deleteRoom = async (roomId: string) => {
    const deletedRoom = await db
        .delete(rooms)
        .where(eq(rooms.id, roomId))
        .returning();

    if (!deletedRoom.length) {
        throw new Error("Room not found");
    }

    return {
        success: true,

        message: "Room deleted successfully",
    };
};

export const getUnavailableRooms = async ({
    startTime,
    endTime,
}: {
    startTime: Date;

    endTime: Date;
}) => {
    // Find conflicting events
    const conflictingEvents = await db
        .select({
            roomId: events.roomId,
        })
        .from(events)
        .where(
            and(
                eq(events.status, EVENT_STATUS.APPROVED),

                lt(events.startTime, endTime),

                gt(events.endTime, startTime),
            ),
        );

    // Extract room IDs
    const roomIds = conflictingEvents.map((event) => event.roomId);

    // No conflicts
    if (!roomIds.length) {
        return {
            success: true,

            data: [],
        };
    }

    // Get full room details
    const unavailableRooms = await db
        .select()
        .from(rooms)
        .where(inArray(rooms.id, roomIds));

    return {
        success: true,

        data: unavailableRooms,
    };
};
