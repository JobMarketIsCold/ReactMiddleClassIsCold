# 알게 된 점

- `TypeScript`는 `JavaScript` 기반으로한 프로그래밍 언어이다.
  (JavaScript에서 새로운 기능을 추가한 느낌!) (쓰는거는 똑같다고 함)
- `TypeScript`는 **Strongly typed programming language**이다.
  프로그래밍 언어가 동작하기 전에 type을 확인
- js는 어느 데이터 타입인지 신경쓰지 않는다.
- `TypeScript`는 프로그램을 돌리기 전에 무엇이 잘못되었는지 얘기해준다.
- 물론 컴퓨터는 js밖에 이해할 수 없어서 publish 전에 js가 ts로 compile해준다.
  > 즉 개발자들을 위한 좋은 도구라고 볼 수 있다!

### 타입 스크립트 설정

1. `기존 프로젝트에서 설정`
   - npm install --save typescript @types/node @types/react @types/react-dom @types/jest
   - src폴더에 있는 js파일을 tsx파일로 변경
   - "npx tsc --init" 명령어로 tsconfig.json 파일 생성한 후, tsconfig.json 파일에 "jsx": "react-jsx"추가
     {
     "compilerOptions": {
     ......
     "jsx": "react-jsx"
     }
     }
   - src/index.tsx에서 수정
     import ReactDOM from "react-dom/client"
     const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
   - npm i --save-dev @types/styled-components
2. `새로운 프로젝트에서 설정`
   - npx create-react-app 내 앱 이름 --template typescript
   - npm i --save-dev @types/styled-components
   - npm i styled-components

- @types라는 것은 js랑만 연동되는 라이브러리를 사람들이 typescript에서 쓰기위해 typescript에게 알려줄 type을 만들어서 우리가 쓸 수 있는 것이다.

### Props에게 Type주는 법

- props types를 사용하면 코드를 실행한 "후"에 오류를 콘솔창으로 알려준다.
  하지만 typescript를 사용하게 되면 실행하기 "전"에 오류를 알려준다.
- typescript에서 object shape(객체 모양)을 알려주기 위해서 interface를 쓴다.

```JS
import styled from "styled-components";

const Container = styled.div``;

interface CircleProps {
	bgColor: string;
}

// CircleProps에 bgColor가 있다는 것을 typescript는 알고 있음
function Circle({ bgColor }: CircleProps) {
	return <Container />;
}

export default Circle;
```

- `<Container bgColor={bgColor} />`이런식의 코드일 때 typescript는 container가 div이기 때문에 오류가 터질 것이다. 그래서 typescript에게 bgColor를 styled-component에 보내고 싶다고 할 것이다. 그럴때 아래처럼 적용시켜주면 될 것이다.

```JS
interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>``;
```

- interface는 리액트에서 사용했어 propstype와 유사한 것 같다.

### Optional Props

- 우리가 그냥 interface를 사용하게 되면 무조건 적은 props는 적어서 넘겨줘야 했는데 아래처럼 한다면 선택적으로 Props를 넘겨받을 수 있게 한다.

```JS
interface CircleProps {
  bgColor: string;
  borderColor?: string;
}
```

##### ?? (Null 병합 연산자 (Nullish coalescing operator))

- ??앞에 값이 null이거나 undefined이면 오른쪽 값을, 그렇지 않으면 왼쪽 값을 반환하는 논리연산자

```JS
null ?? "hello" // "hello"
undefined ?? "hello" // "hello"
"hi" ?? "hello" // "hi"
```

- 아래 처럼 하나는 optional 하나는 default일 때 사용할 수 있다.

```JS
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

<Container bgColor={bgColor} borderColor={borderColor ?? "white"} />;
```

- 이것 typescript는 아니지만 팁으로 props의 default값을 아래 처럼 넣어줄 수 있다.

```JS
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "Default Text" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "red"}>
      {text}
    </Container>
  );
}
```

### State

- `const [counter, setCounter] = useState(1);`
  - 이런식으로 작성하게 된다면 default값인 1에 맞춰서 number값으로 타입을 지정해준다.
  - 거의 대부분의 경우에는 디폴드값의 타입으로 끝가지 가게 되기에 좋은 추측이다.
- 하지만 만약에 거의 없겠지만, number타입도 쓸 수 있고 string타입도 쓸 수 있게 하고 싶다라고 한다면,
  - `const [value, setValue] = useState<number | string>(1);`이런식으로 사용할 수 있다.
  - 하지만 자주 사용할 일은 없을 것이다.
  - Generic처럼 사용하는 듯?

### Event

- `const onChange = (event) => {};`
  - 이런식으로 이벤트를 인자로 넣어주면 타입이 any여서 typescript는 에러를 내보낼 것이다.
  - event에게 type을 주는 방법은 `const onChange = (event: React.FormEvent) => {};`이런식으로 React내에 FormEvent를 사용해주면 된다.
  - 솔직히 이런거는 바로 찾아서 쓰기에는 어렵기에 상황에 맞는 것을 사용하기 위해서는 구글링을 해야할 것 같다.
- 그리고 `const onChange = (event: React.FormEvent<HTMLInputElement>) => {};`이런식으로 사용해서 어떤 element가 event를 발생시킬지 특정할 수 있다.
- typescript에서는 event.target이 아니라 event.currentTarget을 사용한다.
- 강의 듣다가 처음본 객체 구조 분해

```JS
const {
      currentTarget: { value },
} = event;

console.log(value); // value값이 바로 나옴!
```

- 리액트 내의 모든 이벤트들에 관해 궁금하다면 SyntheticEvent라는 가이드를 보면 된다.
  - ReactJS는 이전에 우리가 보았다시피 자바스크립트의 실제 이벤트를 넘겨주는게 아니라,
    SyntheticEvent를 준다.
  - 왜냐하면 React.js가 SyntheticEvent방식으로 event를 최적화하기 때문이다.
  - [https://reactjs.org/docs/events.html](https://reactjs.org/docs/events.html)

### Connect TypeScript and Styled-Components Theme

- @types/styled-components를 다운 받고
- src에 styled.d.ts를 만들어준다. (d.ts는 declaration\[선언] file이다) (Theme을 사용하기 위해 확장해줘야 한다.)
- styled.d.ts를 통해서 기존에 있던 파일의 theme의 type을 선언 해준다. (오버라이딩)

```JS
// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
  }
}
```

- 그리고 theme.ts를 만들어서 테마를 만들어준다.

```JS
import { DefaultTheme } from "styled-components/dist/types";

export const lightTheme: DefaultTheme = {
  bgColor: "white",
  textColor: "black",
  btnColor: "red",
};

export const darkTheme: DefaultTheme = {
  bgColor: "black",
  textColor: "white",
  btnColor: "blue",
};
```

- 이런식으로 하면 좋은점이 까먹어도 상관없이 그냥 선언부에 정의되어있는 그대로 사용을 하면 된다.
- 이제 아래같은 구문을 만들 때 typescript가 자동완성을 해주기 때문에 편하다!
  또한, 스펠링을 틀린다면 알려준다!

```JS
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
```

- Theme은 js든 ts든 동일한 방식으로 작동하지만, ts는 일종의 보호를 제공받는다.

# 한줄평

> TypeScript는 JavaScript의 DLC(확장판)같다!
