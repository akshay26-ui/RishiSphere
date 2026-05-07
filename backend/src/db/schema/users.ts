import { pgTable , boolean, text , timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    enrollmentNumber : text("enrollmentNumber").primaryKey(),
    name : text("name").notNull(),
    email : text("email").notNull().unique(),
    password : text("password").notNull(),
    role: text("role").notNull().default("student"),
    isVerified : boolean("is_verified").notNull().default(false),
    createdAt : timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
})
