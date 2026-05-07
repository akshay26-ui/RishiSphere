import { relations } from "drizzle-orm";
import { sessions } from "../schema/sessions.js"; 
import { users } from "../schema/users.js";

export const userRelations = relations(users, ({many}) => ({
    sessions : many(sessions)
}))

