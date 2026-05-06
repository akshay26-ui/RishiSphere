import dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL

const client = postgres(DATABASE_URL!)
export const db = drizzle(client)


