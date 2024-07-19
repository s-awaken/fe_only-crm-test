import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
	createBrowserRouter,
	Navigate,
	Outlet,
} from 'react-router-dom';

import { useBoundStore } from '../store/store';
import Layout from '../components/organisms/Layout';
import Login from '../components/pages/login.page';
import MainPage from '../components/pages/main.page';
import UsersListPage from '../components/pages/users/users.page';

export const App = () => {
	const navigate = useNavigate();
	const access_token = useBoundStore((state) => state?.access_token);
	if (!access_token) {
		navigate('/login');
		return <Navigate to="/login" />;
	}
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
};

export const MainRoutes = () => {
	const navigate = useNavigate();
	const access_token = useBoundStore((state) => state?.access_token);
	if (!access_token) {
		navigate('/login');
		return <Navigate to="/login" />;
	}
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/users" element={<UsersListPage />} />
			<Route path="login" element={<Login />} />
		</Routes>
	);
};
export const AppRouter = createBrowserRouter([
	{
		path: '*',
		Component: App,
		children: [{ path: '*', Component: MainRoutes }],
	},
	{ path: 'login', Component: Login },
]);
