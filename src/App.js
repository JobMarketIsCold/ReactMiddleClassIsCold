import styled from "styled-components";

const Father = styled.div`
	display: flex;
`;

const Boxone = styled.div`
	background-color: teal;
	width: 100px;
	height: 100px;
`;

const Boxtwo = styled.div`
	background-color: tomato;
	width: 100px;
	height: 100px;
`;

function App() {
	return (
		<Father>
			<Boxone />
			<Boxtwo />
		</Father>
		// <div style={{ display: "flex" }}>
		// 	<div style={{ backgroundColor: "teal", width: 100, height: 100 }}></div>
		// 	<div style={{ backgroundColor: "tomato", width: 100, height: 100 }}></div>
		// </div>
	);
}

export default App;
