import axios from 'axios';

export const appAxios = axios.create({
	baseURL: 'http://localhost:3000',
});
appAxios.interceptors.response.use(
	(res) => {
		return res;
	},
	(error) => {
		if (error.response.status === 401) {
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);
