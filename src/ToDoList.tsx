import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "styled-components";

const Span = styled.span`
	color: red;
`;

interface FormType {
	userName: string;
	email: string;
	password: string;
	checkPassword: string;
	extraError: string;
}

function ToDoList() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormType>({
		defaultValues: {
			email: "@naver.com",
		},
	});
	console.log(errors);

	const onValid = (data: FormType) => {
		if (data.password !== data.checkPassword) {
			return setError("checkPassword", { message: "password가 다릅니다." }, { shouldFocus: true });
		}
		//setError("extraError", { message: "서버 오프라인" });
	};
	return (
		<div>
			<form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit(onValid)}>
				<input
					{...register("userName", {
						required: { value: true, message: "userName이 필요합니다!" },
						validate: {
							no200won: (value) =>
								value.includes("200won") ? "아닛 200원을 포함하고 있다닛!!!" : true,
							noYejun: (value) =>
								value.includes("Yejun") ? "아닛 Yejun을 포함하고 있다닛!!!" : true,
							noSeunghun: (value) =>
								value.includes("Seunghun") ? "아닛 Seunghun을 포함하고 있다닛!!!" : true,
						},
					})}
					placeholder="userName"
				/>
				<Span>{errors?.userName?.message}</Span>
				<input
					{...register("email", {
						required: { value: true, message: "email이 필요합니다." },
						pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "naver메일만 허용됩니다." },
					})}
					placeholder="email"
				/>
				<Span>{errors?.email?.message}</Span>
				<input
					{...register("password", {
						required: { value: true, message: "Password가 필요합니다!" },
					})}
					placeholder="password"
				/>
				<Span>{errors?.password?.message}</Span>
				<input
					{...register("checkPassword", {
						required: { value: true, message: "Password 확인이 필요합니다!" },
					})}
					placeholder="checkPassword"
				/>
				<Span>{errors?.checkPassword?.message}</Span>
				<button>추가</button>
				<Span>{errors?.extraError?.message}</Span>
			</form>
		</div>
	);
}

export default ToDoList;
