import styles from "~/components/Usage/Usage.module.css";
import { useNavigate } from "react-router-dom";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
export default function HistoryItem({
	id,
	merchant,
	date,
	amount,
	type,
	time,
	img,
	state
}) {
	const isExpense = type === "출금";
	const navigate = useNavigate();
	const { user } = useAuth();

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
		if (user.role === "child" && state!=="false") {
			navigate(`${id}`);
		}
	};
	return (
		<article
			className={`${styles.transactionItem} ${
				isExpense ? styles.transactionDebit : styles.transactionCredit
			}`}
			onClick={handleClick}
		>
			<div className={styles.transactionDetails}>
				<div
					style={{ display: "flex", alignItems: "center", marginTop: "2px" }}
				>
					<h3 className={styles.transactionTitle}>{merchant}</h3>
					{img && user.role === "child" ? (
						<PhotoIcon className="h-4 w-4 ml-2" />
					) : null}
				</div>
				<time className={styles.transactionDate}>
					{formatDate(date)}
					{formatTime(time)}
				</time>
			</div>
			<p className={isExpense ? styles.debitAmount : styles.creditAmount}>
				{isExpense ? "- " : "+ "}
				{parseInt(amount, 10).toLocaleString()} 원
			</p>
		</article>
	);
}
