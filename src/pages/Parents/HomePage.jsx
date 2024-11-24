import { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "~/contexts/AuthContext";

import styles from "~/components/HomePage.module.css";
import characterImage from "~/images/character.png";
import bankIcon from "~/images/bankIcon.png";
import allowanceIcon from "~/images/allowanceIcon.png";
import missionIcon from "~/images/missionIcon.png";

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

const ChildItem = ({ name, isSelected, onClick }) => (
	<div className={styles.childItem} onClick={onClick}>
		<div
			className={`${styles.childName} ${isSelected ? styles.selectedChild : ""}`}
		>
			{name}
		</div>
	</div>
);

export default function ParentsHomePage() {
	const navigate = useNavigate();
	const { isAuthenticated, authChecked, login, logout } = useAuth();

	useEffect(() => {
		if (authChecked && !isAuthenticated) {
			navigate("/login");
		}
	}, [authChecked, isAuthenticated, navigate]);

	const children = [
		{ name: "조인후", isSelected: false },
		{ name: "하민지", isSelected: true },
		{ name: "김도은", isSelected: false },
	];

	return (
		<div className={styles.homePageContainer}>
			<div className={styles.welcomeSection}>
				<h1 className={styles.welcomeMessage}>
					이민호님,
					<br />
					자녀와 함께 하는 금융을
					<br />
					시작해보세요.
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
							<strong>이민호님의 계좌</strong>
							<br />
							110-508-283124
						</p>
					</div>
					<div className={styles.accountBalance}>
						잔액 : <strong>765,000</strong>원
					</div>
				</div>
				<button className={styles.rechargeButton}>충전하기</button>
			</div>
			<div className={styles.childSelection}>
				<h2 className={styles.childSelectionTitle}>자녀 선택하기</h2>
				<div className={styles.childSelectionContainer}>
					{children.map((child, index) => (
						<ChildItem
							key={index}
							name={child.name}
							isSelected={child.isSelected}
							onClick={() => {}}
						/>
					))}
				</div>
			</div>
			<div>
				<p className={styles.selectedChildBalance}>
					하민지님의 잔액: <strong>9,800</strong>원
				</p>
			</div>
			<div className={styles.actionContainer}>
				<ActionItem
					title="용돈 보내기"
					iconSrc={allowanceIcon}
					backgroundColor="sendAllowance"
					onClick={() => {
						navigate("/parents/send-allowance");
					}}
				/>
				<ActionItem
					title="미션 주기"
					iconSrc={missionIcon}
					backgroundColor="assignMission"
					onClick={() => {
						navigate("/parents");
					}}
				/>
			</div>
		</div>
	);
}
