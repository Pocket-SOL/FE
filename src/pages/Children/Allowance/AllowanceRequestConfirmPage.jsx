import allowanceRequestIcon from "~/images/allowanceRequestIcon.png";

export default function AllowanceRequestConfirmPage() {
	return (
		<div>
			<div style={{ position: "relative" }}>
				<img
					src={allowanceRequestIcon}
					alt="1"
					loading="lazy"
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						padding: 20,
						margin: 0,
						marginTop: 200,
					}}
				/>
				<p
					style={{
						position: "absolute",
						bottom: "10%",
						left: "20%",
						padding: 5,
						fontSize: 20,
					}}
				>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조인후님에게
					<br /> 3000원을 요청합니다.
				</p>
			</div>
			<button
				className="complete-button"
				style={{
					backgroundColor: "#F3F3F3",
					color: "black",
					marginTop: 150,
				}}
			>
				조르기
			</button>
		</div>
	);
}
