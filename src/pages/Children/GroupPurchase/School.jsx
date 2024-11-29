import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export default function SchoolSelectionPage() {
	const [schoolName, setSchoolName] = useState(""); // 사용자가 입력한 학교명
	const [schoolList, setSchoolList] = useState([]); // 전체 학교 리스트
	const [filteredSchools, setFilteredSchools] = useState([]); // 자동완성 필터링된 학교 리스트
	const [isClosedModalOpen, setIsClosedModalOpen] = useState(false); // 경고 모달 상태
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // 성공 모달 상태
	const [listopen, setListOpen] = useState(true);
	const [listclick, setListClick] = useState(false);

	const local_key = import.meta.env.VITE_APP_LOCAL_KEY;
	const server_key = import.meta.env.VITE_APP_SERVER_KEY;

	const url = `http://openapi.seoul.go.kr:8088/${local_key}/json/neisSchoolInfoHs/1/1000/`;

	const navigate = useNavigate();
	const { user, setUser } = useAuth();

	// 데이터 불러오기
	useEffect(() => {
		const fetchSchool = async () => {
			const response = await axios.get(url);
			const data = response.data.neisSchoolInfoHs.row;
			const schoolData = data.map((school) => school.SCHUL_NM);
			setSchoolList(schoolData);
		};
		fetchSchool();
	}, []);

	useEffect(() => {
		if (schoolName && !listclick) {
			setListOpen(true); // 입력값이 변경되었을 때 리스트 열기
		}
		setListClick(false);
	}, [schoolName]);

	// 입력값에 따라 필터링
	useEffect(() => {
		if (schoolName) {
			const results = schoolList.filter((school) =>
				school.toLowerCase().includes(schoolName.toLowerCase()),
			);
			setFilteredSchools(results);
		} else {
			setFilteredSchools([]);
		}
	}, [schoolName, schoolList]);

	// 자동완성 항목 클릭 시
	const handleAutoCompleteClick = (school) => {
		setListClick(true);
		setSchoolName(school); // 클릭한 학교명을 입력창에 설정
		setFilteredSchools([]); // 자동완성 목록 초기화
		setListOpen(false);
	};

	const handleSubmit = async () => {
		if (schoolList.includes(schoolName)) {
			await axios.put(`/api/users/${user.user_id}`, { schoolName });
			setUser({ ...user, school: schoolName });
			setIsSuccessModalOpen(true); // 성공 모달 열기
		} else {
			// 학교가 목록에 없으면 경고 모달 열기
			setIsClosedModalOpen(true);
		}
	};

	const closeModal = () => {
		setIsClosedModalOpen(false);
		setIsSuccessModalOpen(false);
		if (schoolList.includes(schoolName)) {
			navigate("/children/group-purchase/photo");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
			{/* 카드 컨테이너 */}
			<div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full">
				{/* 헤더 */}
				<h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
					학교를 먼저 등록하세요 ! 🏫
				</h1>
				<p className="text-gray-500 text-center mb-8">
					검색할 학교명을 입력하세요.
				</p>

				{/* 입력 필드와 버튼 */}
				<div className="flex items-center space-x-3 mb-4">
					<input
						type="text"
						value={schoolName}
						onChange={(e) => setSchoolName(e.target.value)}
						placeholder="예: 서울고등학교"
						className="flex-1 px-3 py-3 text-gray-800 placeholder-gray-400 bg-gray-100 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition duration-300"
					/>
					<button
						onClick={handleSubmit}
						className="px-6 py-3  bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300"
					>
						입력
					</button>
				</div>

				{/* 자동완성 결과 */}
				{listopen && filteredSchools.length > 0 && (
					<div className="bg-gray-100 rounded-lg p-4 shadow-inner max-h-64 overflow-y-auto">
						{filteredSchools.map((school, index) => (
							<div
								key={index}
								onClick={() => handleAutoCompleteClick(school)} // 자동완성 항목 클릭 시
								className="p-2 bg-white rounded-md shadow mb-2 last:mb-0 hover:bg-blue-50 transition cursor-pointer"
							>
								{school}
							</div>
						))}
					</div>
				)}
			</div>

			{/* 경고 메시지 모달 */}
			{isClosedModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-gray-800 mb-4">
							학교가 존재하지 않아요.
						</h2>
						<div className="flex justify-end space-x-4">
							<button
								onClick={closeModal}
								className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600"
							>
								닫기
							</button>
						</div>
					</div>
				</div>
			)}

			{/* 성공 메시지 모달 */}
			{isSuccessModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h2 className="text-lg font-semibold text-blue-700 mb-4">
							🎉 학교 등록 완료!
						</h2>
						<p className="text-gray-600 mb-4">
							학교 등록이 성공적으로 완료되었어요!
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={closeModal}
								className=" bg-blue-500  px-4 py-2 rounded-lg text-white hover:bg-blue-600 hover:shadow-lg"
							>
								확인
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
