import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";
import React from "react";

function App() {
	const [minutes, setMinutes] = useRecoilState(minuteState);
	const [hours, setHours] = useRecoilState(hourSelector);
	const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
		setMinutes(+event.currentTarget.value);
	};
	const onHoursChange = (event: React.FormEvent<HTMLInputElement>) => {
		setHours(+event.currentTarget.value);
	};
	return (
		<div>
			<input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minute" />
			<input value={hours} onChange={onHoursChange} type="number" placeholder="Hour" />
		</div>
	);
}

export default App;
