import axios from "axios";

// main api object
const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

// add token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// if server says 401, try to refresh token
api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const req = error.config;

        if (error.response?.status === 401 && !req._retry) {
            req._retry = true;

            try {
                // get new token using refresh cookie
                const res = await axios.post("http://localhost:3000/api/users/refresh", {}, { withCredentials: true });
                const newToken = res.data.data.accessToken;

                localStorage.setItem("accessToken", newToken);
                req.headers.Authorization = `Bearer ${newToken}`;

                // retry original request
                return api(req);
            } catch (err) {
                // refresh also failed, kick user to login
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;
