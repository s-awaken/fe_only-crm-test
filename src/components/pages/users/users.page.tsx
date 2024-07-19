import React, { useEffect, useState } from 'react';
import { useBoundStore } from '../../../store/store';
import axios from 'axios';
import { api } from '../../../api/api-list';
import { appAxios } from '../../../api/axios.config';
import UpdateUserModal from './update-user.modal';
import CreateUserModal from './create-user.modal';

export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	createdAt: string;
}

const UserListPage: React.FC = () => {
	const access_token = useBoundStore((state) => state?.access_token);

	const [users, setUsers] = useState<User[]>([]);
	const [openUser, setOpenUser] = useState<User>();
	const [openUpdate, setOpenUpdate] = useState(false);
	const [openCreate, setOpenCreate] = useState(false);

	useEffect(() => {
		appAxios
			.get(api.users.list, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then((res) => {
				setUsers(res.data);
			});
	}, []);

	const handleDelete = (userId: string) => {
		axios
			.delete(api.users.delete + `/${userId}`, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then(() => {
				setUsers(users?.filter((user) => user.id !== userId));
			});
	};
	const handleUpdateUser = (user: User) => {
		setUsers(users.map((u) => (u.id === user.id ? user : u)));
	};

	const handleOpenUpdate = (id: string) => {
		// open modal
		setOpenUser(users.find((user) => user.id === id));
		setOpenUpdate(true);
	};
	const handleOpenCreate = () => {
		// open modal
		setOpenCreate(true);
	};

	return (
		<div className="space-y-4 divide-y divide-solid divide-black min-w-full">
			<div className="flex justify-between">
				<h1 className="text-2xl font-semibold leading-6 text-gray-900">
					Users
				</h1>
				<button
					onClick={handleOpenCreate}
					className="text-green-500 hover:text-green-700"
				>
					Create User
				</button>
			</div>
			<ul role="list" className="divide-y divide-gray-200">
				{users.map((user) => (
					<li key={user.email} className="flex justify-between gap-x-6 py-5">
						<div className="flex min-w-0 gap-x-4">
							<div className="min-w-0 flex-auto">
								<p className="text-sm font-semibold leading-6 text-gray-900">
									{user.username}
								</p>
								<p className="mt-1 truncate text-xs leading-5 text-gray-500">
									{user.email}
								</p>
							</div>
						</div>
						<div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
							{user.createdAt ? (
								<p className="mt-1 text-xs leading-5 text-gray-500">
									Created at{' '}
									<time dateTime={user.createdAt.toString()}>
										{new Date(user.createdAt).toLocaleString()}
									</time>
								</p>
							) : (
								<div className="mt-1 flex items-center gap-x-1.5">
									<div className="flex-none rounded-full bg-emerald-500/20 p-1">
										<div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
									</div>
									<p className="text-xs leading-5 text-gray-500">Online</p>
								</div>
							)}
						</div>
						<div className="space-x-2">
							<button
								onClick={() => handleOpenUpdate(user.id)}
								className="text-yellow-500 hover:text-blue-700"
							>
								Update
							</button>
							<button
								onClick={() => handleDelete(user.id)}
								className="text-red-500 hover:text-red-700"
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
			<UpdateUserModal
				open={openUpdate}
				setOpen={setOpenUpdate}
				user={openUser}
				setUser={handleUpdateUser}
			/>
			<CreateUserModal open={openCreate} setOpen={setOpenCreate} />
		</div>
	);
};

export default UserListPage;
