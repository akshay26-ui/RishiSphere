import api from "../api/axios";

// create a new event
async function createEvent(data) {
    const res = await api.post("/events", data);
    return res.data;
}

// get all events (can pass filters like status, mine, etc)
async function getEvents(filters) {
    const res = await api.get("/events", { params: filters });
    return res.data;
}

// get rooms that are already booked for a time
async function getUnavailableRooms(startTime, endTime) {
    const res = await api.get("/rooms/unavailable", { params: { startTime, endTime } });
    return res.data;
}

// approve an event (admin only)
async function approveEvent(id) {
    const res = await api.patch(`/events/${id}/approve`);
    return res.data;
}

// reject an event (admin only)
async function rejectEvent(id, reason) {
    const res = await api.patch(`/events/${id}/reject`, { reason });
    return res.data;
}

export { createEvent, getEvents, getUnavailableRooms, approveEvent, rejectEvent };

