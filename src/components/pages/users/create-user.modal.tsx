import { useState } from 'react';
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import { User } from './users.page';
import { appAxios } from '../../../api/axios.config';
import { api } from '../../../api/api-list';
import { useBoundStore } from '../../../store/store';

interface CreateUserModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export default function CreateUserModal({
	open,
	setOpen,
}: CreateUserModalProps) {
	const access_token = useBoundStore((state) => state?.access_token);
	const [newUser, setNewUser] = useState<User>({
		id: '',
		username: '',
		email: '',
		password: '',
		createdAt: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const key: string = e.target.name;
		const value: string = e.target.value;
		setNewUser((prevUser: User) => ({ ...prevUser, [key]: value }));
	};

	const handleSubmmit = async () => {
		const body: { [key: string]: any } = {};
		if (newUser.username) body.username = newUser.username;
		if (newUser.email) body.email = newUser.email;
		if (newUser.password) body.password = newUser.password;
		appAxios
			.post(api.users.create, body, {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={setOpen} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
					>
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
								<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
									<DialogTitle
										as="h3"
										className="text-base font-semibold leading-6 text-gray-900"
									>
										Create User
									</DialogTitle>
									{/* UserName */}
									<div className="mt-2">
										{/* UserName */}
										<div className="sm:col-span-4">
											<label
												htmlFor="username"
												className="block text-sm font-medium leading-6 text-gray-900"
											>
												Username
											</label>
											<div className="mt-2">
												<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
													<input
														id="username"
														name="username"
														type="text"
														autoComplete="username"
														onChange={(e) => handleChange(e)}
														className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
													/>
												</div>
											</div>
										</div>
									</div>
									{/* Email */}
									<div className="sm:col-span-4">
										<label
											htmlFor="email"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Email address
										</label>
										<div className="mt-2">
											<input
												id="email"
												name="email"
												type="email"
												autoComplete="email"
												onChange={(e) => handleChange(e)}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
									{/* Password */}
									<div className="sm:col-span-4">
										<label
											htmlFor="password"
											className="block text-sm font-medium leading-6 text-gray-900"
										>
											Password
										</label>
										<div className="mt-2">
											<input
												id="password"
												name="password"
												type="password"
												autoComplete="password"
												onChange={(e) => handleChange(e)}
												className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								onClick={() => handleSubmmit()}
								className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
							>
								Confirm
							</button>
							<button
								type="button"
								data-autofocus
								onClick={() => setOpen(false)}
								className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
