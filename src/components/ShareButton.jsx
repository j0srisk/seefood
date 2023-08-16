const ShareButton = ({ handleNoThanks }) => {
	return (
		<div className="absolute bottom-0 flex w-full flex-col justify-center px-20">
			<button className="rounded-xl border-2 border-white bg-custom-blue p-5 text-center text-3xl font-extrabold text-white">
				Share
			</button>
			<p
				className="cursor-pointer p-5 text-center text-xl font-semibold text-white"
				onClick={handleNoThanks}
			>
				No Thanks
			</p>
		</div>
	);
};

export default ShareButton;
