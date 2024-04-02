import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.bgColor};
	border-radius: 15px;
	margin-bottom: 10px;
	a {
		padding: 20px;
		transition: color 0.2s ease-in;
		display: flex;
		align-items: center;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Loader = styled.h1`
	font-size: 48px;
	height: 60vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Title = styled.h1`
	font-size: 48px;
	font-weight: 700;
	color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
	width: 30px;
	height: 30px;
	margin-right: 20px;
`;

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const [coins, setCoins] = useState<CoinInterface[]>([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			const response = await fetch("https://api.coinpaprika.com/v1/coins");
			const json = await response.json();
			setCoins(json.slice(0, 100));
			setLoading(false);
		})();
	}, []);
	return (
		<Container>
			<Header>
				<Title>Coins</Title>
			</Header>
			{loading ? (
				<Loader>😫loading😫</Loader>
			) : (
				<CoinsList>
					{coins.map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name },
								}}
							>
								<Img
									src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
									alt=""
								/>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}

export default Coins;
