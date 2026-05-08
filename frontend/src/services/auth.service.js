import api from "../api/axios";

// register a new user
async function registerUser(data) {
    const res = await api.post("/users/register", data);
    return res.data;
}

// login a user
async function loginUser(data) {
    const res = await api.post("/users/login", data);
    return res.data;
}

export { registerUser, loginUser };
