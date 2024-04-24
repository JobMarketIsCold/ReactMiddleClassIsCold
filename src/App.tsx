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
	justify-content: space-around;
	align-items: center;
`;

const Box = styled(motion.div)`
	width: 400px;
	height: 400px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
	background-color: #00a5ff;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
	const [clicked, setClicked] = useState(false);
	const toggleClicked = () => setClicked((prev) => !prev);
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
		<Wrapper onClick={toggleClicked} style={{ background: gradient }}>
			<Box>{!clicked ? <Circle layoutId="circle" /> : null}</Box>
			<Box>
				{clicked ? <Circle layoutId="circle" style={{ scale: 2 }} /> : null}
			</Box>
		</Wrapper>
	);
}

export default App;
