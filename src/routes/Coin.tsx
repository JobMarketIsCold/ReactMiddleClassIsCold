import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 20px 0px;
`;

const Title = styled.h1`
	font-size: 48px;
	font-weight: 700;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.h1`
	font-size: 48px;
	height: 60vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface RouteParams {
	coinId: string;
}

interface RouteStates {
	name: string;
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	logo: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

function Coin() {
	const [loading, setLoading] = useState(true);
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteStates>();
	const [info, setInfo] = useState<InfoData>();
	const [priceInfo, setPriceInfo] = useState<PriceData>();
	useEffect(() => {
		(async () => {
			const infoData = await (
				await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
			).json();
			console.log(infoData);
			setInfo(infoData);
			const priceData = await (
				await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
			).json();
			console.log(priceData);
			setPriceInfo(priceData);
		})();
	}, []);
	return (
		<Container>
			<Header>
				<Title>{state?.name || "이름 로딩중"}</Title>
			</Header>
			{loading ? <Loader>😫loading😫</Loader> : null}
		</Container>
	);
}

export default Coin;
