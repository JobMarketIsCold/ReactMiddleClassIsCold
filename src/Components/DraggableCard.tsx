import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";

interface IDraggableCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
	// console.log(toDo, "렌더");
	return (
		<Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
			{(provided, snapshot) => (
				<Card
					isDragging={snapshot.isDragging}
					ref={provided.innerRef}
					{...provided.dragHandleProps}
					{...provided.draggableProps}
				>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
}

const Card = styled.div<{ isDragging: boolean }>`
	border-radius: 5px;
	padding: 10px 10px;
	margin-bottom: 5px;
	background-color: ${(props) => (props.isDragging ? "#74b9ff" : props.theme.cardColor)};
	box-shadow: ${(props) => (props.isDragging ? "0px 2px 2px rgba(0, 0, 0, 0.1)" : "none")};
`;

export default React.memo(DraggableCard);
