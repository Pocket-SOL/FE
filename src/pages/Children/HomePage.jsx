import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "~/contexts/AuthContext";
import { fetchAccountNumber } from "~/libs/apis/accounts";
import { ActionItem, WideActionItem } from "~/components/HomeComponents";
import { fetchUsageBalance, fetchGetAccount } from "../../libs/apis/accounts";
import styles from "~/components/HomePage.module.css";

import characterImage from "~/images/character.png";
import bankIcon from "~/images/bankIcon.png";
import allowanceIcon from "~/images/allowanceIcon.png";
import missionIcon from "~/images/missionIcon.png";
import schoolIcon from "~/images/schoolIcon.png";

export default function ChildrenHomePage() {
	const navigate = useNavigate();
	const { authChecked, user } = useAuth();
	const [userAccuontBalance, setUserAccuontBalance] = useState();
	const [openAccount, setOpenAccount] = useState();
	// const { hasNewNotification, setHasNewNotification } = useNotifications();
	// 계좌번호 가져오기
	const fetchAccountData = async () => {
		try {
			if (user?.user_id) {
				const response = await fetchAccountNumber(user.user_id);
				// console.log(response.account_number);
				return response.account_number;
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
	//오픈뱅킹 api로 계좌 번호 & 계좌 잔액 가져오기

	const fetchOpenAccount = async () => {
		try {
			if (user?.user_id) {
				const response = await fetchGetAccount(user.user_id);
				// console.log(response, response.fintech_use_num);
				let fintechUseNum = response.fintech_use_num;
				if (!fintechUseNum) {
					console.log("No fintech_use_num found. Fetching from DB...");
					fintechUseNum = await fetchAccountData(); // DB에서 계좌번호 가져오기
				}
				// 상태 업데이트
				setOpenAccount({
					fintech_use_num: fintechUseNum,
				});
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (authChecked && user?.user_id) {
			const loadData = async () => {
				await Promise.all([
					// fetchAccountData(),
					fetchAccountBalance(),
					fetchOpenAccount(),
				]);
			};
			loadData();
		}
	}, [user]);

	if (!authChecked || !user || !openAccount) {
		// if (!authChecked || !user || !openAccount) {
		// 인증 확인이 완료되지 않았거나 user 정보가 불러와지지 않은 경우 로딩 표시
		return <div>Loading...</div>;
	}
	const localeAmount = Number(userAccuontBalance).toLocaleString();

	return (
		<div className={styles.homePageContainer}>
			<div className={styles.welcomeSection}>
				<h1 className={styles.welcomeMessage}>
					<span style={{ fontSize: "1.5rem" }}>{user.username}</span>님,
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
							{/* {userAccountNumber} */}
							{openAccount.fintech_use_num || 0}
						</p>
					</div>
					<div className={styles.accountBalance}>
						잔액 : <strong>{localeAmount}</strong>원
					</div>
				</div>
			</div>

			<div className={styles.actionContainer}>
				<ActionItem
					title={
						<>
							용돈
							<br />
							조르기
						</>
					}
					iconSrc={allowanceIcon}
					backgroundColor="sendAllowance"
					onClick={() => {
						navigate("/children/allowance-request");
					}}
				/>
				<ActionItem
					title={<>주식퀴즈</>}
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
