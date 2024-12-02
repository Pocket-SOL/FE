import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import QuizImg from "~/images/Quiz.png";
import CorrectImg from "~/images/Correct.png";
import InCorrectImg from "~/images/InCorrect.png";
import axios from "axios";
export default function Quiz() {
	const [screen, setScreen] = useState("question");
	const [quizState, setQuizState] = useState(null);
	const [quizData, setQuizData] = useState("");
	const [loading, setLoading] = useState(true);
	const [currentQuestion, setCurrentQuestion] = useState(null); // 현재 문제를 저장할 상태

	const num = quizData && quizData[Math.floor(Math.random() * quizData.length)];

	// 한국어 로케일 사용
	const date = new Date();
	console.log(num.question);

	const formattedDate = date.toLocaleDateString("ko-KR", {
		year: "numeric",
		month: "long",
		day: "numeric",
		weekday: "long",
	});
	// console.log(formattedDate);

	useEffect(() => {
		const fetchQuiz = async () => {
			try {
				const response = await axios.get("http://localhost:3000/api/quiz");
				setQuizData(response.data);
				const randomQuestion =
					response.data[Math.floor(Math.random() * response.data.length)];
				setCurrentQuestion(randomQuestion);
				setLoading(false);
			} catch (error) {
				console.error("오류", error);
				setLoading(true);
			}
		};
		fetchQuiz();
	}, []); //화면시작할 때 get으로 api 받아오기.

	const correctAnswer = currentQuestion?.correct_answer;

	//로딩중
	if (loading) {
		return <div> 로딩 중 </div>;
	}
	//문제화면
	if (screen === "question") {
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
							{formattedDate}
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
							{/* {quizData?.data[0]?.question} */}
							{currentQuestion?.question}
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
								setQuizState(true);
								setScreen("answer");
								console.log("오");
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
								setQuizState(false);
								setScreen("answer");
								console.log("엑스");
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
	if (screen === "answer") {
		// 사용자가 선택한 답과 실제 정답이 일치하는 경우
		const isCorrect =
			(quizState === true && correctAnswer === true) ||
			(quizState === false && correctAnswer === false);

		return (
			<div className="flex items-center justify-center">
				<img
					style={{ width: 270 }}
					src={isCorrect ? CorrectImg : InCorrectImg}
					className={`relative ${isCorrect ? "left-6" : ""} z-0`}
				/>
				<div className="flex items-center justify-center absolute text-2xl top-48">
					{isCorrect ? (
						<>
							축하합니다 <br />
							정답입니다!
						</>
					) : (
						<>
							오답입니다! <br />
						</>
					)}
				</div>
			</div>
		);
	}
}
