import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "~/contexts/AuthContext";
import {
	fetchAccountNumber,
	fetchUsageBalance,
	fetchGetAccount,
} from "~/libs/apis/accounts";
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
	const { authChecked, user, selectChild, child } = useAuth();
	const [userAccountNumber, setUserAccountNumber] = useState("");
	const [userAccuontBalance, setUserAccuontBalance] = useState(0);
	const [childrenList, setChildrenList] = useState([]);
	const [childAccountBalace, setChildAccountBalance] = useState(0);
	const [selectedChild, setSelectedChild] = useState(null);
	const [openAccount, setOpenAccount] = useState();
	// 계좌번호 가져오기
	const fetchAccountData = async () => {
		try {
			if (user?.user_id) {
				const response = await fetchAccountNumber(user.user_id);
				setUserAccountNumber(response.account_num);
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

	// //오픈뱅킹 api로 계좌 번호 & 계좌 잔액 가져오기
	// const formatAccountNumber = (number) => {
	// 	const start = number.slice(0, 10);
	// 	return `${start}...`;
	// };

	// const fetchOpenAccount = async () => {
	// 	try {
	// 		if (user?.open_token) {
	// 			const response = await fetchGetAccount(user.user_id, user.open_token);
	// 			console.log(response);
	// 			setOpenAccount({
	// 				fintech_use_num: formatAccountNumber(response.fintech_use_num),
	// 				amount: response.balance_amt,
	// 			});
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	// 자녀 계좌잔액 가져오기
	const fetchChildAccountBalance = async () => {
		try {
			if (child?.user_id) {
				const response = await fetchUsageBalance(child.user_id);
				setChildAccountBalance(response.totalAmount);
			}
		} catch (error) {
			console.error("자녀 계좌잔액을 가져오는 중 오류가 발생했습니다.", error);
		}
	};

	useEffect(() => {
		if (authChecked && user?.user_id) {
			const loadData = async () => {
				await Promise.all([
					fetchAccountData(),
					fetchAccountBalance(),
					fetchChildrenList(),
					// fetchOpenAccount(),
				]);
			};
			loadData();
		}
	}, [user]);

	useEffect(() => {
		if (childrenList.length > 0) {
			setSelectedChild(childrenList[0]); // 첫 번째 자녀를 선택
			selectChild(childrenList[0]); // 선택된 자녀 상태 업데이트
		}
	}, [childrenList, selectChild]); // childrenList가 변경될 때마다 실행

	useEffect(() => {
		if (child?.user_id) {
			const loadData = async () => {
				await fetchChildAccountBalance();
			};
			loadData();
		}
	}, [child]);

	if (!authChecked || !user) {
		// if (!authChecked || !user || !openAccount) {
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
							{/* {openAccount.fintech_use_num} */}
						</p>
					</div>
					<div className={styles.accountBalance}>
						잔액 : <strong>{userAccuontBalance}</strong>원
					</div>
				</div>
				<button className={styles.rechargeButton}>이체</button>
			</div>
			<div className={styles.childSelection}>
				<h2 className={styles.childSelectionTitle}>자녀 선택하기</h2>

				{childrenList.length === 0 ? (
					<div className={styles.wideActionContainer}>
						{/* className에 중괄호를 없애야 합니다 */}
						<WideActionItem
							title="자녀 추가하기"
							backgroundColor="simplePayment"
							onClick={() => {
								navigate("/parents/child-registration");
							}}
						/>
					</div>
				) : (
					<div className={styles.childSelectionContainer}>
						{/* className에 중괄호를 없애야 합니다 */}
						{/* childrenList가 비어있지 않을 때 ChildItem 컴포넌트 렌더링 */}
						{childrenList.map((child, index) => (
							<ChildItem
								key={index}
								name={child.name}
								isSelected={selectedChild === child} // 선택된 자녀와 비교하여 스타일 적용
								onClick={() => {
									setSelectedChild(child); // 자녀 선택
									selectChild(child); // 자녀 선택 후 상태 업데이트
									// console.log(child);
								}}
							/>
						))}
						<ChildItem
							name="+"
							onClick={() => {
								navigate("/parents/child-registration");
							}}
						></ChildItem>
					</div>
				)}
			</div>

			<div
				onClick={() => {
					navigate("usagehistory");
				}}
			>
				<p className={styles.selectedChildBalance}>
					{selectedChild
						? `${selectedChild.name}님의 잔액: `
						: "자녀를 선택해주세요."}
					<strong>{selectedChild ? childAccountBalace : "0"}원</strong>
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
					title="오늘의팁"
					iconSrc={missionIcon}
					backgroundColor="assignMission"
					onClick={() => {
						navigate("/parents/tip");
					}}
				/>
			</div>
		</div>
	);
}
