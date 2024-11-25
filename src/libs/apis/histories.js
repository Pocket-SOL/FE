const BASE_URL = "/api";

export async function fetchHistoryDetail(historyId) {
	try {
		const res = await fetch(`${BASE_URL}/histories?id=${historyId}`, {
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
