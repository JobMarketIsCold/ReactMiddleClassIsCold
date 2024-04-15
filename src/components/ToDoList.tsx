import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoState } from "../atoms";
import { styled } from "styled-components";

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

function ToDoList() {
	const toDos = useRecoilValue(toDoState);
	console.log(toDos);
	return (
		<ToDoSection>
			<Title>투두 리스트!</Title>
			<hr></hr>
			<Main>
				<CreateToDo />
				<ULBG>
					<ToDoUL>
						{toDos.map((toDo) => (
							<ToDo key={toDo.id} {...toDo} />
						))}
					</ToDoUL>
				</ULBG>
			</Main>
		</ToDoSection>
	);
}

export default ToDoList;
