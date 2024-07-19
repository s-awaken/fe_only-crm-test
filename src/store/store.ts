import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import {
	accessTokenSlice,
	createSharedSlice,
	SharedSlice,
	TokenSlice,
	UserSlice,
	userSlice,
} from './auth.slice';

export const useBoundStore = create<UserSlice & TokenSlice & SharedSlice>()(
	(...a) => ({
		...userSlice(...a),
		...accessTokenSlice(...a),
		...createSharedSlice(...a),
	})
);
