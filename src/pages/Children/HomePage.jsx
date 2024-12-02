import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "~/contexts/AuthContext";
import { fetchAccountNumber } from "~/libs/apis/accounts";
import { ActionItem, WideActionItem } from "~/components/HomeComponents";
import { fetchUsageBalance } from "../../libs/apis/accounts";
import styles from "~/components/HomePage.module.css";
import characterImage from "~/images/character.png";
import bankIcon from "~/images/bankIcon.png";
import allowanceIcon from "~/images/allowanceIcon.png";
import missionIcon from "~/images/missionIcon.png";
import schoolIcon from "~/images/schoolIcon.png";

export default function ChildrenHomePage() {
	const navigate = useNavigate();
	const { authChecked, user } = useAuth();
	const [userAccountNumber, setUserAccountNumber] = useState("");
	const [userAccuontBalance, setUserAccuontBalance] = useState();

	// 계좌번호 가져오기
	const fetchAccountData = async () => {
		try {
			if (user?.user_id) {
				const response = await fetchAccountNumber(user.user_id);
				setUserAccountNumber(response.account_number);
			}
		} catch (error) {
			console.error("계좌번호를 가져오는 중 오류가 발생했습니다:", error);
		}
	};

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

	useEffect(() => {
		if (authChecked && user?.user_id) {
			const loadData = async () => {
				await Promise.all([fetchAccountData(), fetchAccountBalance()]);
			};
		}
	}, [user]);

	if (!authChecked || !user) {
		// 인증 확인이 완료되지 않았거나 user 정보가 불러와지지 않은 경우 로딩 표시
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.homePageContainer}>
			<button
				onClick={() => {
					navigate(`notification/${user.user_id}`);
				}}
			>
				알림
			</button>
			<div className={styles.welcomeSection}>
				<h1 className={styles.welcomeMessage}>
					{user.username}님,
					<br />
					용돈 관리도 멋지게!
					<br />
					나만의 저금 습관
					<br />
					만들어볼까요?
				</h1>
				<img
					src={characterImage}
					alt="character"
					className={styles.welcomeImage}
					loading="lazy"
				/>
			</div>
			<div className={styles.accountSection}>
				<div className={styles.accountInfo}>
					<div
						className={styles.accountDetails}
						onClick={() => navigate("usage-history")}
					>
						<img
							src={bankIcon}
							alt="bank"
							className={styles.accountIcon}
							loading="lazy"
						/>
						<p>
							<strong>{user.username}님의 계좌</strong>
							<br />
							{userAccountNumber}
						</p>
					</div>
					<div className={styles.accountBalance}>
						잔액 : <strong>{userAccuontBalance}</strong>원
					</div>
				</div>
			</div>
			<div className={styles.wideActionContainer}>
				<WideActionItem
					title="빠르게 결제해봐요"
					backgroundColor="simplePayment"
					onClick={() => {
						navigate("/children");
					}}
				/>
			</div>
			<div className={styles.actionContainer}>
				<ActionItem
					title="용돈 조르기"
					iconSrc={allowanceIcon}
					backgroundColor="sendAllowance"
					onClick={() => {
						navigate("/children/allowance-request");
					}}
				/>
				<ActionItem
					title="주식 퀴즈"
					iconSrc={missionIcon}
					backgroundColor="assignMission"
					onClick={() => {
						navigate("/children/quiz");
					}}
				/>
			</div>
			<div className={styles.wideActionContainer}>
				<WideActionItem
					title="우리학교 공동구매"
					iconSrc={schoolIcon}
					backgroundColor="groupPurchase"
					onClick={() => {
						if (user.school_auth) {
							navigate("/children/group-purchase"); // 학교 param으로 주기.
						} else {
							navigate("/children/group-purchase/school");
						}
					}}
				/>
			</div>
		</div>
	);
}
