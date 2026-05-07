import { db } from "../../db/index.js";
import { events } from "../../db/schema/events.js";
import type { CreateEventInput } from "./event.types.js";
import { eq, and, lt, gt, inArray, gte, lte } from "drizzle-orm";
import { EVENT_STATUS } from "../../constants/eventStatus.js";
import { rooms } from "../../db/schema/rooms.js";
import { getUnavailableRooms } from "../rooms/room.service.js";

export const createEvent = async (
    organizerEnrollmentNumber: string,
    data: CreateEventInput,
) => {
    const event = await db
        .insert(events)
        .values({
            title: data.title,
            description: data.description,
            roomId: data.roomId,
            organizerEnrollmentNumber,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
        })
        .returning();

    return {
        success: true,
        message: "Event request created",
        data: event[0],
    };
};

export const approveEvent = async (eventId: string) => {
    const event = await db.select().from(events).where(eq(events.id, eventId));
    if (!event.length) {
        throw new Error("Event not found");
    }

    const currentEvent = event[0];

    //already approve
    if (currentEvent.status === EVENT_STATUS.APPROVED) {
        throw new Error("Event already approved");
    }

    //check if room is available
    const unavailableRooms = await getUnavailableRooms({
        startTime: currentEvent.startTime,
        endTime: currentEvent.endTime,
    });
    const isRoomUnavailable = unavailableRooms.data.some(
        (e) => e.id === currentEvent.roomId,
    );

    if (isRoomUnavailable) {
        throw new Error("Room is not available for the selected time");
    }

    //approve event
    const approvedEvent = await db
        .update(events)
        .set({ status: EVENT_STATUS.APPROVED })
        .where(eq(events.id, eventId))
        .returning();

    return {
        success: true,
        message: "Event approved successfully",
        data: approvedEvent[0],
    };
};

export const rejectEvent = async (eventId: string, rejectionReason: string) => {
    const event = await db.select().from(events).where(eq(events.id, eventId));
    if (!event.length) {
        throw new Error("Event not found");
    }

    const currentEvent = event[0];

    //already reject
    if (currentEvent.status === EVENT_STATUS.REJECTED) {
        throw new Error("Event already rejected");
    }

    //reject event
    const rejectedEvent = await db
        .update(events)
        .set({ status: EVENT_STATUS.REJECTED, rejectionReason })
        .where(eq(events.id, eventId))
        .returning();

    return {
        success: true,
        message: "Event rejected successfully",
        data: rejectedEvent[0],
    };
};
export const getEvents = async ({
    startDate,
    endDate,
    roomId,
    status,
    organizerEnrollmentNumber,
}: {
    startDate?: Date;
    endDate?: Date;
    roomId?: string;
    status?: string;
    organizerEnrollmentNumber?: string;
}) => {
    const conditions = [];

    // Date filters
    if (startDate) {
        conditions.push(gte(events.startTime, startDate));
    }

    if (endDate) {
        conditions.push(lte(events.endTime, endDate));
    }

    // Room filter
    if (roomId) {
        conditions.push(eq(events.roomId, roomId));
    }

    // Status filter
    if (status) {
        conditions.push(eq(events.status, status));
    }

    // Mine filter
    if (organizerEnrollmentNumber) {
        conditions.push(
            eq(
                events.organizerEnrollmentNumber,
                organizerEnrollmentNumber,
            ),
        );
    }

    const queriedEvents = await db
        .select()
        .from(events)
        .where(conditions.length ? and(...conditions) : undefined);

    return {
        success: true,

        data: queriedEvents,
    };
};
