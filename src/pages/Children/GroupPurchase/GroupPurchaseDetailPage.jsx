import React from "react";
import Layout from "../../../layouts/Layout";
import { Card, Button } from "react-bootstrap";
import DateSelection from "./DataSelection";
import Comment from "./Comment";

export default function GroupPurchaseDetailPage() {
  return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: 300,
            borderRadius: "20px",
          }}
        >
          <Card.Header>
            <Card.Title>3학년 2반 축구공 공구</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              축구공을 근데 같이산다는게 여러개를 사느거임? ㄱㅋㅋㅋ근데 보통
              한반에 하나아님? 내일 월요일이다 ㅜㅠ11월도 벌써18일이라니... 하
              12월오네 2025년안 오길 바라면서도 2024 끝났으면 싶고 내마음 머지 /
              ㅋㅋㅋㅋㅋ
            </Card.Text>
          </Card.Body>
          <Card.Body>
            <Card.Title>마감일</Card.Title>
            <div>
              <DateSelection />
            </div>
          </Card.Body>
          <div
            style={{
              paddingBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Card.Body>인원: 3명/4명</Card.Body>
            <Comment />
          </div>
        </Card>
      </div>
  );
}
