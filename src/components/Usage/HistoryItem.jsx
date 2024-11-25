import styles from "~/components/Usage/Usage.module.css";
import { useNavigate } from "react-router-dom";

export default function HistoryItem({
	id,
	merchant,
	date,
	amount,
	type,
	time,
}) {
	const isExpense = type === "출금";
	const navigate = useNavigate();
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
		const day = date.getDate();
		return `${month}월 ${day}일`;
	};

	const formatTime = (timeString) => {
		return timeString.split(":").slice(0, 2).join(":");
	};
	const handleClick = () => {
		// 특정 id로 이동
		navigate(`${id}`);
	};
	return (
		<article
			className={`${styles.transactionItem} ${
				isExpense ? styles.transactionDebit : styles.transactionCredit
			}`}
			onClick={handleClick}
		>
			<div className={styles.transactionDetails}>
				<h3 className={styles.transactionTitle}>{merchant}</h3>
				<time className={styles.transactionDate}>
					{formatDate(date)}
					{formatTime(time)}
				</time>
			</div>
			<p className={isExpense ? styles.debitAmount : styles.creditAmount}>
				{isExpense ? "- " : "+ "}
				{parseInt(amount, 10)} 원
			</p>
		</article>
	);
}
