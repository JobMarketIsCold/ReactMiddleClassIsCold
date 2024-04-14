import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import React from "react";
import { useSetRecoilState } from "recoil";

const TextSpan = styled.span`
	margin-right: 10px;
`;

function ToDo({ text, category }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		console.log(name);
	};
	return (
		<li>
			<TextSpan>{text}</TextSpan>
			{category !== "TO_DO" && (
				<button name="TO_DO" onClick={onClick}>
					To Do
				</button>
			)}
			{category !== "DOING" && (
				<button name="DOING" onClick={onClick}>
					Doing
				</button>
			)}
			{category !== "DONE" && (
				<button name="DONE" onClick={onClick}>
					Done
				</button>
			)}
		</li>
	);
}
export default ToDo;
