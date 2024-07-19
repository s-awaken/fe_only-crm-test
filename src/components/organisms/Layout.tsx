import {
	Disclosure,
	DisclosureButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

const user = {
	name: 'Tom Cook',
	email: 'tom@example.com',
	imageUrl:
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
	{ name: 'Dashboard', href: '/' },
	{ name: 'Users', href: '/users' },
];
const userNavigation = [
	{ name: 'Your Profile', href: '/profile' },
	{ name: 'Settings', href: '/settings' },
	{ name: 'Sign out', href: '/out' },
];

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ');
}

export default function Layout({ children }: { children: React.ReactNode }) {
	const location = useLocation();
	const navigate = useNavigate();

	return (
		<div className="flex flex-row h-screen">
			<div className="min-h-full flex flex-col">
				<Disclosure as="nav" className="bg-gray-800 flex flex-col min-h-full">
					<div className="my-auto max-w-7xl h-full space-y-2">
						<div className="flex flex-col h-full items-center justify-between">
							<div className="flex flex-col items-center justify-center">
								{/* IMAGE  */}
								<div className="flex-shrink-0 my-4 pr-12">
									<img
										className="h-8 w-8"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
										alt="Your Company"
									/>
								</div>
								{/* Navigation */}
								<div className="hidden md:block">
									<div className="mx-4 flex flex-col items-baseline space-y-4">
										{navigation.map((item) => (
											<a
												key={item.name}
												href={item.href}
												aria-current={
													item.href === location.pathname ? 'page' : undefined
												}
												className={classNames(
													item.href === location.pathname
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'rounded-md px-3 py-2 text-sm font-medium'
												)}
											>
												{item.name}
											</a>
										))}
									</div>
								</div>
							</div>
							<div className="hidden md:block">
								<div className="my-4 flex items-center">
									<button
										type="button"
										className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
									>
										<span className="absolute -inset-1.5" />
										<span className="sr-only">View notifications</span>
										<BellIcon className="h-6 w-6" aria-hidden="true" />
									</button>

									{/* Profile dropdown */}
									<Menu as="div" className="relative ml-3">
										<div>
											<MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
												<span className="absolute -inset-5" />
												<span className="sr-only">Open user menu</span>
												<img
													className="h-8 w-8 rounded-full"
													src={user.imageUrl}
													alt=""
												/>
											</MenuButton>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<MenuItems className="absolute left-12 bottom-1 z-10 ml-2 mt-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
												{userNavigation.map((item) => (
													<MenuItem key={item.name}>
														{({ active }) => (
															<div
																onClick={() => navigate(item.name)}
																className={`${classNames(
																	active ? 'bg-gray-100' : '',
																	'block px-4 py-2 text-sm text-gray-700'
																)} cursor-pointer`}
															>
																{item.name}
															</div>
														)}
													</MenuItem>
												))}
											</MenuItems>
										</Transition>
									</Menu>
								</div>
							</div>
							<div className="-mr-2 flex md:hidden">
								{/* Mobile menu button */}
								<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
									<span className="absolute -inset-0.5" />
									<span className="sr-only">Open main menu</span>
									<Bars3Icon
										aria-hidden="true"
										className="block h-6 w-6 group-data-[open]:hidden"
									/>
									<XMarkIcon
										aria-hidden="true"
										className="hidden h-6 w-6 group-data-[open]:block"
									/>
								</DisclosureButton>
							</div>
						</div>
					</div>
				</Disclosure>
			</div>
			<main>
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					{children}
				</div>
			</main>
		</div>
	);
}
