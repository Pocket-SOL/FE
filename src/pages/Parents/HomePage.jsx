import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "~/contexts/AuthContext";
import { fetchAccountNumber } from "~/libs/apis/accounts";
import { fetchUsageBalance } from "~/libs/apis/accounts";
import {
	ActionItem,
	WideActionItem,
	ChildItem,
} from "~/components/HomeComponents";

import styles from "~/components/HomePage.module.css";
import characterImage from "~/images/character.png";
import bankIcon from "~/images/bankIcon.png";
import allowanceIcon from "~/images/allowanceIcon.png";
import missionIcon from "~/images/missionIcon.png";

export default function ParentsHomePage() {
	const navigate = useNavigate();
	const { authChecked, user } = useAuth();
	const [userAccountNumber, setUserAccountNumber] = useState("");
	const [userAccuontBalance, setUserAccuontBalance] = useState();
	const [childrenList, setChildrenList] = useState([]);

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

	// 자녀 리스트 가져오기
	const fetchChildrenList = async () => {
		try {
			if (user?.user_id) {
				const response = await fetch(
					`/api/users/my-children?parent_id=${user.user_id}`,
				);
				if (!response.ok) {
					throw new Error("자녀 리스트를 가져오는 중 오류가 발생했습니다.");
				}
				const childrenList = await response.json();
				setChildrenList(childrenList);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (authChecked && user?.user_id) {
			const loadData = async () => {
				await Promise.all([
					fetchAccountData(),
					fetchAccountBalance(),
					fetchChildrenList(),
				]);
			};
			loadData();
		}
	}, [user]);

	if (!authChecked || !user) {
		// 인증 확인이 완료되지 않았거나 user 정보가 불러와지지 않은 경우 로딩 표시
		return <div>Loading...</div>;
	}

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
						잔액 : <strong>{userAccuontBalance}</strong>원
					</div>
				</div>
				<button className={styles.rechargeButton}>충전하기</button>
			</div>
			<div className={styles.childSelection}>
				<h2 className={styles.childSelectionTitle}>자녀 선택하기</h2>
				<div className={styles.childSelectionContainer}>
					{/* childrenList가 비어있으면 자녀추가하기 버튼 렌더링 */}
					{childrenList.length === 0 ? (
						<WideActionItem
							title="자녀 추가하기"
							backgroundColor="simplePayment"
							onClick={() => {
								navigate("/parents/child-registration");
							}}
						/>
					) : (
						// childrenList가 비어있지 않을 때 ChildItem 컴포넌트 렌더링
						childrenList.map((child, index) => (
							<ChildItem
								key={index}
								name={child.name}
								isSelected={child.isSelected} // 자녀 선택 여부
								onClick={() => {}}
							/>
						))
					)}
				</div>
			</div>
			<div
				onClick={() => {
					navigate("usagehistory");
				}}
			>
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
