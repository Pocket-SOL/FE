import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaRegMessage } from "react-icons/fa6";
import { VscSend } from "react-icons/vsc";
export default function Comment({ name, ...props }) {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// 댓글 창
	function CommentArea() {
		return (
			<>
				<div
					style={{
						borderTop: "1px solid #F6F6F6",
					}}
				>
					<input
						type="text"
						placeholder="댓글을 입력해 주세요."
						style={{
							width: 280,
							height: 35,
							borderRadius: "5px",
							border: "none",
							backgroundColor: "#F6F6F6",
							marginTop: 25,
						}}
					/>
					<VscSend
						style={{ height: 25, width: 25, marginLeft: 5, marginBottom: 3 }}
					/>
				</div>
			</>
		);
	}

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
				댓글달기(개수)
			</Button>
			<Offcanvas
				scroll={true}
				show={show}
				onHide={handleClose}
				{...props}
				placement="bottom"
				style={{
					maxWidth: 375,
					height: "70%",
				}}
			>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>댓글</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul>
						<li>1</li>
						<li>1</li>
						<li>1</li>
						<li>1</li>
						<li>1</li>
					</ul>
				</Offcanvas.Body>
				<div style={{ padding: "25px" }}>
					<CommentArea />
				</div>
			</Offcanvas>
		</>
	);
}
