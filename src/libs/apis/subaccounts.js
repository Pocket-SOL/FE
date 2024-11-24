const BASE_URL = "/api";

export async function fetchSubUsageBalance(userId) {
	try {
		const res = await fetch(`${BASE_URL}/subaccounts?userId=${userId}`, {
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
