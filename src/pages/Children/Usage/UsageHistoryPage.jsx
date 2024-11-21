import { useState, useEffect } from "react";
import styles from "~/components/UsageHistory.module.css";
import { fetchUsageBalance, fetchUsageHistory } from "~/libs/apis/accounts";
import HistoryItem from "~/components/HistoryItem";

export default function UsageHistoryPage() {
	const [history, setHistory] = useState([]);
	const [balance, setBalance] = useState(0);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				//2: 로컬 db 상 자녀 아이디 임시로 넣어둔 것..
				const balanceData = await fetchUsageBalance(2);
				const historyData = await fetchUsageHistory(2);

				setBalance(balanceData.totalAmount || 0);
				setHistory(historyData || []);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
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
					<h1 className={styles.balanceHeader}>11월 남은 금액</h1>
					<div className={styles.amountWrapper}>
						<span className={styles.amount}>{balance}</span>
						<span className={styles.currency}>원</span>
					</div>
					<div className={styles.balanceDetails}>
						<div>
							자유 이용 <br />
							위시 박스
						</div>
						<div className={styles.balanceValues}>
							400,000원
							<br />
							100,000원
						</div>
					</div>
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
