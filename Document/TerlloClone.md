# Ch07 시작

일단 이번 챕터에서는 kanban형식의 drag&drop형태로 구성되어있는 앱을 만들어볼 것이다.

그 전에 저번 챕터에서 하지 못하였던, recoil selector에 set기능을 알아보기위한 간단한 앱을 만들어보고 넘어갈 것이다.

## 앱 구성

```jsx
<input type="number" placeholder="Minute" />
<input type="number" placeholder="Hour" />
```

일단 기본적으로 분에 60을 넣으면 hour로 치환되는 앱을 만들어볼 것이다.

```JSX
export const minuteState = atom({
  key: "minute",
  default: 0,
});
```

이런식으로 atom을 만들어주고,

```JSX
function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minute" />
      <input type="number" placeholder="Hour" />
    </div>
  );
}
```

이렇게 화면을 구성해줄 것이다.

여기서 짜잘한 **TIP**이 존재하는데 minuteState는 number이기에 event.currentTarget.value를 넘겨준다면 string이기에 오류가 날 것이다.
**하지만**, event.currentTarget.value앞에 +를 붙여준다면 string->number 타입으로 바뀌게 된다. ( 꿀팁! )

그럼, 이제 selector를 사용하여 state의 아웃풋을 변형시켜서 minute을 hour로 변환해보자.

```JSX
export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
});
```

이런식으로 hourSelector를 만들어주고!

```JSX
function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinutesChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value);
  };
  return (
    <div>
      <input value={minutes} onChange={onMinutesChange} type="number" placeholder="Minute" />
      <input value={hours} type="number" placeholder="Hour" />
    </div>
  );
}
```

useRecoilValue로 가져와서 input value에 적용시켜주면 된다.

이렇게 코드를 작성하게 된다면, 분에서 시간으로 변환이 잘 될 것이다.
하지만 시간에서 분으로 변환은 아직 안될 것이다. ( onChange가 없어 read-only )

그걸 하기위해서 우리는 selector의 set을 사용할 수 있다.
get에서 우리가 atom의 값을 가져온 것처럼 set에서는 atom의 값을 변하게 할 수 있다.

## Set 알아보기

일단 set에 대해서 먼저 알아보면 set은 selector에 존재하는 property이다.
set을 사용함으로서 우리는 atom의 값을 변경할 수 있다.

set에는 2가지 인자가 있다.

- 첫 번째 인자 opts안에 `set`
  - set(atom이름, 변경할 값) <- 이런식으로 사용가능
- 두 번째 인자 newValue
  - newValue는 modifier func을 사용해서 넘겨준 값을 받을 수 있다.

그럼 사용해보자

```JSX
export const hourSelector = selector({
  key: "hours",
  get: ({ get }) => {
    const minutes = get(minuteState);
    return minutes / 60;
  },
  set: ({ set }, newValue) => {
    const minutes = +newValue * 60;
    set(minuteState, minutes);
  },
});
```

이런식으로 set property를 작성해서 newValue곱하기 60을 해주면 값을 받을 수 있다.

그리고

```JSX
const [hours, setHours] = useRecoilState(hourSelector);
```

selector로 useRecoilState를 사용해서 modifier함수를 받을 수 있는데,
이게 바로 set property함수를 사용하는 것이다. ( 여기서 넘겨준 값이 newValue이다 )

그리고 onChange함수를 만들어주면..

```JSX
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
```

짜잔 완성이다.

이제 recoil의 selector의 get과 set에 대해서도 알아보았고 그러면 recoil 연습을 위한 Drag&Drop을 위한 Kanban project를 시작해보자

---

## Kanban ( react-beautiful-dnd )

이제 drag&drop list를 만들 것이다.

하기위해서 react-beautiful-dnd라는 라이브러리를 사용할 것이다.
react-beautiful-dnd은 drag&drop을 쉽게 해주는 유용한 라이브러리이다.

세 가지의 큰 컴포넌트들이 존재하는데,

- DragDropContext
  - Drag&Drop을 할 영역을 지정해준다.
- Droppable
  - Drop할 수 있는 영역
- Draggable - Drag할 수 있는 영역
  이라고 보면 된다.

