interface IMainProps {
	// Props
	children?: React.ReactNode;
}

const Main = ({ children }: IMainProps) => {
	return (
		<main>
			<div className="mx-auto">{children}</div>
		</main>
	);
};
export default Main;
