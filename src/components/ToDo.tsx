import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import React from "react";
import { useSetRecoilState } from "recoil";

const TextSpan = styled.span`
	margin-right: 10px;
`;

const CategoryBtn = styled.button`
	background-color: #434341;
	color: white;
	border: 2px solid gray;
	margin-right: 5px;
`;

const ToDoList = styled.li`
	/* margin-bottom: 5px; */
`;

function ToDo({ text, category, id }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		setToDos((oldToDos) => {
			const findIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const oldToDo = oldToDos[findIndex];
			const newToDo = { text, id, category: name as IToDo["category"] };
			return [...oldToDos.slice(0, findIndex), newToDo, ...oldToDos.slice(findIndex + 1)];
		});
	};
	return (
		<ToDoList>
			<TextSpan>{text}</TextSpan>
			{category !== "TO_DO" && (
				<CategoryBtn name="TO_DO" onClick={onClick}>
					To Do
				</CategoryBtn>
			)}
			{category !== "DOING" && (
				<CategoryBtn name="DOING" onClick={onClick}>
					Doing
				</CategoryBtn>
			)}
			{category !== "DONE" && (
				<CategoryBtn name="DONE" onClick={onClick}>
					Done
				</CategoryBtn>
			)}
		</ToDoList>
	);
}
export default ToDo;
