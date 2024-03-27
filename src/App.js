import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const rotationAnime = keyframes`
	0% {
		border-radius: 10px;
	}
	50% {
		border-radius: 100px;
	}
	100% {
		transform: rotate(360deg);
		border-radius: 10px;
	}
`;

const Emoji = styled.span`
	font-size: 60px;
`;

const Box = styled.div`
	height: 200px;
	width: 200px;
	background-color: tomato;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${rotationAnime} 2s linear infinite forwards;
	${Emoji} {
		&:hover {
			// span:hover와 동일하다.
			font-size: 70px;
		}
	}
`;

function App() {
	return (
		<Wrapper>
			<Box>
				<Emoji>🤓👆</Emoji>
			</Box>
		</Wrapper>
	);
}

export default App;
