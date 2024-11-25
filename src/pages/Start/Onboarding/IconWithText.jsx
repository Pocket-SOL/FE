import React from "react";
import styles from "./IconWithText.module.css";

export const IconWithText = ({ iconSrc, text }) => {
	return (
		<section className={styles.iconTextContainer}>
			<img loading="lazy" src={iconSrc} className={styles.icon} alt="" />
			<p className={styles.text}>{text}</p>
		</section>
	);
};
