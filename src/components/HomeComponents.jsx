import styles from "~/components/HomePage.module.css";

export const ActionItem = ({ title, iconSrc, backgroundColor, onClick }) => (
	<button
		className={`${styles.actionItem} ${styles[backgroundColor]}`}
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

export const WideActionItem = ({
	title,
	iconSrc,
	backgroundColor,
	onClick,
}) => (
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

export const ChildItem = ({ name, isSelected, onClick }) => (
	<div className={styles.childItem} onClick={onClick}>
		<div
			className={`${styles.childName} ${isSelected ? styles.selectedChild : ""}`}
		>
			{name}
		</div>
	</div>
);
