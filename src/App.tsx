import styled from "styled-components";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const Box = styled(motion.div)`
	width: 400px;
	height: 200px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 40px;
	position: absolute;
	top: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const box = {
	entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }),
	center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.3 } },
	exit: (back: boolean) => ({
		x: back ? 500 : -500,
		opacity: 0,
		scale: 0,
		transition: { duration: 0.3 },
	}),
};

function App() {
	const [visible, setVisible] = useState(1);
	const [back, setBack] = useState(false);
	const prevPlease = async () => {
		await setBack(true);
		setVisible((prev) => (prev === 1 ? 1 : prev - 1));
	};

	const nextPlease = async () => {
		await setBack(false);
		setVisible((prev) => (prev === 10 ? 10 : prev + 1));
	};
	const x = useMotionValue(0);
	const gradient = useTransform(
		x,
		[-800, 800],
		[
			"linear-gradient(135deg, #00a7ee, #0000ee)",
			"linear-gradient(135deg, #aeee00, #eeb200)",
		],
	);
	return (
		<Wrapper style={{ background: gradient }}>
			<AnimatePresence custom={back}>
				<Box
					custom={back}
					variants={box}
					initial="entry"
					animate="center"
					exit="exit"
					key={visible}
				>
					{visible}
				</Box>
			</AnimatePresence>
			<button onClick={nextPlease}>Next</button>
			<button onClick={prevPlease}>Prev</button>
		</Wrapper>
	);
}

export default App;
