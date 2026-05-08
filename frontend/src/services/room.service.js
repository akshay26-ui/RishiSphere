import api from "../api/axios";

// get all rooms
async function getRooms() {
    const res = await api.get("/rooms");
    return res.data;
}

// get a single room by id
async function getRoomById(id) {
    const res = await api.get(`/rooms/${id}`);
    return res.data;
}

export { getRooms, getRoomById };
