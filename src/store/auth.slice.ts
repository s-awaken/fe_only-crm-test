import { StateCreator } from 'zustand';

export interface TokenSlice {
	access_token: string;
	setToken: (token: string) => void;
}

export interface UserSlice {
	user: any;
	setUser: (user: any) => void;
}

export interface SharedSlice {
	addBoth: ({ token, user }: { token: string; user: any }) => void;
	getBoth: () => void;
}

export const accessTokenSlice: StateCreator<
	TokenSlice & UserSlice,
	[],
	[],
	TokenSlice
> = (set) => ({
	access_token: localStorage.getItem('access_token') || '',
	setToken: (token: string) =>
		set(() => {
			localStorage.setItem('access_token', token);
			return { access_token: token };
		}),
});

export const userSlice: StateCreator<
	TokenSlice & UserSlice,
	[],
	[],
	UserSlice
> = (set) => ({
	user: localStorage.getItem('user') || '',
	setUser: (user: any) => {
		localStorage.setItem('user', JSON.stringify(user));
		return set(() => ({ user }));
	},
});

export const createSharedSlice: StateCreator<
	TokenSlice & UserSlice,
	[],
	[],
	SharedSlice
> = (set, get) => ({
	addBoth: ({ token, user }) => {
		// you can reuse previous methods
		get().setToken(token);
		get().setUser(user);
	},
	getBoth: () => get().access_token + get().user,
});
