import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoState } from "../atoms";
import { styled } from "styled-components";

const ToDoUL = styled.ul`
	list-style: square;
	margin: 5px 20px;
`;

function ToDoList() {
	const toDos = useRecoilValue(toDoState);
	console.log(toDos);
	return (
		<div>
			<h1>투두 리스트!</h1>
			<hr></hr>
			<CreateToDo />
			<ToDoUL>
				{toDos.map((toDo) => (
					<ToDo key={toDo.id} {...toDo} />
				))}
			</ToDoUL>
		</div>
	);
}

export default ToDoList;
