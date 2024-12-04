import HistoryItem from "~/components/Usage/HistoryItem";
import styles from "~/components/Usage/Usage.module.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "~/contexts/AuthContext";
import { fetchSubUsageBalance, fetchSubUsageHistory } from "../../../libs/apis/subaccounts";

export default function FixedHistoryPage(){
    const [history,setHistory]=useState([]);
	const [loading, setLoading] = useState(true);
    const [sub, setSub] = useState([]);
    const { type } = useParams();
    const { user } = useAuth();
    const [total, setTotal] = useState([]);
    const usageType = {
        1: "고정",
        2: "자유",
        3: "잉여"
    };
    
    const subT= usageType[type];
    
    useEffect(() => {
		const fetchData = async () => {
			try {
				const historyData = await fetchSubUsageHistory(subT,user.user_id);
				const subBal = await fetchSubUsageBalance(user.user_id);
                console.log(subBal)
				setHistory(historyData || []);
				setSub(subBal || 0);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

    useEffect(()=>{
        const amount = sub
                .filter(item => item.subaccount.sub_account_usage === subT)  // type에 맞는 항목만 필터링
                .reduce((acc, item) => acc + (parseFloat(item.total_deposit) - parseFloat(item.total_withdrawal)), 0);
            console.log(amount);
        setTotal(amount);
    },[sub])

    if (loading ) return <p>Loading...</p>;
    
    return(
        <main className={styles.container}>
            <div>
                <section className={styles.balanceSection}>
					<div className="flex items-center">
						<h1 className={styles.balanceHeader}>12월 {type==3 ? '위시' : usageType[type] } 계좌 잔액</h1>
					</div>
					<div className={styles.amountWrapper}>
						<span className={styles.amount}>{total.toLocaleString()}</span>
						<span className={styles.currency}>원</span>
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
                                state="false"
							/>
						))}
				</section>
            </div>
        </main>
    )
}
