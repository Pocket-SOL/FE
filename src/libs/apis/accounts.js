const BASE_URL = "/api";

export async function fetchUsageBalance(userId) {
	try {
		const res = await fetch(`${BASE_URL}/accounts?id=${userId}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});
		// console.log(res, res.json());
		return await res.json();
	} catch (error) {
		console.error(error);
		return {};
	}
}

export async function fetchUsageHistory(userId) {
	try {
		const res = await fetch(`${BASE_URL}/accounts/history?id=${userId}`, {
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

export async function fetchWithdrawal(userId) {
	try {
		const res = await fetch(`${BASE_URL}/accounts/withdrawals?id=${userId}`, {
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
