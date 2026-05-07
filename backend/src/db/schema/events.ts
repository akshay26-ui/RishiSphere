import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

import { EVENT_STATUS } from "../../constants/eventStatus.js"; 

export const events = pgTable("events", {
    id: uuid("id").defaultRandom().primaryKey(),

    title: text("title").notNull(),

    description: text("description"),

    organizerEnrollmentNumber: text("organizer_enrollment_number").notNull(),

    roomId: uuid("room_id").notNull(),

    startTime: timestamp("start_time").notNull(),

    endTime: timestamp("end_time").notNull(),

    status: text("status").default(EVENT_STATUS.PENDING).notNull(),

    rejectionReason: text("rejection_reason"),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
