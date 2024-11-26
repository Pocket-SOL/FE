import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "~/contexts/AuthContext";
import { fetchAccountNumber } from "~/libs/apis/accounts";

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
				<div key={index}>
					{word}
					<br />
				</div>
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
	const { isAuthenticated, authChecked, user } = useAuth();
	const [userAccountNumber, setUserAccountNumber] = useState("");
	const [childrenList, setChildrenList] = useState([]);
	const [setIsLoading] = useState(true);

	useEffect(() => {
		if (authChecked && !isAuthenticated) {
			navigate("/login");
		}
	}, [authChecked, isAuthenticated, navigate]);

	// 데이터 fetch 함수
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

	const fetchChildrenList = async () => {
		try {
			if (user?.user_id) {
				const response = await fetch(
					`/api/users/my-children?parent_id=${user.user_id}`,
				);
				if (!response.ok) {
					throw new Error("사용자를 가져오는 중 오류가 발생했습니다.");
				}
				const userDetails = await response.json();
				setChildrenList(userDetails);
			}
		} catch (error) {
			console.error(error);
		}
	};

	// 모든 데이터 로드
	useEffect(() => {
		if (authChecked && isAuthenticated && user?.user_id) {
			const loadData = async () => {
				setIsLoading(true);
				await Promise.all([fetchAccountData(), fetchChildrenList()]);
				setIsLoading(false);
			};
			loadData();
		}
	}, [authChecked, isAuthenticated, user]);

	if (!authChecked) {
		// 인증 확인이 완료되지 않은 경우 로딩 표시
		return <div>Loading...</div>;
	}

	if (!isAuthenticated) {
		// 인증되지 않은 경우 로그인 페이지로 이동
		navigate("/login");
		return null;
	}
	console.log(user);
	return (
		<div className={styles.homePageContainer}>
			<div className={styles.welcomeSection}>
				<h1 className={styles.welcomeMessage}>
					{user.username}님,
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
							<strong>{user.username}님의 계좌</strong>
							<br />
							{userAccountNumber}
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
					{childrenList.map((child, index) => (
						<ChildItem
							key={index}
							name={child.name} // 실제 자녀 이름을 childrenList에서 가져옴
							isSelected={child.isSelected} // 자녀 선택 여부
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
