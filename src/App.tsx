import styled from "styled-components";

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
	color: ${(props) => props.theme.textColor};
`;

function App() {
	return (
		<Container>
			<H1>안녕하세요! 반갑습니다.</H1>
		</Container>
	);
}

export default App;
