import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaRegMessage } from "react-icons/fa6";
import { VscSend } from "react-icons/vsc";
import { useAuth } from "../../../contexts/AuthContext";
export default function Comment({ purchaseId }) {
	const { user } = useAuth(); // AuthContext에서 user 정보 가져오기
	const [show, setShow] = useState(false);
	const [comments, setComments] = useState([]); // 댓글 리스트
	const [newComment, setNewComment] = useState(""); // 새로운 댓글 내용
	const [loading, setLoading] = useState(false); // 댓글 로딩 상태

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	console.log("user", user);

	// 댓글 조회 함수
	const fetchComments = async () => {
		try {
			setLoading(true);
			const response = await axios.get(`/api/comments/${purchaseId}`);
			setComments(response.data.response); // API 응답에서 댓글 리스트 저장
		} catch (error) {
			console.error("댓글 조회 중 오류 발생:", error);
		} finally {
			setLoading(false);
		}
	};

	// 새로운 댓글 작성 함수
	const submitComment = async () => {
		if (!newComment.trim()) {
			alert("댓글 내용을 입력하세요!");
			return;
		}
		try {
			const response = await axios.post(`/api/comments/${purchaseId}`, {
				user_id: user.id, // 실제 사용자 ID로 대체
				content: newComment,
			});
			setComments((prev) => [...prev, response.data.response]); // 새로운 댓글 추가
			setNewComment(""); // 입력 필드 초기화
		} catch (error) {
			console.error("댓글 작성 중 오류 발생:", error);
		}
	};

	// 댓글 컴포넌트가 열릴 때 댓글 로드
	useEffect(() => {
		if (show) {
			fetchComments();
		}
	}, [show]);

	// 댓글 목록 렌더링
	const renderComments = () => {
		if (loading) {
			return <div>댓글을 불러오는 중...</div>;
		}
		if (comments.length === 0) {
			return <div>아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</div>;
		}
		return (
			<ul>
				{comments.map((comment) => (
					<li key={comment.id}>
						<div>
							<strong>{comment.user_id}</strong>: {comment.content}
						</div>
						<div style={{ fontSize: "12px", color: "gray" }}>
							{new Date(comment.createdAt).toLocaleString()}
						</div>
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<Button
				style={{
					height: "2rem",
					fontSize: "10px",
					marginRight: "16px",
					marginTop: "12px",
				}}
				variant="secondary"
				onClick={handleShow}
			>
				<FaRegMessage
					style={{
						marginRight: "5px",
						marginBottom: "1.5px",
					}}
				/>
				댓글달기({comments.length})
			</Button>
			<Offcanvas
				scroll={true}
				show={show}
				onHide={handleClose}
				placement="bottom"
				style={{
					maxWidth: 375,
					height: "70%",
				}}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>댓글</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>{renderComments()}</Offcanvas.Body>
				<div style={{ padding: "25px", display: "flex", alignItems: "center" }}>
					<input
						type="text"
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						placeholder="댓글을 입력해 주세요."
						style={{
							flex: 1,
							height: 35,
							borderRadius: "5px",
							border: "none",
							backgroundColor: "#F6F6F6",
							marginRight: 10,
						}}
					/>
					<VscSend
						style={{
							height: 25,
							width: 25,
							cursor: "pointer",
						}}
						onClick={submitComment}
					/>
				</div>
			</Offcanvas>
		</>
	);
}
