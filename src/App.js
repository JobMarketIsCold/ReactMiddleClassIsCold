import styled from "styled-components";

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
	color: ${(props) => props.theme.textColor};
`;

function App() {
	return (
		<Wrapper>
			<Title>HI</Title>
		</Wrapper>
	);
}

export default App;
