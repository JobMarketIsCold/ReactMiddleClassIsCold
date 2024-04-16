import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

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

const RemoveBtn = styled.button`
	background-color: #a91e1e;
	color: white;
	border: 2px solid gray;
	margin-right: 5px;
`;

function ToDo({ text, category, id }: IToDo) {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		setToDos((oldToDos) => {
			const findIndex = oldToDos.findIndex((toDo) => toDo.id === id);
			const newToDo = { text, id, category: name as Categories };
			return [...oldToDos.slice(0, findIndex), newToDo, ...oldToDos.slice(findIndex + 1)];
		});
	};
	const onRemove = () => {
		setToDos((oldToDos) => {
			const newToDo = oldToDos.filter((toDo) => toDo.id !== id);
			return [...newToDo];
		});
	};
	return (
		<ToDoList>
			<TextSpan>{text}</TextSpan>
			{category !== Categories.TO_DO && (
				<CategoryBtn name={Categories.TO_DO} onClick={onClick}>
					To Do
				</CategoryBtn>
			)}
			{category !== Categories.DOING && (
				<CategoryBtn name={Categories.DOING} onClick={onClick}>
					Doing
				</CategoryBtn>
			)}
			{category !== Categories.DONE && (
				<CategoryBtn name={Categories.DONE} onClick={onClick}>
					Done
				</CategoryBtn>
			)}
			<RemoveBtn onClick={onRemove}>Remove</RemoveBtn>
		</ToDoList>
	);
}
export default ToDo;
