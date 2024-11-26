const BASE_URL = "/api/histories";

export async function fetchHistoryDetail(historyId) {
	try {
		const res = await fetch(`${BASE_URL}?id=${historyId}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return {};
	}
}

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
