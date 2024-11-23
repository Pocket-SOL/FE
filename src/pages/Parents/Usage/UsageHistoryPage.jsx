import { useState, useEffect } from "react";
import styles from "~/components/UsageHistory.module.css";
import { fetchWithdrawal, fetchUsageHistory } from "~/libs/apis/accounts";
// import { fetchSubUsageBalance } from "../../../libs/apis/subaccounts";
import HistoryItem from "~/components/HistoryItem";

export default function ChildUsageHistoryPage() {
	const [history, setHistory] = useState([]);
	const [withdrawal, setWithdrawal] = useState(0);
	// const [sub, setSub] = useState([]);
	const [loading, setLoading] = useState(true);
	// const [total, setTotal] = useState(0);
	const childId = 2;

	useEffect(() => {
		const fetchData = async () => {
			try {
				//2: 로컬 db 상 자녀 아이디 임시로 넣어둔 것..
				const withData = await fetchWithdrawal(childId);
				const historyData = await fetchUsageHistory(childId);
				// const subData = await fetchSubUsageBalance(childId);

				setWithdrawal(withData.total_withdrawal || 0);
				setHistory(historyData || []);
				// setSub(subData || []);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				// var total = 0;
				// sub.forEach((data) => {
				// 	if (["고정", "자유"].includes(data.subaccount.sub_account_usage)) {
				// 		total +=
				// 			parseFloat(data.total_deposit) -
				// 			parseFloat(data.total_withdrawal);
				// 	}
				// 	console.log("여기서", total);
				// });
				// setTotal(total);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<main className={styles.container}>
			<div>
				<section className={styles.balanceSection}>
					<h1 className={styles.balanceHeader}>자녀의 이용 금액</h1>
					<div className={styles.amountWrapper}>
						<span className={styles.amount}>{withdrawal}</span>
						<span className={styles.currency}>원</span>
					</div>
					{/* <div className={styles.balanceDetails}>
						<div>이번달 잔여 금액</div>
						<div>{total}원</div>
					</div> */}
				</section>

				<hr className={styles.divider} />

				<section className={styles.historySection}>
					<h2 className={styles.balanceHeader}>이용 내역</h2>
					{history.map((transaction, index) => (
						<HistoryItem
							key={index}
							merchant={transaction.account_holder}
							date={transaction.date}
							amount={transaction.amount}
							type={transaction.transaction_type}
							time={transaction.time}
						/>
					))}
				</section>
			</div>
		</main>
	);
}
