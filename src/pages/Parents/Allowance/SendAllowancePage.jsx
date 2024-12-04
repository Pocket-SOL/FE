import "./SendAllowancePage.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
	fetchAccountNumber,
	fetchUsageBalance,
	fetchGetAccount,
} from "~/libs/apis/accounts";
export default function SendAllowancePage() {
	const [amount, setAmount] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	//숫자 3자리마다 콤마추가하기
	const [userAccuontBalance, setUserAccuontBalance] = useState(0);

	const allowanceData = location.state?.allowanceData;
	const localeAmount = allowanceData
		? Number(allowanceData).toLocaleString()
		: Number(amount).toLocaleString();
	const maxLength = 10;

	const handleComplete = () => {
		navigate("/parents/fixed-expense-list", {
			state: { amount: localeAmount },
		});
	};
	const { user, child, selectChild } = useAuth();
	const [childData, setChildData] = useState(child);
	// 계좌잔액 가져오기
	const fetchAccountBalance = async () => {
		try {
			if (user?.user_id) {
				const response = await fetchUsageBalance(user.user_id);
				setUserAccuontBalance(response.totalAmount);
			}
		} catch (error) {
			console.error("계좌잔액을 가져오는 중 오류가 발생했습니다.", error);
		}
	};
	fetchAccountBalance();

	useEffect(() => {
		const savedChild = localStorage.getItem("child");
		if (savedChild) {
			selectChild(JSON.parse(savedChild));
			// console.log(JSON.parse(savedChild).name);
			setChildData(JSON.parse(savedChild));
		}
	}, []);

	return (
		<div className="Container">
			{childData ? ( // child 데이터가 있으면 랜더링
				<div>{childData.name}에게 용돈보내기</div>
			) : (
				<div>자녀 정보를 불러오는 중...</div> // child 데이터가 없으면 로딩 메시지 표시
			)}
			<h1>얼마를 보낼래요?</h1>
			<p className="my-4">{localeAmount}원</p>
			<h2>출금 가능 잔액 {Number(userAccuontBalance).toLocaleString()}원</h2>
			<div>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, "00", 0, "←"].map((num) => (
					<button
						key={num}
						onClick={() => {
							if (num === "←") {
								setAmount(amount.slice(0, -1));
							} else if (amount.length < maxLength) {
								setAmount(amount + num); //10미만일때만 숫자늘어나도록
							}
						}}
					>
						{num}
					</button>
				))}
			</div>
			<Link to="/parents/fixed-expense-list" state={{ amount: localeAmount }}>
				<button
					className="complete-button"
					onClick={handleComplete}
					style={{ marginTop: 40 }}
				>
					완료
				</button>
			</Link>
		</div>
	);
}
