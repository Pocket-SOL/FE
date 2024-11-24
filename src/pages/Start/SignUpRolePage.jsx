import styles from "~/components/SignUpPage.module.css";

export default function SignUpRolePage() {
	return (
		<div className={styles.signUpContainer}>
			<h1 className={styles.signUpTitle}>역할을 선택해주세요</h1>
			<div className={styles.roleButtons}>
				<button className={`${styles.roleButton} ${styles.parentButton}`}>
					부모님으로
					<br />
					시작하기
				</button>
				<button className={`${styles.roleButton} ${styles.childButton}`}>
					아이로
					<br />
					시작하기
				</button>
			</div>
		</div>
	);
}
