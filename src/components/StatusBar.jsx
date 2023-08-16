const StatusBar = ({ children, status, backgroundColor }) => {
	return (
		<div className="flex h-20 w-full justify-center border-b-2 border-b-white ">
			<div
				className={`absolute top-14 z-10 h-[120px] w-[120px] rounded-full border-2 border-white ${backgroundColor}`}
			>
				{children}
			</div>
			<p
				className={`z-20 flex h-full w-full items-center justify-center  bg-custom-green p-1 text-center text-4xl font-extrabold text-custom-yellow ${backgroundColor}`}
			>
				{status}
			</p>
		</div>
	);
};

export default StatusBar;
