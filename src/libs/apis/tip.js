const BASE_URL = "/api/tip";

export async function fetchTip() {
	try {
		const res = await fetch(`${BASE_URL}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});
		return await res.json();
	} catch (error) {
		console.log(error);
		return {};
	}
}
