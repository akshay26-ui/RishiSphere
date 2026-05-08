import api from "../api/axios";

export const createEvent = async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
};

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

export const getEvents = async (params) => {
    const response = await api.get("/events", { params });
    return response.data;
};

export const approveEvent = async (eventId) => {
    const response = await api.patch(`/events/${eventId}/approve`);
    return response.data;
};

export const rejectEvent = async (eventId, reason) => {
    const response = await api.patch(`/events/${eventId}/reject`, { reason });
    return response.data;
};
