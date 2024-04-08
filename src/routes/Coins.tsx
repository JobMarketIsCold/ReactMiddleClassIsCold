import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
	padding: 0px 20px;
	max-width: 440px;
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
	background-color: ${(props) => props.theme.cardBgColor};
	color: ${(props) => props.theme.textColor};
	border-radius: 15px;
	margin-bottom: 10px;
	border: 1px solid white;
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

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

interface ICoinsProps {
	toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	return (
		<Container>
			<Helmet>
				<title>Coins</title>
			</Helmet>
			<Header>
				<Title>Coins</Title>
				<button onClick={toggleDark}>toggle</button>
			</Header>
			{isLoading ? (
				<Loader>😫loading😫</Loader>
			) : (
				<CoinsList>
					{data?.slice(0, 100).map((coin) => (
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
