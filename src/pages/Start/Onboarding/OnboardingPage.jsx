import styles from "./OnboardingPage.module.css";
import { useNavigate } from "react-router-dom";
import { IconWithText } from "./IconWithText";
import mascotImage from "~/images/mascotImage.png";
const features = [
	{
		iconSrc:
			"https://cdn.builder.io/api/v1/image/assets/e077fc336c61455a819889bea1fad419/b51654a1b1732dbc5e84932e7c361df46fb6d4884a3f549a5550ad9cf2cea342?apiKey=e077fc336c61455a819889bea1fad419&",
		text: "미션과 함께 ! 엄마, 아빠에게 용돈 받기",
	},
	{
		iconSrc:
			"https://cdn.builder.io/api/v1/image/assets/e077fc336c61455a819889bea1fad419/b51654a1b1732dbc5e84932e7c361df46fb6d4884a3f549a5550ad9cf2cea342?apiKey=e077fc336c61455a819889bea1fad419&",
		text: "우리 아이 소비습관 체크",
	},
	{
		iconSrc:
			"https://cdn.builder.io/api/v1/image/assets/e077fc336c61455a819889bea1fad419/b51654a1b1732dbc5e84932e7c361df46fb6d4884a3f549a5550ad9cf2cea342?apiKey=e077fc336c61455a819889bea1fad419&",
		text: "친구들과 함께하는 공동 구매",
	},
];

export const OnboardingPage = () => {
	const navigate = useNavigate();
	return (
		<main className={styles.onboardingContainer}>
			<section className={styles.contentSection}>
				<header className={styles.headerContent}>
					<div className={styles.titleWrapper}>
						<h1 className={styles.title}>
							<span className={styles.highlight}>Pocket SOL</span>과
							<br /> 용돈도 똑똑하게,
							<br />
							금융도 재미있게!
							<img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/e077fc336c61455a819889bea1fad419/056c241b3254c9add6267afebd7ca74b83ed961297185e1d68f696f85393553c?apiKey=e077fc336c61455a819889bea1fad419&"
								className={styles.mascotImage}
								alt=""
							/>
						</h1>
						<p className={styles.subtitle}>로그인이 필요한 서비스에요.</p>
					</div>
				</header>

				<section className={styles.featuresList}>
					{features.map((feature, index) => (
						<IconWithText
							key={index}
							iconSrc={feature.iconSrc}
							text={feature.text}
						/>
					))}
				</section>

				<section className={styles.character}>
					<img src={mascotImage} alt="" />
				</section>

				<button
					className={styles.loginButton}
					onClick={() => {
						navigate("/login");
					}}
				>
					그냥 로그인 할래요
				</button>
			</section>
		</main>
	);
};
