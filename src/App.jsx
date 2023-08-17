import { useEffect, useState } from "react";
import StatusBar from "./components/StatusBar";
import ShareButton from "./components/ShareButton";
import Compressor from "compressorjs";

function App() {
	const [image, setImage] = useState(null);
	const [hotdog, setHotdog] = useState(null);
	const [loading, setLoading] = useState(false);

	function handleImage(e) {
		if (e.target.files.length === 0) return;
		setLoading(true);
		const uploadedImage = e.target.files[0];
		console.log(uploadedImage);
		setImage(URL.createObjectURL(uploadedImage));

		if (!uploadedImage) return;

		new Compressor(uploadedImage, {
			quality: 0.6,
			maxWidth: 500,
			convertSize: 1,
			convertTypes: ["image/png", "image/webp"],
			success(result) {
				console.log(result);
				query(result)
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
			},
			error(err) {
				console.log(err.message);
			},
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
			body.classList.add("lg:bg-gray-100");
		}
	}

	useEffect(() => {
		updateBodyColor();
	}, [loading]);

	async function query(file) {
		console.log("querying");
		console.log(import.meta.env.VITE_API_URL);

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
			<div className="relative flex h-full w-full flex-col lg:my-8 lg:aspect-[9/16] lg:w-auto lg:flex-1 lg:rounded-2xl lg:shadow-2xl lg:outline lg:outline-2 lg:outline-white">
				<div
					className="absolute left-0 top-0 h-full w-full bg-gray-300 lg:rounded-2xl"
					style={{
						backgroundImage: `url(${image})`,
						backgroundSize: "cover", // Adjust this to control the image sizing
						backgroundPosition: "center", // Adjust this to control the image position
					}}
				></div>

				<div className="relative flex h-full w-full flex-col">
					{loading === true ? (
						<div className="relative flex h-full w-full flex-col items-center justify-between ">
							<StatusBar status={"Detecting..."} backgroundColor={"bg-gray-400"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									role="img"
									preserveAspectRatio="xMidYMid meet"
									viewBox="0 0 24 24"
									className="animate-spin fill-custom-yellow stroke-custom-yellow stroke-[1] object-contain p-6"
								>
									<path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4v3z"></path>
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
								<img src="HotDog100.png" className="absolute object-contain p-2" />
								<svg
									xmlns="http://www.w3.org/2000/svg"
									aria-hidden="true"
									role="img"
									className="absolute fill-white stroke-black stroke-[.25] object-contain p-1"
									preserveAspectRatio="xMidYMid meet"
									viewBox="0 0 24 24"
								>
									<path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"></path>
								</svg>
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
									viewBox="0 -960 960 960"
									className="fill-custom-yellow stroke-custom-yellow stroke-[2] object-contain p-6"
								>
									<path d="M433-322v-323L319-530l-68-67 229-229 229 229-68 67-114-115v323h-94ZM135-135v-237h94v143h502v-143h95v237H135Z" />
								</svg>
							</StatusBar>
							<div className="absolute flex h-full  w-full items-center justify-center  bg-custom-blue lg:rounded-2xl">
								<img src="HotDog2000.png" className="max-w-[300px] object-scale-down p-4" />
							</div>
							<a
								href="https://github.com/j0srisk"
								className="absolute bottom-0 z-20 cursor-pointer p-10 text-center font-inter text-xl font-semibold text-white"
							>
								Developed by Joseph Risk
							</a>
							<input
								type="file"
								id="single"
								accept="image/png, image/jpeg, image/webp"
								onChange={handleImage}
								className="absolute z-10 h-full w-full flex-1 bg-red-500 opacity-0"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
