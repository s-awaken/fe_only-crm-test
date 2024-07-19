import { useBoundStore } from '../../../store/store';

export default function UserPage() {
	const access_token = useBoundStore((state) => state?.access_token);
	const user = JSON.parse(useBoundStore((state) => state?.user));

	return (
		<div className="inset-0 z-10">
			<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
				<div className="divide-y ">
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium  text-gray-900">Username</dt>
						<dd className="mt-1 text-sm  text-gray-700 sm:col-span-2 sm:mt-0">
							{user?.username}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium  text-gray-900">Email</dt>
						<dd className="mt-1 text-sm  text-gray-700 sm:col-span-2 sm:mt-0">
							{user?.email}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium  text-gray-900">Password</dt>
						<dd className="mt-1 text-sm  text-gray-700 sm:col-span-2 sm:mt-0">
							{user?.password}
						</dd>
					</div>
					<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
						<dt className="text-sm font-medium  text-gray-900">Created At</dt>
						<dd className="mt-1 text-sm  text-gray-700 sm:col-span-2 sm:mt-0">
							{new Date(user.createdAt).toLocaleString()}
						</dd>
					</div>
				</div>
			</div>
		</div>
	);
}
