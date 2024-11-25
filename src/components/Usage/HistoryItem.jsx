import styles from "~/components/Usage/Usage.module.css";

export default function HistoryItem({ merchant, date, amount, type, time }) {
	const isExpense = type === "출금";

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
		const day = date.getDate();
		return `${month}월 ${day}일`;
	};

	const formatTime = (timeString) => {
		return timeString.split(":").slice(0, 2).join(":");
	};

	return (
		<article
			className={`${styles.transactionItem} ${
				isExpense ? styles.transactionDebit : styles.transactionCredit
			}`}
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
