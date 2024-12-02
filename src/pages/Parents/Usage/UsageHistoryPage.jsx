import { useState, useEffect } from "react";
import styles from "~/components/Usage/Usage.module.css";
import {
	fetchWithdrawal,
	fetchUsageHistory,
	fetchUsageBalance,
} from "~/libs/apis/accounts";
import HistoryItem from "~/components/Usage/HistoryItem";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/contexts/AuthContext";

export default function ChildUsageHistoryPage() {
	const [history, setHistory] = useState([]);
	const [withdrawal, setWithdrawal] = useState(0);
	const [balance, setBalance] = useState(0);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();
	// const childId = 2
	const { child } = useAuth();
	console.log(child);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const withData = await fetchWithdrawal(child.user_id);
				const historyData = await fetchUsageHistory(child.user_id);
				const balanceData = await fetchUsageBalance(child.user_id);

				setWithdrawal(withData.total_withdrawal || 0);
				setHistory(historyData || []);
				setBalance(balanceData.totalAmount || 0);
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
					<div className="flex items-center">
						<button className="text-gray-600">
							<ChevronLeftIcon
								className="h-5 w-6"
								onClick={() => navigate(-1)}
							/>
						</button>
						<h1 className={styles.balanceHeader}>자녀 계좌 잔액</h1>
					</div>
					<div className={styles.amountWrapper}>
						<span className={styles.amount}>{balance}</span>
						<span className={styles.currency}>원</span>
					</div>
					<div className={styles.balanceDetails}>
						<div>이용 금액</div>
						<div>{withdrawal}원</div>
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
							img={transaction.photo}
						/>
					))}
				</section>
			</div>
		</main>
	);
}
