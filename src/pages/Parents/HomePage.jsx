import { Fragment } from "react";
import styles from "./HomePage.module.css";

import characterImage from "~/images/character.png";
import bankIcon from "~/images/bankIcon.png";
import sendAllowanceImage from "~/images/sendAllowance.png";
import assignMissionImage from "~/images/assignMission.png";

const ActionItem = ({ title, iconSrc, backgroundColor }) => {
	return (
		<div className={`${styles.actionItem} ${styles[backgroundColor]}`}>
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
		</div>
	);
};

const ChildItem = ({ name, isSelected, onClick }) => {
	return (
		<div className={styles.childItem} onClick={onClick}>
			<div
				className={`${styles.childName} ${isSelected ? styles.selectedChild : ""}`}
			>
				{name}
			</div>
		</div>
	);
};

export default function ParentsHomePage() {
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
							923302-00-632254
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
					iconSrc={sendAllowanceImage}
					backgroundColor="sendAllowance"
				/>
				<ActionItem
					title="미션 주기"
					iconSrc={assignMissionImage}
					backgroundColor="assignMission"
				/>
			</div>
		</div>
	);
}
