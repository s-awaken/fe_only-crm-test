import { useNavigate } from 'react-router-dom';
import { useBoundStore } from '../../store/store';
import { api } from '../../api/api-list';
import { appAxios } from '../../api/axios.config';

const Login = () => {
	const addBoth = useBoundStore((state) => state?.addBoth);
	const navigate = useNavigate();
	const handleLogin = async () => {
		try {
			console.log('logging in');
			const res = await appAxios.post(
				api.login,
				{
					email: 'john.doe@only-crm.com',
					password: 'password123',
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': 'http://localhost:3000',
					},
				}
			);
			addBoth({ user: res.data.user, token: res.data.access_token });
			navigate('/');
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form action="#" method="POST" className="space-y-6">
						<div>
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
									required
									autoComplete="email"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									required
									autoComplete="current-password"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								onClick={handleLogin}
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
