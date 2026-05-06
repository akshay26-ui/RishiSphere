import { pgTable , integer , text , timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    en : integer("en").primaryKey(),
    name : text("name").notNull(),
    email : text("email").notNull().unique(),
    password : text("password").notNull(),
    createdAt : timestamp("created_at").defaultNow()
})
