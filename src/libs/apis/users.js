const BASE_URL = "/api/users";

export async function fetchSaveToken(userId, token, no) {
	const data = {
		userId: userId,
		token: token,
		user_seq_no: no,
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

export async function fetchUser(token, user_seq_no) {
	try {
		const res = await fetch(
			`/api/users/me?token=${token}&user_seq_no=${user_seq_no}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error calling API:", error);
	}
}
