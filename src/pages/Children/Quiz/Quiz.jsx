import { useState } from "react";
import { motion } from "framer-motion";
import QuizImg from "~/images/Quiz.png";
import CorrectImg from "~/images/Correct.png";
import InCorrectImg from "~/images/InCorrect.png";
export default function Quiz() {
	const [quizState, setQuizState] = useState("question");

	const correctAnswer = "O";

	//문제화면
	if (quizState === "question") {
		return (
			<div className="flex justify-center min-h-screen pt-0">
				<div className="space-y-8  ">
					<div className="ml-4">
						{/* 날짜 */}
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-blue-500 text-2xl font-bold"
						>
							2024년 11월
						</motion.h2>

						{/* 제목 */}
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 }}
							className="text-3xl font-bold"
						>
							주식 퀴즈에 도전하세요
						</motion.h1>

						{/* 참석자 수 */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="text-green-500 text-xl font-medium"
						>
							175,279명이 퀴즈를 풀었어요!
						</motion.p>
					</div>

					{/* 질문 */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="pt-12"
					>
						<h3 className="text-3xl font-bold text-center leading-relaxed">
							미국 국채 금리가
							<br />
							오르면 달러 가치가
							<br /> 오른다?
						</h3>
					</motion.div>

					{/* 답변 */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="pt-12 flex justify-center items-center relative"
					>
						<button
							onClick={() => {
								setQuizState(correctAnswer === "X" ? "correct" : "incorrect");
							}}
							className="group relative  mx-14 z-20"
						>
							<div className="w-20 h-20 rounded-lg border-4 border-red-500 flex items-center justify-center transition-transform group-hover:scale-110">
								<span className="text-4xl text-red-500">O</span>
							</div>
						</button>

						<img
							style={{ width: 270 }}
							src={QuizImg}
							className="absolute top-10 left-15 z-0"
						/>

						<button
							onClick={() => {
								setQuizState(correctAnswer === "O" ? "correct" : "incorrect");
							}}
							className="group relative  mx-14 z-20"
						>
							<div className="w-20 h-20 rounded-lg border-4 border-blue-500 flex items-center justify-center transition-transform group-hover:scale-110">
								<span className="text-4xl text-blue-500">X</span>
							</div>
						</button>
					</motion.div>
				</div>
			</div>
		);
	}

	//정답화면
	if (quizState == "correct") {
		return (
			<div className="flex items-center justify-center ">
				<img
					style={{ width: 270 }}
					src={CorrectImg}
					className="relative top-60 left-6  z-0"
				/>
				{/* <img
				style={{ width: 270 }}
				src={InCorrectImg}
				className="absolute top-10 left-15 z-0"
			/> */}
				<div className="flex items-center justify-center absolute text-2xl top-48">
					축하합니다 <br />
					정답입니다!
				</div>
			</div>
		);
	}

	//실패화면
	if (quizState == "incorrect") {
		return (
			<div className="flex items-center justify-center ">
				<img
					style={{ width: 270 }}
					src={InCorrectImg}
					className="relative top-60 z-0"
				/>
				{/* <img
				style={{ width: 270 }}
				src={InCorrectImg}
				className="absolute top-10 left-15 z-0"
			/> */}
				<div className="flex items-center justify-center absolute text-2xl top-48">
					오답입니다! <br />
				</div>
			</div>
		);
	}
}
