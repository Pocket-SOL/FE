const BASE_URL = "/api";
import axios from "axios";

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

export async function fetchAccountNumber(userId) {
	try {
		const res = await fetch(`${BASE_URL}/accounts/number?id=${userId}`, {
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

export async function fetchCreateAccount(id, num) {
	try {
		const res = await fetch(`${BASE_URL}/accounts`, {
			method: "POST",
			body: JSON.stringify({
				id: id,
				num: num,
			}),
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

export async function fetchGetAccount(id) {
	try {
		const res = await fetch(`${BASE_URL}/accounts/balance?id=${id}`, {
			method: "GET",
			headers: {
				"Content-type": "application/json",
			},
		});
		return res.json();
	} catch (error) {
		console.log("Failed to get account balance:", error);
		throw error;
	}
}

export const transferMoney = async (childUserId, requestData) => {
	try {
		const response = await axios.post(
			`${BASE_URL}/accounts/${childUserId}`,
			requestData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		return response.data;
	} catch (error) {
		if (error.response) {
			throw new Error(
				error.response.data.message || "서버 오류가 발생했습니다.",
			);
		} else if (error.request) {
			throw new Error(
				"서버와 통신할 수 없습니다. 네트워크 연결을 확인해주세요.",
			);
		}
		throw new Error("송금 요청 중 오류가 발생했습니다.");
	}
};
