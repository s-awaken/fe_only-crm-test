export const base = 'http://localhost:3000/api';

export const api = {
	login: base + '/v1/auth/login',
	users: {
		list: base + '/v1/users',
		create: base + '/v1/users',
		update: base + '/v1/users',
		delete: base + '/v1/users',
	},
};
