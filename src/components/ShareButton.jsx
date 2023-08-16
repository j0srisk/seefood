const ShareButton = ({ handleNoThanks }) => {
	return (
		<div className="absolute bottom-0 flex w-full flex-col justify-center px-20 pb-5">
			<button className="items-center justify-center rounded-2xl border-2 border-white bg-custom-blue px-5 py-4 text-center font-inter text-4xl font-extrabold text-white">
				Share
			</button>
			<p
				className="cursor-pointer p-5 text-center font-inter text-xl font-semibold text-white"
				onClick={handleNoThanks}
			>
				No Thanks
			</p>
		</div>
	);
};

export default ShareButton;
