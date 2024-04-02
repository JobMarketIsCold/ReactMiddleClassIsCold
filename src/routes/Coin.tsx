import React, { useState } from "react";
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

function Coin() {
	const [loading, setLoading] = useState(true);
	const { coinId } = useParams<RouteParams>();
	const { state } = useLocation<RouteStates>();
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
