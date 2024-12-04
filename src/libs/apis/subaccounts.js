const BASE_URL = "/api/subaccounts";

export async function fetchSubUsageBalance(userId) {
	try {
		const res = await fetch(`${BASE_URL}?userId=${userId}`, {
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

export async function fetchSubUsageHistory(type,userId) {
	try{
		const res =await fetch(`${BASE_URL}/histories?type=${type}&userId=${userId}`,{
			method:"GET",
			headers:{
				"Content-type": "application/json",
			},
		});
		return await res.json();
	} catch (error) {
		console.error(error);
		return {};
	}
}