import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
	const { register, handleSubmit, formState } = useForm();
	console.log(formState.errors);

	const onValid = (data: any) => {
		console.log(data);
	};
	return (
		<div>
			<form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
				<input
					{...register("userName", {
						required: { value: true, message: "userName이 필요합니다!" },
					})}
					placeholder="userName"
				/>
				<input {...register("email", { required: true })} placeholder="email" />
				<input {...register("password", { required: true })} placeholder="password" />
				<input {...register("checkPassword", { required: true })} placeholder="checkPassword" />
				<button>추가</button>
			</form>
		</div>
	);
}

export default ToDoList;
