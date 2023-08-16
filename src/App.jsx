import { useEffect, useState } from "react";
import StatusBar from "./components/StatusBar";
import ShareButton from "./components/ShareButton";

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

	function handleNoThanks() {
		setImage(null);
		setHotdog(null);
		const body = document.querySelector("body");
		body.classList.add("bg-gray-400");
	}

	{
		/*Changes body color to match application for iOS PWA status bar  */
	}
	function updateBodyColor() {
		const body = document.querySelector("body");
		if (loading === true) {
			body.classList.remove("bg-custom-green");
			body.classList.remove("bg-custom-red");
			body.classList.remove("bg-custom-yellow");
			body.classList.add("bg-gray-400");
			body.classList.add("lg:bg-white");
		} else if (hotdog === true) {
			body.classList.add("bg-custom-green");
			body.classList.remove("bg-custom-red");
			body.classList.remove("bg-custom-yellow");
			body.classList.remove("bg-gray-400");
			body.classList.add("lg:bg-white");
		} else if (hotdog === false) {
			body.classList.remove("bg-custom-green");
			body.classList.add("bg-custom-red");
			body.classList.remove("bg-custom-yellow");
			body.classList.remove("bg-gray-400");
			body.classList.add("lg:bg-white");
		} else {
			body.classList.remove("bg-custom-green");
			body.classList.remove("bg-custom-red");
			body.classList.remove("bg-custom-yellow");
			body.classList.add("bg-gray-400");
			body.classList.add("lg:bg-white");
		}
	}

	useEffect(() => {
		updateBodyColor();
	}, [loading]);

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
		<div className="fixed flex h-[100svh] w-full items-center justify-center overscroll-none lg:flex-col">
			<div className="relative flex h-full w-full flex-col lg:my-8 lg:aspect-[9/16] lg:w-auto lg:flex-1 lg:rounded-xl lg:shadow-2xl lg:outline lg:outline-2 lg:outline-white">
				<div
					className="absolute left-0 top-0 h-full w-full "
					style={{
						backgroundImage: `url(${image})`,
						backgroundSize: "cover", // Adjust this to control the image sizing
						backgroundPosition: "center", // Adjust this to control the image position
					}}
				></div>

				<div className="relative flex h-full w-full flex-col">
					{loading === true ? (
						<div className="relative flex h-full w-full flex-col items-center justify-between ">
							<StatusBar status={"Loading..."} backgroundColor={"bg-gray-400"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="animate-spin stroke-custom-yellow stroke-[2.5] object-contain p-8"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
							</StatusBar>
						</div>
					) : hotdog === true ? (
						<div className="relative flex h-full w-full flex-col items-center justify-between ">
							<StatusBar status={"Hotdog!"} backgroundColor={"bg-custom-green"}>
								<img src="HotDog100.png" className="object-contain p-2" />
							</StatusBar>
							<ShareButton handleNoThanks={handleNoThanks} />
						</div>
					) : hotdog === false ? (
						<div className="relative flex h-full w-full flex-col items-center justify-between ">
							<StatusBar status={"Not Hotdog!"} backgroundColor={"bg-custom-red"}>
								<img src="HotDog100.png" className="object-contain p-2" />
							</StatusBar>
							<ShareButton handleNoThanks={handleNoThanks} />
						</div>
					) : hotdog === undefined ? (
						<div className="relative flex h-full w-full flex-col items-center justify-between ">
							<StatusBar status={"Unknown"} backgroundColor={"bg-gray-400"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="animate-spin stroke-custom-yellow stroke-[2.5] object-contain p-8"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
									/>
								</svg>
							</StatusBar>
							<ShareButton handleNoThanks={handleNoThanks} />
						</div>
					) : (
						<div className="relative flex h-full w-full flex-col items-center justify-between ">
							<StatusBar status={"Tap to Upload!"} backgroundColor={"bg-gray-400"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									className="stroke-custom-yellow stroke-[2] object-contain p-8"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
									/>
								</svg>
							</StatusBar>
							<div className="relative flex h-full  w-full items-center justify-center  bg-custom-blue lg:rounded-xl">
								<img src="HotDog2000.png" className="max-w-[300px] object-scale-down p-4" />
							</div>
							<input
								type="file"
								id="single"
								accept="image/png, image/jpeg, image/webp"
								onChange={handleImage}
								className="absolute z-10 h-full w-full flex-1 bg-red-500 opacity-0"
								style={{
									backgroundImage: `url(${image})`,
									backgroundSize: "cover", // Adjust this to control the image sizing
									backgroundPosition: "center", // Adjust this to control the image position
								}}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
