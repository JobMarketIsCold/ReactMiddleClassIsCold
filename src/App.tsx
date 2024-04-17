import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
	const onDargEnd = () => {};
	return (
		<DragDropContext onDragEnd={onDargEnd}>
			<div>
				<Droppable droppableId="one">
					{(provided) => (
						<ul {...provided.innerRef} {...provided.droppableProps}>
							<Draggable draggableId="first" index={1}>
								{(provided) => (
									<li {...provided.draggableProps} {...provided.dragHandleProps}>
										One
									</li>
								)}
							</Draggable>
							<Draggable draggableId="first" index={1}>
								{(provided) => (
									<li {...provided.draggableProps} {...provided.dragHandleProps}>
										Two
									</li>
								)}
							</Draggable>
						</ul>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
}

export default App;
