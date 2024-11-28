import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

export default function ChildRegistrationPage() {
	const [isSearched, setIsSearched] = useState(false); //
	const [searchInput, setSearchInput] = useState("");
	const [results, setResults] = useState([]);
	const [selectedChild, setSelectedChild] = useState(null); // 선택된 자녀 정보
	const [showModal, setShowModal] = useState(false); // 모달 표시 여부

	const handleInputChange = (e) => {
		setSearchInput(e.target.value);
	};

	const handleSearch = async () => {
		try {
			const response = await axios.get(`/api/users/search`, {
				params: { query: searchInput },
			});

			setResults(response.data);
			setIsSearched(true);
		} catch (error) {
			console.error("검색 중 에러 발생:", error);
			setIsSearched(true);
		}
	};

	// 휴대폰 번호 형식 변환 함수
	const formatPhoneNumber = (phone) => {
		if (!phone || phone.length < 7) return phone; // 잘못된 번호는 그대로 반환
		const front = phone.slice(0, 3); // 앞의 세 자리
		const back = phone.slice(-4); // 뒤의 네 자리
		return `${front}-****-${back}`; // 가운데는 **** 처리
	};

	// 자녀 선택 시 실행
	const handleSelectChild = (child) => {
		setSelectedChild(child); // 선택된 자녀 정보 설정
		setShowModal(true); // 모달 열기
	};

	// 모달 닫기
	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedChild(null); // 선택된 자녀 초기화
	};

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h1>내 아이 추가</h1>
			<div>
				<input
					type="text"
					placeholder="이름 또는 휴대전화번호 검색"
					value={searchInput}
					onChange={handleInputChange}
				/>
				<Button onClick={handleSearch}>검색</Button>
			</div>
			<div className="w-full p-4 mt-4">
				{isSearched && results.length === 0 ? ( // 검색 후 결과가 없을 때만 표시
					<p className="text-center text-gray-500">검색된 사용자가 없습니다.</p>
				) : (
					<ul className="space-y-2">
						{results.map((user) => {
							return (
								<li
									key={user.id}
									className="flex justify-between items-center p-2 border-b hover:bg-gray-100 cursor-pointer"
									onClick={() => handleSelectChild(user)}
								>
									<span className="text-gray-800 font-semibold">
										{user.name} ({user.id})
									</span>
									<span className="text-gray-600">
										{formatPhoneNumber(user.phone)}
									</span>
								</li>
							);
						})}
					</ul>
				)}
			</div>

			{/* 모달 */}
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>자녀 정보</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{selectedChild && (
						<div>
							<p>
								<strong>이름:</strong> {selectedChild.name}
							</p>
							<p>
								<strong>아이디:</strong> {selectedChild.id}
							</p>
							<p>
								<strong>휴대폰 번호:</strong>{" "}
								{formatPhoneNumber(selectedChild.phone)}
							</p>
						</div>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleCloseModal}>
						닫기
					</Button>
					<Button variant="primary" onClick={() => alert("등록 완료!")}>
						등록
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
