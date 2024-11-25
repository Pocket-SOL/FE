import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ResponsivePie } from "@nivo/pie";
import { useFixed } from "../../../contexts/FixedContext";
import "./FixedExpenseListPage.css";
import axios from "axios";
//여기서도 객체에 담아서 보내자 송금하기할때
export default function FixedExpenseListPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { fixedInfoList } = useFixed();
	const [amount, setAmount] = useState(() => {
		const savedAmount = localStorage.getItem("amount");
		return savedAmount ? JSON.parse(savedAmount) : location.state?.amount || 0;
	});

	useEffect(() => {
		if (location.state?.amount !== undefined) {
			setAmount(location.state.amount);
		}
	}, [location.state]);

	useEffect(() => {
		localStorage.setItem("amount", JSON.stringify(amount));
	}, [amount]);

	// 차트 데이터 정의
	const data = [
		{
			id: "수학학원",
			label: "수학학원",
			value: 40,
		},
		{
			id: "학습지",
			label: "학습지",
			value: 20,
		},
		{
			id: "자유이용",
			label: "자유이용",
			value: 40,
		},
	];
	const colors = ["#0084FC", "#00DB49", "#FFD455"];

	const handleTransfer = async () => {
		try {
			const reservations = fixedInfoList.map((info) => ({
				account_holder: info.name,
				bank: info.bank,
				account_number: info.account,
				amount: Number(info.transAmount),
				scheduled_date: info.transDate,
			}));

			const requestBody = {
				from: {
					transaction_type: "출금",
					account_holder: "하민지",
					amount: Number(amount),
				},
				to: {
					transaction_type: "입금",
					account_holder: "김도은",
					amount: Number(amount),
				},
				reservations,
			};

			const response = await axios.post(
				"http://localhost:3000/api/accounts/2",
				requestBody,
				{
					headers: {
						"Content-Type": "application/json",
					},
				},
			);

			// 성공 처리
			alert("송금이 성공적으로 처리되었습니다.");
			console.log("송금 성공:", response.data);
			// 여기에 성공 후 처리 추가 (예: 페이지 이동)
		} catch (error) {
			// 에러 처리
			console.error("송금 처리 중 오류:", error);
			if (error.response) {
				// 서버가 응답을 반환한 경우
				alert(
					`송금 실패: ${error.response.data.message || "서버 오류가 발생했습니다."}`,
				);
			} else if (error.request) {
				// 요청이 전송되었으나 응답을 받지 못한 경우
				alert("서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.");
			} else {
				// 요청 설정 중 오류가 발생한 경우
				alert("송금 요청 중 오류가 발생했습니다.");
			}
		}
		navigate("/parents/fixed-expense-list", { state: { amount } });
	};

	return (
		<>
			<div className="Container">
				<p style={{ marginBottom: "0" }}>김도은님에게 용돈보내기</p>
				<p className="Font">얼마를 보낼까요?</p>
				<div style={{ width: "100%", height: "200px" }}>
					<ResponsivePie
						data={data}
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
				<h1>{amount}원</h1>
				<hr />
				<button
					className="complete-button"
					style={{ backgroundColor: "#F3F3F3", color: "black" }}
					onClick={() => {
						navigate("/parents/add-fixed-expense");
					}}
				>
					추가
				</button>
				<span style={{ marginTop: 40 }}>금액</span>

				{fixedInfoList && fixedInfoList.length > 0 ? (
					<ul>
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
