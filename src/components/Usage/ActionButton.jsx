import styles from "~/components/Usage/Photo.module.css";

export default function ActionButton({ icon: Icon, label, onClick }) {
	return (
		<button
			className={styles.actionButton}
			onClick={onClick}
			aria-label={label}
		>
			<Icon className={styles.actionIcon} />
			<span>{label}</span>
		</button>
	);
}
