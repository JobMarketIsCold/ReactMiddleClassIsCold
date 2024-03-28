import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
	bgColor: string;
	borderColor: string;
}

const Container = styled.div<ContainerProps>`
	width: 200px;
	height: 200px;
	background-color: ${(props) => props.bgColor};
	border-radius: 50%;
	border: 3px solid ${(props) => props.borderColor};
`;

interface CircleProps {
	bgColor: string;
	borderColor?: string;
	text?: string;
}

function Circle({ bgColor, borderColor, text = "Default Text" }: CircleProps) {
	const [value, setValue] = useState(0);
	return (
		<Container bgColor={bgColor} borderColor={borderColor ?? "red"}>
			{text}
		</Container>
	);
}

export default Circle;
