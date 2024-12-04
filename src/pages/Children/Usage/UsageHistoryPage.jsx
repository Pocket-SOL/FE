import { useState, useEffect } from "react";
import styles from "~/components/Usage/Usage.module.css";
import { fetchUsageBalance, fetchUsageHistory } from "~/libs/apis/accounts";
import { fetchSubUsageBalance } from "../../../libs/apis/subaccounts";
import HistoryItem from "~/components/Usage/HistoryItem";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/contexts/AuthContext";

export default function UsageHistoryPage() {
	const [history, setHistory] = useState([]);
	const [balance, setBalance] = useState(0);
	const [loading, setLoading] = useState(true);
	const [sub, setSub] = useState([]);
	const [total, setTotal] = useState([]);
	const navigate = useNavigate();
	// const userId = 2;
	const { user } = useAuth();
	useEffect(() => {
		const fetchData = async () => {
			try {
				//2: 로컬 db 상 자녀 아이디 임시로 넣어둔 것..
				const balanceData = await fetchUsageBalance(user.user_id);
				const historyData = await fetchUsageHistory(user.user_id);
				const subData = await fetchSubUsageBalance(user.user_id);
				console.log(subData);
				setBalance(balanceData.totalAmount || 0);
				setHistory(historyData || []);
				setSub(subData || []);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		// 고정, 자유, 잉여 항목을 처리하여 합계 계산
		const usageTotals = {
			고정: 0,
			자유: 0,
			잉여: 0,
		};

		// 응답 데이터를 순회하며 항목에 맞는 합계를 계산
		sub.forEach((item) => {
			const usageType = item.subaccount.sub_account_usage;
			usageTotals[usageType] +=
				parseFloat(item.total_deposit) - parseFloat(item.total_withdrawal);
		});
		console.log(usageTotals);

		// 합계를 상태에 저장
		setTotal(usageTotals);
	}, [sub]);

	const handleNavigation = (category) => {
		navigate(`fixed/${category}`);
	};

	if (loading) return <p>Loading...</p>;

	return (
		<main className={styles.container}>
			<div>
				<section className={styles.balanceSection}>
					<div className="flex items-center">
						<h1 className={styles.balanceHeader}>12월 남은 금액</h1>
					</div>
					<div className={styles.amountWrapper}>
						<span className={styles.amount}>{balance.toLocaleString()}</span>
						<span className={styles.currency}>원</span>
					</div>
					<div className={styles.balanceDetails}>
						<div>
						<span onClick={() => handleNavigation(1)} style={{ cursor: 'pointer' }}>고정 지출</span> <br />
						<span onClick={() => handleNavigation(2)} style={{ cursor: 'pointer' }}>자유 이용</span> <br />
						<span onClick={() => handleNavigation(3)} style={{ cursor: 'pointer' }}>위시 박스</span>
						</div>
						<div className={styles.balanceValues}>
							{total["고정"].toLocaleString()}원 <br />
							{total["자유"].toLocaleString()}원 <br />
							{total["잉여"].toLocaleString()}원
						</div>
					</div>
				</section>

				<hr className={styles.divider} />

				<section className={styles.historySection}>
					<h2 className={styles.balanceHeader}>이용 내역</h2>
					{history &&
						history.map((transaction, index) => (
							<HistoryItem
								key={index}
								id={transaction.history_id}
								merchant={transaction.account_holder}
								date={transaction.date}
								amount={transaction.amount}
								type={transaction.transaction_type}
								time={transaction.time}
								img={transaction.photo}
							/>
						))}
				</section>
			</div>
		</main>
	);
}
