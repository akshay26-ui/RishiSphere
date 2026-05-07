import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const rooms = pgTable("rooms", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: text("name").notNull().unique(),

    capacity: integer("capacity").notNull(),

    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
});
