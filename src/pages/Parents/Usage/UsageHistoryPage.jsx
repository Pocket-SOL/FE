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
	const { child,selectChild } = useAuth();

	useEffect(() => {
		const fetchData = async () => {
			try {
				let c;
				let userId;
				if(!child){
					c=JSON.parse(localStorage.getItem("child"));
					console.log("here",c.user_id);
					userId = c.user_id
				}else{console.log(child.user_id);
					userId = child.user_id
				}
				
				console.log("userId",userId)
				
				const withData = await fetchWithdrawal(userId);
				const historyData = await fetchUsageHistory(userId);
				const balanceData = await fetchUsageBalance(userId);
				
				setWithdrawal(withData.total_withdrawal || 0);
				setHistory(historyData || []);
				setBalance(balanceData.totalAmount || 0);
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
					<div className="flex items-center">
						{/* <button className="text-gray-600">
							<ChevronLeftIcon
								className="h-5 w-6"
								onClick={() => navigate(-1)}
							/>
						</button> */}
						<h1 className={styles.balanceHeader}>자녀 계좌 잔액</h1>
					</div>
					<div className={styles.amountWrapper}>
						<span className={styles.amount}>{balance.toLocaleString()}</span>
						<span className={styles.currency}>원</span>
					</div>
					<div className={styles.balanceDetails}>
						<div>이용 금액</div>
						<div>{withdrawal.toLocaleString()}원</div>
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
