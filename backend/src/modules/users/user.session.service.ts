import { db } from "../../db/index.js";
import { sessions } from "../../db/schema/sessions.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
} from "../../utils/token.js";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { AppError } from "../../utils/AppError.js";

// Create a new session
export const createSession = async ({
    userEnrollmentNumber,
    refreshToken,
    userAgent,
    ipAddress,
    expiresAt,
}: any) => {
    const refreshTokenHash = await hashPassword(refreshToken);
    return db
        .insert(sessions)
        .values({
            userEnrollmentNumber,
            refreshTokenHash,
            userAgent,
            ipAddress,
            expiresAt,
        })
        .returning();
};

// Find a session by refresh token
export const findSessionByRefreshToken = async (refreshToken: string) => {
    const allSessions = await db.select().from(sessions);

    for (const session of allSessions) {
        const isMatch = await comparePassword(
            refreshToken,
            session.refreshTokenHash,
        );

        if (isMatch) {
            return session;
        }
    }
    return null;
};

// Delete a session by ID
export const deleteSession = async (sessionId: string) => {
    return db.delete(sessions).where(eq(sessions.id, sessionId));
};

// Refresh access token using refresh token
export const refreshAccessToken = async (
    refreshToken: string,
    metadata: { userAgent?: string; ipAddress?: string },
) => {
    //Missing token
    if (!refreshToken) {
        throw new AppError("Refresh token is required", 400);
    }

    //Verify the refresh token
    const decoded = verifyToken(refreshToken) as any;

    //Find the session in the database
    const session = await findSessionByRefreshToken(refreshToken);

    if (!session) {
        throw new AppError("Invalid Session", 401);
    }

    //Check if the refresh token is expired
    const isExpired = new Date() > session.expiresAt;

    if (isExpired) {
        await deleteSession(session.id);
        throw new AppError("Refresh token has expired", 401);
    }

    //Roate the refresh token by deleting the old session and creating a new one
    await deleteSession(session.id);

    // Payload
    const payload = {
        enrollmentNumber: decoded.enrollmentNumber,
        role: decoded.role,
    };

    // Generate NEW tokens
    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    // Store the new session in the database
    await createSession({
        userEnrollmentNumber: decoded.enrollmentNumber,
        refreshToken: newRefreshToken,
        userAgent: metadata.userAgent,
        ipAddress: metadata.ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
        success: true,
        message: "Token refreshed",
        data: {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        },
    };
};
