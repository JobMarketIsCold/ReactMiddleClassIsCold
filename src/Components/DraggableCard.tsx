import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

interface IDraggableCardProps {
	toDo: string;
	index: number;
}

function DraggableCard({ toDo, index }: IDraggableCardProps) {
	console.log(toDo, "렌더");
	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(provided) => (
				<Card ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
}

const Card = styled.div`
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 5px;
	background-color: ${(props) => props.theme.cardColor};
`;

export default React.memo(DraggableCard);
