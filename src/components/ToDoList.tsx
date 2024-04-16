import { useRecoilState, useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { Categories, IToDo, categoryState, toDoSelector, toDoState } from "../atoms";
import { styled } from "styled-components";
import React from "react";

const ToDoUL = styled.ul`
	list-style: square;
	margin: 5px 20px;
	display: flex;
	flex-direction: column;
`;

const ULBG = styled.div`
	background-color: rgba(1, 1, 1, 0.2);
	border: 2px solid rgba(255, 255, 255, 0.3);
	padding: 10px;
	height: 100%;
	overflow-y: scroll;
`;

const Title = styled.h1`
	font-size: 36px;
	font-weight: bold;
`;

const Main = styled.div`
	width: 100%;
	height: 87%;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const ToDoSection = styled.div`
	padding: 35px 35px 0px 35px;
	border: 2px solid white;
	width: 40%;
	height: 100%;
	margin: 0 auto;
`;

const ToDoSelect = styled.select`
	padding: 10px 0px;
	background-color: inherit;
	color: white;
	border: 1px solid white;
	border-radius: 4px;
	outline: none;
	option {
		background-color: #2f3640;
		padding: 3px 0;
	}
`;

function ToDoList() {
	const toDos = useRecoilValue(toDoSelector);
	const [category, setCategory] = useRecoilState(categoryState);
	const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
		setCategory(event.currentTarget.value as Categories);
	};
	return (
		<ToDoSection>
			<Title>투두 리스트!</Title>
			<hr></hr>
			<Main>
				<ToDoSelect value={category} onInput={onInput}>
					<option value={Categories.TO_DO}>ToDo</option>
					<option value={Categories.DOING}>Doing</option>
					<option value={Categories.DONE}>Done</option>
				</ToDoSelect>
				<CreateToDo />
				<ULBG>
					<ToDoUL>
						{toDos?.map((toDo) => (
							<ToDo key={toDo.id} {...toDo} />
						))}
					</ToDoUL>
				</ULBG>
			</Main>
		</ToDoSection>
	);
}

export default ToDoList;
