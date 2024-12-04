import {
	ChevronLeftIcon,
	CameraIcon,
	PhotoIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";
import {
	uploadHistoryImage,
	updateHistoryImage,
} from "../../../libs/apis/schools";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Photo() {
	const [isMobile, setIsMobile] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 성공 모달 상태
	const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // 오류 모달 상태
	const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // 취소 모달 상태
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [stream, setStream] = useState(null);
	const { user } = useAuth();
	const navigate = useNavigate();

	const handleUploadImage = (file) => {
		const saveConfirmed = confirm("사진을 저장하시겠습니까?");
		if (saveConfirmed) {
			uploadHistoryImage(file, `schools/${user.user_id}`)
				.then((result) => {
					updateHistoryImage(user.user_id, result.data.imageUrl).then((res) => {
						if (res) {
							setIsSuccessModalOpen(true);
							setTimeout(() => navigate("/children/group-purchase/"), 2000); // 2초 후 이동
						} else {
							setIsErrorModalOpen(true);
						}
					});
				})
				.catch(() => {
					setIsErrorModalOpen(true);
				});
		} else {
			setIsCancelModalOpen(true);
		}
	};

	const handleFileChange = (file) => {
		setSelectedFile(file);
		setTimeout(() => {
			handleUploadImage(file);
		}, 100);
	};

	useEffect(() => {
		const checkMobile = () => {
			const userAgent = navigator.userAgent.toLowerCase();
			const isMobileDevice =
				/iphone|ipod|android|blackberry|windows phone/i.test(userAgent);
			const isMobileScreen = window.innerWidth <= 768;
			setIsMobile(isMobileDevice || isMobileScreen);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const openMobileCamera = () => {
		document.getElementById("camera-upload").click();
	};

	const startWebCam = () => {
		if (!isMobile && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then((stream) => {
					setStream(stream);
					if (videoRef.current) {
						videoRef.current.srcObject = stream;
						videoRef.current.play();
					}
				})
				.catch((error) => {
					console.error("Webcam access error:", error);
				});
		}
	};

	const stopWebCam = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			setStream(null);
			const videoElement = document.getElementById("webcam-video");
			videoElement.srcObject = null;
		}
	};

	const captureImage = () => {
		const videoElement = videoRef.current;
		const canvasElement = canvasRef.current;

		if (videoElement && canvasElement) {
			const context = canvasElement.getContext("2d");
			canvasElement.width = videoElement.videoWidth;
			canvasElement.height = videoElement.videoHeight;

			context.drawImage(
				videoElement,
				0,
				0,
				canvasElement.width,
				canvasElement.height,
			);

			canvasElement.toBlob((blob) => {
				setSelectedFile(
					new File([blob], "captured-image.png", { type: "image/png" }),
				);
				stopWebCam();
				setTimeout(() => {
					handleUploadImage(selectedFile);
				}, 100);
			});
		}
	};

	return (
		<>
			<div className="bg-white p-6 w-full max-w-lg">
				<header className="flex items-center space-x-4 mb-6">
					{/* <button
						className="text-gray-500 hover:text-gray-800"
						onClick={() => navigate(-1)}
					>
						<ChevronLeftIcon className="h-6 w-6" />
					</button> */}
					<h1 className="text-xl font-semibold text-gray-700">학생증 등록</h1>
				</header>

				<div className="flex flex-col items-center mb-8">
					{selectedFile ? (
						<div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
							<img
								src={URL.createObjectURL(selectedFile)}
								alt="Selected preview"
								className="object-contain max-w-full max-h-full"
							/>
						</div>
					) : (
						<div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
							<PlusIcon className="h-8 w-8" />
							<span className="ml-2">사진 추가</span>
						</div>
					)}
				</div>

				<nav className="flex justify-evenly mb-4">
					<button
						className="flex flex-col items-center bg-gray-200 p-4 rounded-lg hover:bg-gray-300 transition"
						onClick={() => document.getElementById("gallery-upload").click()}
					>
						<PhotoIcon className="h-6 w-6 text-gray-700" />
						<span className="text-sm text-gray-600 mt-1">갤러리</span>
					</button>
					<button
						className="flex flex-col items-center bg-blue-500 p-4 rounded-lg hover:bg-blue-600 text-white transition"
						onClick={isMobile ? openMobileCamera : startWebCam}
					>
						<CameraIcon className="h-6 w-6" />
						<span className="text-sm mt-1">카메라</span>
					</button>
				</nav>

				<input
					type="file"
					accept="image/*"
					capture="camera"
					onChange={(e) => handleFileChange(e.target.files[0])}
					className="hidden"
					id="camera-upload"
				/>

				<input
					type="file"
					accept="image/*"
					onChange={(e) => handleFileChange(e.target.files[0])}
					className="hidden"
					id="gallery-upload"
				/>

				{!isMobile && stream && (
					<div className="mt-6">
						<video
							id="webcam-video"
							ref={videoRef}
							width="320"
							height="240"
							className="rounded-md border"
						/>
						<div className="flex justify-around mt-4">
							<button
								className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
								onClick={captureImage}
							>
								캡처
							</button>
							<button
								className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
								onClick={stopWebCam}
							>
								닫기
							</button>
						</div>
					</div>
				)}
			</div>

			{/* 성공 모달 */}
			{isSuccessModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-blue-600 mb-4">
							🎉 사진이 저장되었습니다!
						</h2>
						<p className="text-gray-600 mb-4">
							환영합니다! 친구들과 함께 공동구매를 즐겨보세요.
						</p>
					</div>
				</div>
			)}

			{/* 오류 모달 */}
			{isErrorModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-red-600 mb-4">
							❌ 사진 저장에 실패했습니다.
						</h2>
						<p className="text-gray-600 mb-4">다시 시도해주세요.</p>
						<div className="flex justify-end">
							<button
								onClick={() => setIsErrorModalOpen(false)}
								className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
							>
								닫기
							</button>
						</div>
					</div>
				</div>
			)}

			{/* 취소 모달 */}
			{isCancelModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-gray-700 mb-4">
							⚠️ 저장이 취소되었습니다.
						</h2>
						<p className="text-gray-600 mb-4">
							다음 단계로 진행하려면 사진을 저장해주세요.
						</p>
						<div className="flex justify-end">
							<button
								onClick={() => setIsCancelModalOpen(false)}
								className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
							>
								닫기
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
