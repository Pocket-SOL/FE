import Layout from "../../../layouts/Layout";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
export default function GroupPurchaseListPage() {
	const navigate = useNavigate();
	return (
		<div
			style={{
				margin: "0 auto", // 중앙 정렬
				backgroundColor: "#f8f9fa", // 배경색 설정
				minHeight: "100vh", // 화면 전체 높이 유지
				paddingTop: "20px", // 상단 여백
			}}
		>
			{/* 카드 리스트 */}
			<Container style={{ position: "relative" }}>
				<div>진행중인 목록</div>
				<br />
				<Row className="justify-content-center">
					<Col>
						<Card className="mb-3 shadow-sm">
							<Card.Body>
								<Card.Text className="text-center">
									축구공 같이 살 사람
								</Card.Text>
							</Card.Body>
						</Card>
						<Card className="mb-3 shadow-sm">
							<Card.Body>
								<Card.Text className="text-center">마카롱 공구</Card.Text>
							</Card.Body>
						</Card>
						<Card className="mb-3 shadow-sm">
							<Card.Body>
								<Card.Text className="text-center">마카롱 공구</Card.Text>
							</Card.Body>
						</Card>
					</Col>
				</Row>
				{/* 플로팅 버튼 */}
				<div
					style={{
						position: "absolute",
						left: "300px",
						top: "680px",
					}}
				>
					<Button
						onClick={() => {
							navigate("/GroupPurchaseReg");
						}}
						variant="primary"
						className="rounded-circle"
						style={{ width: "56px", height: "56px" }}
					>
						+
					</Button>
				</div>
			</Container>
		</div>
	);
}
