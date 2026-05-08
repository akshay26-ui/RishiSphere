// src/services/room.service.js

import api from "../api/axios";

// Get all rooms
export const getRooms = async () => {
    const response = await api.get("/rooms");

    return response.data;
};

// Get unavailable rooms
export const getUnavailableRooms = async ({ startTime, endTime }) => {
    const response = await api.get(
        "/rooms/unavailable",

        {
            params: {
                startTime,
                endTime,
            },
        },
    );

    return response.data;
};

// Get single room
export const getRoomById = async (roomId) => {
    const response = await api.get(`/rooms/${roomId}`);

    return response.data;
};
