import axios from "axios";

const getBaseURL = () => {
	if (import.meta.env.MODE === "development") {
		return "http://localhost:5000/api";
	}
	return import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api` : "/api";
};

const axiosInstance = axios.create({
	baseURL: getBaseURL(),
	withCredentials: true, // send cookies to the server
});

export default axiosInstance;
