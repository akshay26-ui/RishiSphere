import { pgTable ,uuid,  text , timestamp } from "drizzle-orm/pg-core";

export const sessions = pgTable("sessions", {
    id : uuid("id").primaryKey().defaultRandom(),
    userEnrollmentNumber : text("user_enrollment_number").notNull(),
    refreshTokenHash : text("refresh_token_hash").notNull(),
    userAgent : text("user_agent"),
    ipAddress : text("ip_address"),
    createdAt : timestamp("created_at").defaultNow(),
    expiresAt : timestamp("expires_at").notNull()
})
