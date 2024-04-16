import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import { styled } from "styled-components";

const ToDoInput = styled.input`
	width: 85%;
	height: 35px;
	padding: 5px 1px;
	border-radius: 0px;
	outline: none;
	border: none;
	background-color: inherit;
	color: white;
	font-weight: 500;
	border-bottom: 2px solid gray;
	transition: all 0.5s ease-in-out;
	&:focus {
		border-bottom: 2px solid white;
	}
`;

const ToDoBtn = styled.button`
	width: 12%;
	height: 35px;
	font-size: 12px;
	font-weight: bold;
	background-color: #52ac81;
	border: 2px solid gray;
`;

const ToDoForm = styled.form`
	width: 100%;
	height: 35px;
	display: flex;
	justify-content: space-between;
`;

interface IForm {
	toDo: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const category = useRecoilValue(categoryState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: category }, ...oldToDos]);
		setValue("toDo", "");
	};
	return (
		<ToDoForm onSubmit={handleSubmit(onValid)}>
			<ToDoInput
				{...register("toDo", { required: { value: true, message: "toDo를 입력해주세요" } })}
				placeholder="to do를 작성하세요"
			/>
			<ToDoBtn>추가</ToDoBtn>
		</ToDoForm>
	);
}

export default CreateToDo;
