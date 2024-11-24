import axios from "axios";
import { Card } from "react-bootstrap";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GroupPurchaseDetailPage() {
	const { purchaseId } = useParams(); // URL에서 purchaseId 파라미터 추출
	const [purchaseDetails, setPurchaseDetails] = useState(null);

	useEffect(() => {
		console.log("detail", purchaseId);
		const fetchPurchaseDetails = async () => {
			try {
				const response = await axios.get(`/api/purchases/${purchaseId}`);
				setPurchaseDetails(response.data); // 응답 데이터로 구매 세부사항 설정
				console.log(response.data);
			} catch (error) {
				console.error("구매 상세 정보를 가져오는 중 오류 발생:", error);
			}
		};
		if (purchaseId) {
			fetchPurchaseDetails();
		}
	}, [purchaseId]); // purchaseId가 변경될 때마다 호출

	// purchaseDetails가 null이면 "Loading..."을 표시
	if (!purchaseDetails) {
		return <div>Loading...</div>;
	}
	return (
		<div style={{ display: "flex", justifyContent: "center" }}>
			<Card style={{ width: 300, borderRadius: "20px" }}>
				<Card.Header>
					<Card.Title>{purchaseDetails.title}</Card.Title>
				</Card.Header>
				<Card.Body>
					<Card.Text>{purchaseDetails.content}</Card.Text>
				</Card.Body>
				<Card.Body>
					<Card.Title>마감일</Card.Title>
					<div>{purchaseDetails.end_date}</div>
				</Card.Body>
				<div
					style={{
						paddingBottom: "20px",
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					<Card.Body>인원: {purchaseDetails.participants}명/</Card.Body>
					<Comment purchaseId={purchaseId} />
				</div>
			</Card>
		</div>
	);
}
