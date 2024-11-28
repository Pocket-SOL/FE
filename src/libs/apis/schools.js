import axios from "axios";
const BASE_URL = "/api/schools";

//s3에 사진 upload
export async function uploadHistoryImage(file, directory) {
	try {
		// FormData 객체 생성
		const formData = new FormData();
		formData.append("directory", directory);
		formData.append("image", file);

		// fetch 요청
		const res = await fetch(`${BASE_URL}/img`, {
			method: "POST",
			body: formData,
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return {};
	}
}

//s3업로드한 반환 값으로 모델 - photo에 반영
export async function updateHistoryImage(id, imgUrl) {
	console.log("school", id);
	try {
		const response = await axios.put(`${BASE_URL}/${id}`, { imgUrl });
		return response.data; // 성공적인 응답 데이터 반환
	} catch (error) {
		console.error("Error updating history photo:", error);
		throw error; // 호출부에서 에러를 처리할 수 있도록 던짐
	}
}
