import styles from "~/components/Usage/Photo.module.css";
import ActionButton from "~/components/Usage/ActionButton";
import {
	ChevronLeftIcon,
	CameraIcon,
	PhotoIcon,
	PlusIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect, useRef } from "react";

export default function PhotoUpload() {
	const [isMobile, setIsMobile] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [stream, setStream] = useState(null);

	const handleFileChange = (file) => {
		setSelectedFile(file);
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
		console.log(isMobile);
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// 모바일: 기본 카메라 앱 실행
	const openMobileCamera = () => {
		document.getElementById("camera-upload").click();
	};

	// 웹: 웹캠 스트리밍 시작
	const startWebCam = () => {
		console.log("isMobile", isMobile);
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
	// 웹캠 캡처
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
			});
		}
	};

	return (
		<main className={styles.container}>
			<section className={styles.contentWrapper}>
				<header className={styles.titleContainer}>
					<button className="text-gray-600">
						<ChevronLeftIcon className="h-5 w-6" />
					</button>
					<h1>사진 업로드</h1>
				</header>

				{selectedFile ? (
					<div className={styles.photoArea} aria-label="Upload area">
						<img
							src={URL.createObjectURL(selectedFile)}
							alt="Selected preview"
							style={{
								objectFit: "contain",
							}}
						/>
					</div>
				) : (
					<div className={styles.uploadArea}>
						<div className={styles.addButton}>
							<div className={styles.addButtonContent}>
								<PlusIcon className="h-5 w-5 bold" />
								Add
							</div>
						</div>
					</div>
				)}
				<nav className={styles.actionButtonsContainer}>
					<ActionButton
						icon={PhotoIcon}
						label="갤러리"
						onClick={() => document.getElementById("gallery-upload").click()}
					/>
					<ActionButton
						icon={CameraIcon}
						label="카메라"
						onClick={isMobile ? openMobileCamera : startWebCam}
					/>
				</nav>
				{/* CameraUpload 컴포넌트 (input hidden) */}
				<input
					type="file"
					accept="image/*"
					capture="camera"
					onChange={(e) => handleFileChange(e.target.files[0])}
					style={{ display: "none" }} // 숨겨진 카메라 입력
					id="camera-upload"
				/>

				{/* Gallery upload */}
				<input
					type="file"
					accept="image/*"
					onChange={(e) => handleFileChange(e.target.files[0])}
					style={{ display: "none" }} // 숨겨진 갤러리 입력
					id="gallery-upload"
				/>

				{/* 웹캠 스트리밍 및 캡처 */}
				{!isMobile && (
					<div>
						<video
							id="webcam-video"
							ref={videoRef}
							width="320"
							height="240"
							style={{ marginTop: "1rem" }}
						/>
						<canvas ref={canvasRef} style={{ display: "none" }} />
						{stream && (
							<div>
								<button onClick={captureImage}>캡처</button>
								<button onClick={stopWebCam}>닫기</button>
							</div>
						)}
					</div>
				)}
			</section>
		</main>
	);
}
