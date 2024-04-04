import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {
	Link,
	Route,
	Switch,
	useLocation,
	useParams,
	useRouteMatch,
} from "react-router-dom";
import { styled } from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

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

const Overview = styled.div`
	display: flex;
	justify-content: space-around;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	margin: 15px 0px;
	border-radius: 10px;
`;
const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;
const Description = styled.p`
	margin: 20px 0px;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0px;
	gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 7px 0px;
	border-radius: 10px;
	color: ${(props) =>
		props.$isActive ? props.theme.accentColor : props.theme.textColor};
	a {
		display: block;
	}
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
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteStates>();
	const priceMatch = useRouteMatch("/:coinId/price");
	const chartMatch = useRouteMatch("/:coinId/chart");
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
		["info", coinId],
		() => fetchCoinInfo(coinId),
	);
	const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
		["tickers", coinId],
		() => fetchCoinTickers(coinId),
		{
			refetchInterval: 10000000,
		},
	);

	const loading = infoLoading && tickersLoading;
	return (
		<Container>
			<Helmet>
				<title>
					{state?.name
						? state.name
						: loading
						? "코인 로딩중..."
						: infoData?.name}
				</title>
			</Helmet>
			<Header>
				<Title>
					{state?.name
						? state.name
						: loading
						? "코인 로딩중..."
						: infoData?.name}
				</Title>
			</Header>
			{loading ? (
				<Loader>😫loading😫</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>심볼</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>순위</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>가격</span>
							<span>{tickerData?.quotes.USD.price.toFixed(2)}</span>
						</OverviewItem>
					</Overview>
					<Overview>
						<OverviewItem>
							<span>총량</span>
							<span>{tickerData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>최대 발행량</span>
							<span>{tickerData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>

					<Tabs>
						<Tab $isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab $isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>Price</Link>
						</Tab>
					</Tabs>

					<Switch>
						<Route path={`/:coinId/price`}>
							<Price />
						</Route>
						<Route path={`/:coinId/chart`}>
							<Chart coinId={coinId} />
						</Route>
					</Switch>
				</>
			)}
		</Container>
	);
}

export default Coin;
