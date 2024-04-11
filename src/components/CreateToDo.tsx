import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
	toDo: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		console.log("add to do", toDo);
		setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);
		setValue("toDo", "");
	};
	return (
		<form onSubmit={handleSubmit(onValid)}>
			<input
				{...register("toDo", { required: { value: true, message: "toDo를 입력해주세요" } })}
				placeholder="to do를 작성하세요"
			/>
			<button>추가</button>
		</form>
	);
}

export default CreateToDo;
