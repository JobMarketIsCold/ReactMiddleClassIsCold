import styled from "styled-components";
import {
	AnimatePresence,
	motion,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { useState } from "react";
import { exit } from "process";

const Wrapper = styled(motion.div)`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	width: 50vw;
	gap: 10px;
	div:first-child,
	div:last-child {
		grid-column: span 2;
	}
`;

const Box = styled(motion.div)`
	height: 200px;
	background-color: rgba(255, 255, 255, 1);
	border-radius: 15px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function App() {
	const [id, setId] = useState<null | string>(null);
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
			<Grid>
				{[1, 2, 3, 4].map((n) => (
					<Box onClick={() => setId(n + "")} key={n} layoutId={n + ""} />
				))}
			</Grid>
			<AnimatePresence>
				{id ? (
					<Overlay
						onClick={() => setId(null)}
						initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
						animate={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
						exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
					>
						<Box layoutId={id} style={{ width: 400, height: 200 }} />
					</Overlay>
				) : null}
			</AnimatePresence>
		</Wrapper>
	);
}

export default App;
