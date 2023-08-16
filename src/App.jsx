import { useState } from "react";

function App() {
	const [image, setImage] = useState(null);
	const [hotdog, setHotdog] = useState(null);
	const [loading, setLoading] = useState(false);

	function handleImage(e) {
		if (e.target.files.length === 0) return;
		setLoading(true);
		const uploadedImage = e.target.files[0];
		setImage(URL.createObjectURL(uploadedImage));
		if (!uploadedImage) return;
		query(uploadedImage)
			.then((response) => {
				console.log(JSON.stringify(response));
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error.message);
				alert("Error: " + error.message);
				setImage(null);
				setLoading(false);
			});
	}

	async function query(file) {
		console.log("querying");

		const formData = new FormData();
		formData.append("file", file);
		formData.append("question", "Is this a Hot Dog?");

		const response = await fetch(`${import.meta.env.VITE_API_URL}/predict`, {
			headers: { "X-API-Key": import.meta.env.VITE_API_KEY },
			method: "POST",
			body: formData,
		});
		const result = await response.json();

		if (result.answer === "yes") {
			setHotdog(true);
		} else if (result.answer === "no") {
			setHotdog(false);
		} else {
			setHotdog(undefined);
		}
		return result;
	}

	return (
		<div className="flex h-screen items-center justify-center">
			<div className="relative flex h-[500px] w-[300px] flex-col rounded-xl shadow-2xl outline outline-4 outline-black">
				<div className="absolute left-0 top-0  flex h-full w-full items-center justify-center rounded-xl bg-custom-blue">
					<img src="perfecthotdog.png" className="object-contain p-4" />
				</div>
				<div
					className="absolute left-0 top-0 h-full w-full rounded-xl"
					style={{
						backgroundImage: `url(${image})`,
						backgroundSize: "cover", // Adjust this to control the image sizing
						backgroundPosition: "center", // Adjust this to control the image position
					}}
				></div>

				<div className="relative flex h-full w-full flex-col">
					{loading === true ? (
						<div className="flex h-14 w-full justify-center  border-b border-b-white ">
							<div className="absolute top-10 h-[80px] w-[80px] rounded-full border border-white bg-gray-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="animate-spin stroke-black stroke-[3.5] object-contain p-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
							</div>
							<div className="absolute top-10 h-[80px] w-[80px] rounded-full border border-white ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="animate-spin stroke-custom-yellow stroke-[2.5] object-contain p-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
							</div>
							<p className="z-10 flex h-full w-full items-center justify-center rounded-t-xl bg-gray-400 p-2 text-center text-2xl font-extrabold text-custom-yellow">
								Detecting
							</p>
						</div>
					) : hotdog === true ? (
						<div className="flex h-14 w-full justify-center  border-b border-b-white ">
							<div className="absolute top-10 h-[80px] w-[80px] rounded-full border border-white bg-custom-green">
								<img src="perfecthotdog.png" className="object-contain p-2" />
							</div>
							<p className="z-10 flex h-full w-full items-center justify-center rounded-t-xl bg-custom-green p-1 text-center text-2xl font-extrabold text-custom-yellow">
								Hotdog!
							</p>
						</div>
					) : hotdog === false ? (
						<div className="flex h-14 w-full justify-center  border-b border-b-white ">
							<div className="absolute top-10 h-[80px] w-[80px] rounded-full border border-white bg-custom-red">
								<img src="perfecthotdog.png" className="object-contain p-2" />
							</div>
							<div className="absolute top-10 h-[80px] w-[80px] rounded-full border border-white opacity-70">
								<img src="cross.png" className="object-contain p-4" />
							</div>
							<p className="z-10 flex h-full w-full items-center justify-center rounded-t-xl bg-custom-red p-2 text-center text-2xl font-extrabold text-custom-yellow">
								Not Hotdog!
							</p>
						</div>
					) : hotdog === undefined ? (
						<div className="flex h-14 w-full items-center justify-center rounded-t-xl border-b border-b-white bg-gray-400">
							<p className="p-2 text-center text-2xl  font-extrabold text-custom-yellow">Unknown</p>
						</div>
					) : (
						<div className="flex h-14 w-full justify-center  border-b border-b-white ">
							<div className="absolute top-10 h-[80px] w-[80px] rounded-full border border-white bg-gray-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="hidden stroke-black stroke-[3.5] object-contain p-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
									/>
								</svg>
							</div>
							<div className="absolute top-10 h-[80px] w-[80px] rounded-full border border-white ">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="stroke-custom-yellow stroke-[2.5] object-contain p-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
									/>
								</svg>
							</div>
							<p className=" z-10 flex h-full w-full items-center justify-center rounded-t-xl bg-gray-400 p-2 text-center text-2xl font-extrabold text-custom-yellow">
								Upload an Image
							</p>
						</div>
					)}

					<input
						type="file"
						id="single"
						accept="image/png, image/jpeg, image/webp"
						onChange={handleImage}
						className="w-full flex-1 bg-red-500 opacity-0"
						style={{
							backgroundImage: `url(${image})`,
							backgroundSize: "cover", // Adjust this to control the image sizing
							backgroundPosition: "center", // Adjust this to control the image position
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default App;
