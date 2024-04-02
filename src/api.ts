export async function fetchCoins() {
	return await fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
		response.json(),
	);
}
