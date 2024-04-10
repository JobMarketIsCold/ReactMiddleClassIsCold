import React, { useState } from "react";
import { useForm } from "react-hook-form";

function ToDoList() {
	const { register, watch } = useForm();
	console.log(watch());
	return (
		<div>
			<form>
				<input {...register("userName")} placeholder="userName" />
				<input {...register("email")} placeholder="email" />
				<input {...register("password")} placeholder="password" />
				<input {...register("checkPassword")} placeholder="checkPassword" />
				<button>추가</button>
			</form>
		</div>
	);
}

export default ToDoList;
