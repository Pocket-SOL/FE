import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";

import { useFixed } from "../../../contexts/FixedContext";
import "./FixedExpenseListPage.css";
import { useAuth } from "../../../contexts/AuthContext";
import { transferMoney } from "../../../libs/apis/accounts";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function FixedExpenseListPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { fixedInfoList } = useFixed();
	const { child, user } = useAuth();
	const [amount, setAmount] = useState(() => {
		const savedAmount = localStorage.getItem("amount");
		return savedAmount ? JSON.parse(savedAmount) : location.state?.amount || 0;
	});
	// console.log(user);
	useEffect(() => {
		if (location.state?.amount !== undefined) {
			setAmount(location.state.amount);
		}
	}, [location.state]);

	useEffect(() => {
		localStorage.setItem("amount", JSON.stringify(amount));
	}, [amount]);

	const originAll = Number(amount.replace(/,/g, ""));
	// 차트 데이터 정의, ResponsivePie와 같은 차트 라이브러리는 특정 형식의 데이터를 요구
	const data = fixedInfoList.map((info) => ({
		id: info.name,
		label: info.name,
		value: Number(info.transAmount),
	}));
	console.log("fixedlist", fixedInfoList);
	const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

	const adjustedData = [
		// 남은 금액 계산 (originAll - totalAmount)
		{
			id: "자유 금액",
			label: "자유 금액",
			value: (Number(originAll - totalAmount) / Number(originAll)) * 100,
		},
		// 각 fixed 항목들의 비율
		...data.map((item) => ({
			id: item.id,
			label: item.label,
			value: (Number(item.value) / Number(originAll)) * 100,
		})),
	];
	console.log("originAll:", originAll, typeof originAll);
	console.log("totalAmount:", totalAmount, typeof totalAmount);
	console.log(
		"transAmounts:",
		data.map((item) => ({ value: item.value, type: typeof item.value })),
	);
	console.log("adjustedData:", adjustedData);
	const singlePieData =
		fixedInfoList.length > 0
			? adjustedData
			: [{ id: "총 금액", label: "총 금액", value: 100 }];
	console.log("Data", data);
	console.log(totalAmount);

	const colors = ["#0084FC", "#00DB49", "#FFD455", "#FC25D5", "#FC9B00"];

	const handleTransfer = async () => {
		try {
			const reservations = fixedInfoList.map((info) => ({
				account_holder: info.name,
				bank: info.bank,
				account_number: info.account,
				amount: Number(info.transAmount),
				scheduled_date: info.transDate,
			}));
			console.log(user.username, child, child.name);
			console.log("차일드", child.user_id);

			const requestBody = {
				from: {
					parent_id: user.user_id,
					transaction_type: "출금",
					account_holder: child.name,
					amount: Number(amount.replace(/,/g, "")),
				},
				to: {
					transaction_type: "입금",
					account_holder: user.username,
					amount: Number(amount.replace(/,/g, "")),
				},
				reservations,
			};

			await transferMoney(child.user_id, requestBody);

			const notiPost = await axios.post(
				`http://localhost:3000/api/notifications/${user.user_id}`,
				{
					child_id: child.user_id,
					amount: Number(amount),
					content: `부모 ${user.username}님이 용돈을 ${amount}원 보냈어요 ! 확인해보세요.`,
					type: "sendAllowance",
				},
			);
			console.log(notiPost);

			socket.emit("sendAllowance", {
				child_id: child.user_id,
				parent_id: user.username,
				message: `부모 ${user.username}님이 용돈을 ${amount}원 보냈어요 ! 확인해보세요.`,
				noti_id: notiPost.data.response.notification_id,
				type: "sendAllowance",
			});

			// 성공 처리
			alert("송금이 성공적으로 처리되었습니다.");
			// console.log("송금 성공:", response.data);
			navigate("/parents/send-complete");
		} catch (error) {
			// 에러 처리
			console.error("송금 처리 중 오류:", error);
			// 	if (error.response) {
			// 		// 서버가 응답을 반환한 경우
			// 		alert(
			// 			`송금 실패: ${error.response.data.message || "서버 오류가 발생했습니다."}`,
			// 		);
			// 	} else if (error.request) {
			// 		// 요청이 전송되었으나 응답을 받지 못한 경우
			// 		alert("서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.");
			// 	} else {
			// 		// 요청 설정 중 오류가 발생한 경우
			// 		alert("송금 요청 중 오류가 발생했습니다.");
			// 	}
			// }
		}
	};
	return (
		<>
			<div>
				<p style={{ marginBottom: "0" }}>{child.name}님에게 용돈보내기</p>
				<p className="Font">얼마를 보낼까요?</p>
				<div style={{ width: "100%", height: "200px" }}>
					<ResponsivePie
						data={singlePieData}
						colors={colors}
						margin={{ right: 80, bottom: 10, left: 80 }}
						innerRadius={0.5}
						padAngle={0.7}
						cornerRadius={3}
						activeOuterRadiusOffset={8}
						borderWidth={1}
						borderColor={{
							from: "color",
							modifiers: [["darker", 0.2]],
						}}
						arcLinkLabelsSkipAngle={100}
						arcLinkLabelsTextColor="transparent"
						arcLinkLabelsThickness={0}
						arcLinkLabelsColor={{ from: "color" }}
						arcLabelsSkipAngle={10}
						arcLabelsTextColor="#FFFFFF"
						arcLabel={(d) => d.id}
						valueFormat={(value) => `${value.toFixed(1)}%`}
						defs={[
							{
								id: "dots",
								type: "patternDots",
								background: "inherit",
								color: "#0084FC",
								size: 4,
								padding: 1,
								stagger: true,
							},
							{
								id: "lines",
								type: "patternLines",
								background: "inherit",
								color: "rgba(255, 255, 255, 0.3)",
								rotation: -45,
								lineWidth: 6,
								spacing: 10,
							},
						]}
						legends={[
							{
								anchor: "bottom",
								direction: "row",
								justify: false,
								translateX: 0,
								translateY: 40,
								itemsSpacing: 0,
								itemWidth: 100,
								itemHeight: 18,
								itemTextColor: "#999",
								itemDirection: "left-to-right",
								itemOpacity: 1,
								symbolSize: 18,
								symbolShape: "circle",
								effects: [
									{
										on: "hover",
										style: {
											itemTextColor: "#000",
										},
									},
								],
							},
						]}
					/>
				</div>
				<h1 className="text-center my-2">{amount}원</h1> <hr />
				<button
					className="complete-button"
					style={{ backgroundColor: "#F3F3F3", color: "black" }}
					onClick={() => {
						navigate("/parents/add-fixed-expense", {
							state: { amount: amount },
						});
					}}
				>
					추가
				</button>
				<h1 className="text-center my-2 mt-4">금액</h1>
				{fixedInfoList && fixedInfoList.length > 0 ? (
					<ul className="ml-4">
						{fixedInfoList.map((info, index) => (
							<li
								key={index}
								style={{ marginBottom: "10px", listStyle: "none" }}
							>
								<div>
									<strong>{info.name}</strong>
								</div>
								<div>
									{info.transAmount}원 | {info.bank} | {info.transDate}일
								</div>
								<div style={{ color: "gray", fontSize: "0.9em" }}>
									계좌번호: {info.account}
								</div>
							</li>
						))}
					</ul>
				) : (
					<p>저장된 고정 지출이 없습니다.</p>
				)}
				<button
					className="complete-button"
					style={{ backgroundColor: "gray", marginTop: "30px" }}
					onClick={handleTransfer}
				>
					송금하기
				</button>
			</div>
		</>
	);
}
