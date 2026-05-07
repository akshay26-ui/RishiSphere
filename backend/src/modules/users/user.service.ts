import { db } from "../../db/index.js";
import { users } from "../../db/schema/users.js";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import {
    generateRefreshToken,
    generateAccessToken,
} from "../../utils/token.js";
import type { RegisterUserInput, LoginUserInput } from "./user.types.js";
import {
    findSessionByRefreshToken,
    deleteSession,
    createSession,
} from "./user.session.service.js";
import { AppError } from "../../utils/AppError.js";

export const registerUser = async (data: RegisterUserInput) => {
    //Checking existing users
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, data.email));

    if (existingUser.length) {
        throw new AppError("User with this email already exists", 409);
    }

    //Hash the passwords
    const hashedPassword = await hashPassword(data.password);

    // creating user
    const user = await db
        .insert(users)
        .values({ ...data, password: hashedPassword })
        .returning();

    return {
        success: true,
        message: "User registered successfully",
        data: user[0],
    };
};

export const loginUser = async (
    data: LoginUserInput,
    metadata: { userAgent?: string; ipAddress?: string },
) => {
    //Find user by emails
    const user = await db.select().from(users).where(eq(users.email, data.email));

    if (!user.length) {
        throw new AppError("User not found", 404);
    }

    //compare the password's
    const isPasswordCorrect = await comparePassword(
        data.password,
        user[0].password,
    );

    if (!isPasswordCorrect) {
        throw new AppError("Invalid credentials", 401);
    }

    //create a payload
    const payload = {
        enrollmentNumber: user[0].enrollmentNumber,
        role: user[0].role,
    };

    //generate token's
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    //store the session in databased
    await createSession({
        userEnrollmentNumber: user[0].enrollmentNumber,
        refreshToken,
        userAgent: metadata.userAgent,
        ipAddress: metadata.ipAddress,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return {
        success: true,
        message: "Login successful",
        data: {
            accessToken,
            refreshToken,
            user: {
                enrollmentNumber: user[0].enrollmentNumber,
                name: user[0].name,
                email: user[0].email,
                role: user[0].role,
            },
        },
    };
};

export const logoutUser = async (refreshToken: string) => {
    const session = await findSessionByRefreshToken(refreshToken);

    if (!session) {
        return;
    }

    await deleteSession(session.id);
};
