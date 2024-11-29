const BASE_URL = "/api/users";

export async function fetchSaveToken(userId, token) {
	const data = {
		userId: userId,
		token: token,
	};
	console.log("data", data);
	try {
		const res = await fetch(`${BASE_URL}/token`, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const responseData = await res.json();
		console.log("Token updated successfully:", responseData);
		return responseData;
	} catch (error) {
		console.error("Failed to update token:", error);
		throw error;
	}
}
