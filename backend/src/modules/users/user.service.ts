import { db } from "../../db/index.js";
import { users } from "../../db/schema/users.js";

export const createUser = async(data:any) => {
    return await db
    .insert(users)
    .values(data)
    .returning();
}
