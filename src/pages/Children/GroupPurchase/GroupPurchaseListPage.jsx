import Layout from "../../../layouts/Layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
export default function GroupPurchaseListPage() {
	const navigate = useNavigate();
	const [purchaseList, setPurchaseList] = useState([]); // 구매 목록 상태

	useEffect(() => {
		const fetchPurchases = async () => {
			try {
				const response = await axios.get("/api/purchases");
				setPurchaseList(response.data); // 응답 데이터를 상태에 저장
			} catch (error) {
				console.error("구매 목록을 가져오는 중 오류 발생:", error);
			}
		};

		fetchPurchases();
	}, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

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
						{purchaseList.length > 0 ? (
							purchaseList.map((purchase) => (
								<Card
									onClick={() => {
										console.log("list", purchase.purchase_id);
										navigate(`/group-purchase/${purchase.purchase_id}`);
									}}
									className="mb-3 shadow-sm"
									key={purchase.id}
								>
									<Card.Body>
										<Card.Text className="text-center">
											{purchase.title}
										</Card.Text>
									</Card.Body>
								</Card>
							))
						) : (
							<div>목록이 비어 있습니다.</div> // 데이터가 없을 경우 메시지 표시
						)}
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
							navigate("/Group-Purchase/reg");
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
