# 알게 된 점

- 직관성이 엄청나게 좋아진다.

```JS
import styled from "styled-components";
function App() {
	return (
		<Father>
			<Boxone />
			<Boxtwo />
		</Father>
	);
}
```

- props를 사용해서 값을 유동적으로 바꿀 수 있다.

```JS
const Box = styled.div`
	background-color: ${(props) => props.bgColor};
	width: 100px;
	height: 100px;
`;

function App() {
	return (
		<Father>
			<Box bgColor="teal"></Box>
			<Box bgColor="tomato"></Box>
		</Father>
	);
}
```

- 확장에 용이하다.

```JS
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50%;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal"></Box>
      <Circle bgColor="tomato"></Circle>
    </Father>
  );
}
```

- as props를 사용해서 tag를 바꿀 수 있다.

```JS
function App() {
  return (
    <Father>
      <Btn>Log In</Btn>
      <Btn as="a">Log In</Btn>
    </Father>
  );
}
```

- attrs()를 사용해서 html tag의 속성을 넣어줄 수 있다.

```JS
const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;

function App() {
  return (
    <Father>
      <Input />
      <Input />
      <Input />
    </Father>
  );
}
```

- keyframes라는 helper를 추가해서 애니메이션을 사용할 수 있다.

```JS
import styled, { keyframes } from "styled-components";

const rotationAnime = keyframes`
	0% {
		border-radius: 10px;
	}
	50% {
		border-radius: 100px;
	}
	100% {
		transform: rotate(360deg);
		border-radius: 10px;
	}
`;

const Box = styled.div`
	height: 200px;
	width: 200px;
	background-color: tomato;
	display: flex;
	justify-content: center;
	align-items: center;
	animation: ${rotationAnime} 2s linear infinite forwards;
	font-size: 70px;
`;

function App() {
	return (
		<Wrapper>
			<Box>
				<span>🤓👆</span>
			</Box>
		</Wrapper>
	);
}
```

- styled-component안에서는 하위 element span을 선택해서 css를 넣어줄 수 있다.

```JS
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnime} 2s linear infinite forwards;
  span {
    font-size: 70px;
  }
`;
```

- state selector를 &:▣▣▣와 같이 사용할 수 있다.

```JS
const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnime} 2s linear infinite forwards;
  span {
    font-size: 70px;
    &:hover {
      // span:hover와 동일하다.
    }
  }
`;
```

- ${▣▣▣} {}와 같이 코드를 작성한다면 태그가 바뀌더라도 상관없이 적용이 된다. (조건 처럼도 사용 가능)

```JS
${Emoji} {
    &:hover {
      // span:hover와 동일하다.
      font-size: 70px;
    }
  }
```

- Theme이라는 것을 사용해서 쉽게 다크모드 화이트모드를 구현할 수 있다. (local Estate Management라는 것을 배우면 완벽하게 구현 가능하다고 )

```JS
import { ThemeProvider } from "styled-components";

const darkTheme = {
	textColor: "whitesmoke",
	backgroundColor: "#111",
};

const lightTheme = {
	textColor: "111",
	backgroundColor: "whitesmoke",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={darkTheme}>
		<App />
	</ThemeProvider>,
);
```
