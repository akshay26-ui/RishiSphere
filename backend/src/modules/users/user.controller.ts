import { Request, Response } from "express";
import * as userService from "./user.service.js";
import { refreshTokenCookieOptions } from "../../config/cookies.js";
import * as sessionService from "./user.session.service.js";

// This function handles user registration. It receives the registration data from the request body, calls the user service to register the user, and sends the result in the response.
export const registerUser = async (req: Request, res: Response) => {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result);
};

// This function handles user login. It receives the login credentials from the request body, calls the user service to authenticate the user, and sends the result in the response. It also sets a refresh token cookie for session management.
export const loginUser = async (req: Request, res: Response) => {
    const result = await userService.loginUser(req.body, {
        userAgent: req.headers["user-agent"] || "",
        ipAddress: req.ip,
    });

    res.cookie(
        "refreshToken",
        result.data.refreshToken,
        refreshTokenCookieOptions,
    );

    const { refreshToken, ...responseData } = result.data;

    res.status(201).json({ ...result, data: responseData });
};

// This function handles the refreshing of access tokens. It retrieves the refresh token from the request cookies, calls the session service to refresh the access token, and sends the new access token in the response.
export const refreshAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    const result = await sessionService.refreshAccessToken(refreshToken, {
        userAgent: req.headers["user-agent"] || "",
        ipAddress: req.ip,
    });

    res.cookie(
        "refreshToken",
        result.data.refreshToken,
        refreshTokenCookieOptions,
    );

    const { refreshToken: newRt, ...responseData } = result.data;

    res.status(200).json({ ...result, data: responseData });
};

// This function retrieves the current authenticated user's information. It assumes that the authentication middleware has already attached the user information to the request object and sends it in the response.
export const getCurrentUser = async (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Current user fetched",
        data: req.user,
    });
};

// This function handles user logout. It retrieves the refresh token from the request cookies, calls the user service to invalidate the session, clears the refresh token cookie, and sends a success message in the response.
export const logoutUser = async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    await userService.logoutUser(refreshToken);
    res.clearCookie("refreshToken");
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
};
