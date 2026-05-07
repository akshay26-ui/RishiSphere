import { relations } from "drizzle-orm";

import { events } from "../schema/events.js";

import { users } from "../schema/users.js";

import { rooms } from "../schema/rooms.js";

export const eventsRelations = relations(events, ({ one }) => ({
    organizer: one(users, {
        fields: [events.organizerEnrollmentNumber],

        references: [users.enrollmentNumber],
    }),

    room: one(rooms, {
        fields: [events.roomId],

        references: [rooms.id],
    }),
}));