[npm문서 링크](https://www.npmjs.com/package/react-beautiful-dnd) <- 자세한 점을 여기서 보면 된다.

### 기본 세팅

먼저 기본적인 세팅을 해보면 아래처럼 된다.

```JSX
function App() {
  const onDargEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDargEnd}>
      <div>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="first" index={1}>
                {() => <li>One</li>}
              </Draggable>
              <Draggable draggableId="first" index={1}>
                {() => <li>Two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
```

솔직히 처음보면 뭐가 뭔지 모를 것 같다.
하나하나 설명을 해보자면,

- DragDropContext는 onDragEnd라는 props가 필수적으로 들어가야 한다
- DragDropContext는 child가 필수로 있어야 한다.
- Droppable는 droppableId라는 props가 필수적으로 들어가야 한다.
- Droppable는 child가 필수로 있어야 하고 함수의 형태로 있어야 한다.
- Draggable는 draggableId와 index라는 props가 필수적으로 들어가야 한다.
- Draggable는 child가 필수로 있어야 하고 함수의 형태로 있어야 한다.
- Droppable과 Draggable의 child함수의 인자로 무언가를 넣어준다.

인자에서는 ul과 li에 넣어야할 props를 전달해준다. ( provided라고 부른다 )

```JSX
function App() {
  const onDargEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDargEnd}>
      <div>
        <Droppable droppableId="one">
          {(provided) => (
            <ul ref={provided.innerRef} {...provided.droppableProps}>
              <Draggable draggableId="first" index={1}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    One
                  </li>
                )}
              </Draggable>
              <Draggable draggableId="second" index={2}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
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
```

와 진짜 엄청 긴 세팅을 하고 실행을 해본다면, 자연스럽게 Drag&Drop이 되는것을 알 수 있다.
( 함수를 안만들어서 상태 저장은 아직 안된다 )

코드를 보면 엄청나게 많은 props를 받은 것을 볼 수가 있는데, 아직은 잘 이해를 못하였기에 하면서 이해를 해보자. ( Ref인자는 나중에 자세히 설명할 것이다 )

알고있는거만 적어보면

- droppableProps는 ul에 넣어야 하는 props이다.
- dranggableProps를 넣어주면 drag가 가능하다.
- 특정 영역을 통해서만 드래그를 가능하도록 하고 싶을 때 사용한다.
  - 다른 handle를 원하는 위치에 넣으면 -> 그 위치만 드래그 가능
- Using innerRef
  - < Draggable /> 및 < Droppable /> 컴포넌트 모두 HTMLElement를 제공해야 합니다.
  - 이것은 DraggableProvided 및 DroppableProvided 객체의 innerRef 속성을 사용하여 수행됩니다.

```JSX
<Draggable draggableId="first" index={1}>
	{(provided) => (
	  <li ref={provided.innerRef} {...provided.draggableProps}>
		{" "}
		<span {...provided.dragHandleProps}>ℹ️</span>
		One
	  </li>
	)}
  </Draggable>
  <Draggable draggableId="second" index={2}>
	{(provided) => (
	  <li ref={provided.innerRef} {...provided.draggableProps}>
		{" "}
		<span {...provided.dragHandleProps}>ℹ️</span>
		Two
	  </li>
	)}
</Draggable>
```

이런식으로 코드를 작성하면 ℹ️부분에만 드래그가 가능하다.

그리고 스타일을 좀 꾸미고,
이제 우리는 draggable을 array형태로 만들어서 좀 더 편하게 사용할 것이다.

```JSX
const toDos = ["a", "b", "c", "d", "e"];

function App() {
	const onDargEnd = () => {};
	return (
		<DragDropContext onDragEnd={onDargEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId="one">
						{(provided) => (
							<Board ref={provided.innerRef} {...provided.droppableProps}>
								{toDos.map((toDo, index) => (
									<Draggable draggableId={toDo} index={index}>
										{(provided) => (
											<Card
												ref={provided.innerRef}
												{...provided.dragHandleProps}
												{...provided.draggableProps}
											>
												{toDo}
											</Card>
										)}
									</Draggable>
								))}
							</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}
```

이런식으로 간단하게 map으로 구현을 할 수 있다.

하지만 오브젝트를 드래그하면 그 크기만큼 커지거나 작아진다.
이걸 해결하는 방법으로는 placeholder라는 것을 사용하면 된다.

- Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다.
- Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다.
- Draggable 노드의 형제로 렌더링하는 것이 좋습니다.

```JSX
  <Board ref={provided.innerRef} {...provided.droppableProps}>
	{toDos.map((toDo, index) => (
	  <Draggable draggableId={toDo} index={index}>
		{(provided) => (
		  <Card
			ref={provided.innerRef}
			{...provided.dragHandleProps}
			{...provided.draggableProps}
>
			{toDo}
		  </Card>
		)}
	  </Draggable>
	))}
	{provided.placeholder}
  </Board>
```

이제 이런식으로 Draggable이 끝나는 곳에 plaaceholder를 넣어준다면, list의 크기가 변하지 않는걸 볼 수 있다.

### 재정렬

이제 우리는 recoil을 사용해서 toDo array를 재정렬하는 작업을 해 볼 것이다.

일단 toDoState라는 atom을 만들고 useRecoilState를 사용하여 가져와준다.

그리고 우리는 onDragEnd라는 이벤트의 함수를 만들어 줄 것이다.
onDragEnd라는 함수는 어떤일이 일어났는지에 대한 정보로 많은 인자를 준다.

인자중에 중요한 정보는 source와 destination이다.
source에서 원래 내가 어디 index인지 어디 droppable에서 왔는지 알려주고
destination에서 내가 어디에 drop을 하였는지 그 위치의 index와 droppable을 알려준다.

---

**팁**

```JSX
const onDargEnd = ({ destination, source }: DropResult) => {};
```

이런식으로 onDragEnd 이벤트에는 DropResult라는 Type이 필요하다.

그럴 때는 onDragEnd의 타입 정의를 들어가서 찾아보면 무슨 타입을 지정해야 될지 유추할 수 있다!

---

이제 우리는 재정렬하는 로직을 짜야한다.
일단 배열에서 source index의 값을 삭제하고, destination index에 값을 넣어주면 된다.

구현을 하기 위해서 우리는 splice라는 함수를 사용할 것이다.
splice는 인자가 2개 이상이지만 거의 2개만 사용하게 될 것이다.
splice의 첫 번째 인자는 시작 위치 index이다. 그리고 두 번째 인자는 지우는 item의 개수이다.
`array.splice(0, 1)` <- 0번째 index부터 1개의 item을 지운다.

그럼 splice를 사용해서 지웠다고 하면 어떻게 destination index의 값을 넣어줄 수 있을까?
또 splice를 사용해주면 된다.
splice의 3번째 인자부터는 추가할 값이다.
`array.splice(1, 0, "a")` <- 1번째 index에 아무것도 지우지 않고 "a"라는 값을 추가한다.

하지만 splice를 사용하게 되면 array를 mutate하게 수정하게 된다.
mutate하게 사용하면 안좋은점은 reference를 전달하기에 해당 값을 사용하는 모든 곳에 영향을 줄 수 있게 된다. ( 꼬일 수 있는 가능성이 높아진다 )
하지만, immutate하면 value를 전달해주기에 독립적인 값을 전달해준다.

```JSX
const onDargEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      copyToDos.splice(source.index, 1);
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
};
```

이런식으로 코드를 짜줄 수 있다.

그리고 Draggable의 key와 draggableId가 다르면 안되고 똑같아야지 버그가 일어나지 않는다고 한다. ( React에서는 key를 숫자로 주는게 익숙하지만, 이 라이브러리에서는 이런식으로 사용을 해줘야 한다 )

### 성능 문제 해결

이제 재정렬은 잘 되지만 렌더링하는 과정에서 약간의 간극이 발생할 수도 있다.
이제 이 부분을 해결해볼 것이다.

지금 문제는 react.js에서 component의 state가 변하면 해당 component 전체가 리렌더링 된다. 즉 "a"라는 리스트를 드래그 할 때마다 abcdefg가 전부 리렌더링이 된다.

물론 react.js에서 parent가 바뀌면 child가 바뀌는것은 아주 좋다.
하지만 이런점이 필요없을 때도 있다.

그래서 우리는 react.memo를 사용해서 해결할 수 있다.

### react.memo

react.memo는 react에게 이 component는 props가 바뀌지 않는 이상 렌더링하지마! 라고 말하는 역활을 한다.

사용은 아래처럼 할 수 있다.

```JSX
export default React.memo(DraggableCard);
```

이러한 코드를 작성하게 되면,
react에게 DraggableCard의 props가 바뀌지 않는 이상 렌더링하지마! 라고 말하는 것과 같다.

만약, props가 바뀌게 된다면 react memo는 그 item만 리렌더링을 한다.

그렇다고 너무 난발하지는 말고 재랜더링이 많고 props가 변경될 때만 렌더링하면 되는 component에 사용하자!

> 너무 빨리 list를 움직이면 에러가 난다.
> 찾아보니 아직 고쳐지지 않은거 같은데 해결법을 잘 모르겠다.

### Multi Board

이번엔는 Board를 여러 개 만들어 볼 것이다.
그러기 위해서는 우리는 toDoState의 구조를 바꿔야 한다.

```TSX
export const toDoState = atom({
  key: "toDo",
  default: {
    to_do: ["a", "b"],
    doing: ["c", "d"],
    done: ["e", "f"],
  },
});
```

이런식으로 구성이 될 것이다.

그리고 board라는 컴포넌트를 만들어서 재사용가능하게 만들어주자

```JSX
function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {(provided) => (
        <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} toDo={toDo} index={index} />
          ))}
          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}
```

이제 우리는 app에서 toDos를 어떻게 반복을 돌릴까 생각을 해봐야한다.
이제 toDosState가 object형식이 되어버렸기에 map을 사용 못하기 때문이다.

그럴 때는 또 방법이 있다!

일단 Object.keys(toDos)를 사용해주면 object안에 property들만 리턴해준다.
그럼 여기다가 map을 사용해서 toDos의 property의 배열을 하나씩 빼줄 수 있다!

```TSX
<Boards>
  {Object.keys(toDos).map((boardId) => (
	<Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
  ))}
</Boards>
```

이런식으로 코드를 작성할 수 있다.

하지만 이러면 toDos\[boardId\]쪽에서 오류가 난다.
그 이유는 toDoState의 값이 default값을 제외하고 다른게 올 수 있다고 오류를 띄운다.

이럴 때는 우리가 유저에게 property, 즉 보드를 추가할 수 있게 해줄 수도 있으므로 아래처럼 interface를 만들어주면 된다.

```TSX
interface IToDoState {
  [key: string]: string[];
}
```

그리고 atom에 적용시켜주면 끝이다.

그러면 보드 3개를 만들어줄 수 있다.

그럼 이제 또 보드를 재정렬하는 기능을 만들어보자
일단 보드 하나에서 재정렬되는 기능을 만들어볼 것이다.

```TSX
const onDragEnd = (info: DropResult) => {
    const { draggableId, destination, source } = info;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
  };
```

이런식으로 비슷하게 만들어줄 수 있다.
\[source.droppableId\] 이런식으로 사용하는 것은 key에 변수를 사용할 때는 []안에 변수를 써야 하는 자바스크립트 문법 때문에 그렇다. (Computed property name)

---

**글 형식 변경**
프로젝트를 하면서 목표를 좀 등한시하였더니 기간은 정확히 일주일 남았는데 진도가 좀 느리다.
그리고 글을 작성하면 너무 글이 길어지고 중요한 부분이 흐려지는 느낌을 받았다.

그래서 글을 작성할 때, 강의를 보면서 전체적으로 느낀 부분과 중요한 부분만을 축약해서 작성하겠다.

그리고 굳이 안적어도 되는 파트의 강의는 글을 작성하지 않고 넘기겠다.

---

### Board Movement

지난번에 같은 보드안에서의 움직임을 구현하였다.
이번 시간에는 다른 보드로 넘어가는 것을 구현하였다.

구현 방법은 같은 보드에서 움직이는 것과 비슷하게,
현재 보드의 값, 타켓 보드의 값을 바고 splice를 사용해서 구현하면 된다.

```TSX
if (destination.droppableId !== source.droppableId) {
  setToDos((allBoards) => {
	const sourceBoard = [...allBoards[source.droppableId]];
	const destinationBoard = [...allBoards[destination.droppableId]];
	sourceBoard.splice(source.index, 1);
	destinationBoard.splice(destination?.index, 0, draggableId);
	return {
	  ...allBoards,
	  [source.droppableId]: sourceBoard,
	  [destination.droppableId]: destinationBoard,
	};
  });
}
```

---

### snapshot

droppable이 주는 인자인 snapshot을 이용해서 움직임에 따라 css를 바꿀 것이다.

- isDraggingOver
  - 현재 선택한 Draggable이 특정 Droppable위에 드래깅 되고 있는지 여부 확인
- draggingFromThisWith
  - 현재 Droppable에서 벗어난 드래깅되고 있는 Draggable ID
- draggingOverWith
  - Droppable 위로 드래그하는 Draggable ID
- isUsingPlaceholder
  - placeholder가 사용되고 있는지 여부

styled-components의 props를 주기 위해서는 아래처럼 사용하면 된다.

```TSX
const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver ? "pink" : props.isDraggingFromThis ? "red" : "blue"};
  flex-grow: 1;
`;
```

---

droppable도 되었으니 draggable도 된다는 생각을 할 수 있는데 된다.

우리는 여기서 isDragging이라는 것만 사용을 할 것이다.

- Draggable이 활발하게 드래그 중이거나 드롭 애니메이션인 경우 true로 설정합니다.

---

### Ref

드디어 ref에 대해 알아본다.

ref는 react 코드를 이용해서 HTML 요소를 지정하고, 가져올 수 있는 방법이다.
따라서 자바스크립트로부터 HMTL 요소를 가져오고 수정하는 방법이다.
document.getElement이러던거랑 거의 똑같다고 보면 된다.

그래서 React에서는 useRef를 사용해서 특정 HTML요소를 가져올 수 있다.

쉽게 말하면
ref는 HTML 요소를 가져와서 변형시키게 해준다.
useRef를 사용해서 ref를 넣을 변수를 만들고 ref={변수}를 해서 ref를 가져와서 사용할 수 있다.
이런식으로 HTML의 모든 메서드의 접근이 가능하다.

---

### 구조 변경

이번 강의에서는 구조 변경만 하였기에 딱히 적을 부분이 존재하지 않는다.

---

끝
