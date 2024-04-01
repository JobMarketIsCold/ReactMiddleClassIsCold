import React from "react";
import { useParams } from "react-router-dom";

function Coin() {
	const { coinId } = useParams<{ coinId: string }>();
	return <div>Coin: {coinId}</div>;
}

export default Coin;
