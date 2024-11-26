import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "~/contexts/AuthContext";
import { useUser } from "~/contexts/UserContext";

import { fetchAccountNumber } from "../../libs/apis/accounts";

import styles from "~/components/HomePage.module.css";
import characterImage from "~/images/character.png";
import bankIcon from "~/images/bankIcon.png";
import allowanceIcon from "~/images/allowanceIcon.png";
import missionIcon from "~/images/missionIcon.png";
import schoolIcon from "~/images/schoolIcon.png";

const ActionItem = ({ title, iconSrc, backgroundColor, onClick }) => (
	<button
		className={`${styles.actionItem} ${styles[backgroundColor]}`}
		onClick={onClick}
	>
		<div className={styles[`${backgroundColor}Text`]}>
			{title.split(" ").map((word, index) => (
				<Fragment key={index}>
					{word}
					<br />
				</Fragment>
			))}
		</div>
		<img
			src={iconSrc}
			alt=""
			className={styles[`${backgroundColor}Icon`]}
			loading="lazy"
		/>
	</button>
);

const WideActionItem = ({ title, iconSrc, backgroundColor, onClick }) => (
	<button
		className={`${styles.wideActionItem} ${styles[backgroundColor]}`}
		onClick={onClick}
	>
		<div className={styles[`${backgroundColor}Text`]}>{title}</div>
		<img
			src={iconSrc}
			alt=""
			className={styles[`${backgroundColor}Icon`]}
			loading="lazy"
		/>
	</button>
);

export default function ChildrenHomePage() {
	const navigate = useNavigate();
	const { isAuthenticated, authChecked, login, logout } = useAuth();
	const { userChecked, user } = useUser();
	const [userAccountNumber, setUserAccountNumber] = useState("");

	useEffect(() => {
		if (authChecked && !isAuthenticated) {
			navigate("/login");
		}
	}, [authChecked, isAuthenticated, navigate]);

	// 계좌번호 가져오기
	useEffect(() => {
		const fetchAccountData = async () => {
			try {
				const accountNumber = await fetchAccountNumber(user.user_id); // API 호출
				setUserAccountNumber(accountNumber.account_number); // 상태 업데이트
			} catch (error) {
				console.error("계좌번호를 가져오는 중 오류가 발생했습니다:", error);
			}
		};
		if (userChecked && user) {
			fetchAccountData();
		}
	}, [userChecked, user]);

	if (!userChecked) {
		// 사용자 정보가 아직 로딩 중일 때 로딩 표시
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.homePageContainer}>
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
					<div className={styles.accountDetails}>
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
						잔액 : <strong>19,800</strong>원
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
					title="미션 주기"
					iconSrc={missionIcon}
					backgroundColor="assignMission"
					onClick={() => {
						navigate("/children");
					}}
				/>
			</div>
			<div className={styles.wideActionContainer}>
				<WideActionItem
					title="우리학교 공동구매"
					iconSrc={schoolIcon}
					backgroundColor="groupPurchase"
					onClick={() => {
						navigate("/children/group-purchase");
					}}
				/>
			</div>
		</div>
	);
}
