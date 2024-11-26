import { useState, useEffect } from "react";
import axios from "axios";
import { FaRegMessage } from "react-icons/fa6";
import { VscSend } from "react-icons/vsc";
import { useAuth } from "../../../contexts/AuthContext";

export default function Comment({
	purchaseId,
	comments,
	setComments,
	loading,
}) {
	const { user } = useAuth(); // user context 유지.
	const [show, setShow] = useState(false);
	const [newComment, setNewComment] = useState(""); // 새로운 댓글 내용
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	console.log("comment", user);

	// 새로운 댓글 작성 함수
	const submitComment = async () => {
		if (!newComment.trim()) {
			alert("댓글 내용을 입력하세요!");
			return;
		}
		try {
			const response = await axios.post(`/api/comments/${purchaseId}`, {
				username: user.username, // 실제 사용자 ID로 대체
				content: newComment,
			});
			setComments((prev) => [...prev, response.data.response]); // 새로운 댓글 추가
			setNewComment(""); // 입력 필드 초기화
		} catch (error) {
			console.error("댓글 작성 중 오류 발생:", error);
		}
	};

	// 댓글 목록 렌더링
	const renderComments = () => {
		if (loading) {
			return <div className="text-gray-500">댓글을 불러오는 중...</div>;
		}
		if (comments.length === 0) {
			return (
				<div className="text-gray-500 text-center mt-4">
					아직 댓글이 없습니다. 첫 댓글을 남겨보세요!
				</div>
			);
		}
		return (
			<ul className="space-y-4">
				{comments.map((comment) => (
					<li
						key={comment.id}
						className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col"
					>
						<div className="font-semibold text-sm text-gray-800">
							{comment.username}
						</div>
						<div className="text-gray-600">{comment.content}</div>
						<div className="text-xs text-gray-400 mt-1">
							{new Date(comment.createdAt).toLocaleString()}
						</div>
					</li>
				))}
			</ul>
		);
	};

	return (
		<>
			<button
				className="flex items-center space-x-2 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg shadow hover:bg-gray-700"
				onClick={handleShow}
			>
				<FaRegMessage className="text-lg" />
				<span>댓글달기({comments.length})</span>
			</button>

			{show && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
					onClick={handleClose}
				>
					<div
						className="bg-white w-full max-w-lg rounded-t-lg shadow-lg overflow-hidden"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex justify-between items-center p-4 border-b">
							<h3 className="text-lg font-medium">댓글</h3>
							<button
								className="text-gray-500 hover:text-gray-700"
								onClick={handleClose}
							>
								&times;
							</button>
						</div>
						<div className="p-4 max-h-60 overflow-y-auto">
							{renderComments()}
						</div>
						<div className="flex items-center p-4 border-t space-x-2">
							<input
								type="text"
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								placeholder="댓글을 입력해 주세요."
								className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
							/>
							<VscSend
								className="text-gray-600 cursor-pointer hover:text-gray-800"
								size={24}
								onClick={submitComment}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
