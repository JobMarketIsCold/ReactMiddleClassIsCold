아마도 이번에 하는 것도 Crypto-Tracker의 연장선이 될 수 있다.

# State Management

## Recoil

- FackBook사람들이 개발한 state관리 libarary
- 아주 미니멀하고, 간단하다고 한다.

---

## state management에 대해서 알아보자

먼저! state management가 무엇인지 이해하기 위해 state management가 무엇인지 알아보고,
Recoil을 해보기전에 state management를 사용하지않고, 저번에 만들었던 코인 웹에 기능을 구현해볼 것이다.

**이것을 왜 알아야 하나?**

- 사람들이 React에서 state-management를 공부하고 사용해야 된다고 함 (Recoil, Redux) - But? state-management가 왜 필요한지 모름
  > 기술은 문제를 해결하기 위해서 만들어진다.
  > 그 기술이 왜 만들어졌는지 모르고 쓰는 건
  > 그 기술의 본질을 모르는 것이다.

우리는 처음으로 recoil을 사용하지 않고 다크|라이트 모드 체인지 기능을 구현할 것이다.

---

### TypeScript Interface 함수

props로 함수를 넘어줄 떄는

```JS
interface IRouterProps {
  toggleDark: () => void;
}
```

이런식으로 타입을 지정해줄 수 있다.

---

- isDark를 Chart까지 넘겨주기위해서 우리는 App -> Router -> Coin -> Chart라는 엄청나게 긴 여정으로 값을 넘겨줄 수 있었다.
  - 여기서 다른 값이 더 생길 수도 있고 비효율적이라고 할 수 있다.
  - 심지어 App과 Chart를 제외하고는 isDark를 사용하지도 않는다..
- 이것을 global state라고 한다.
  - 어플리케이션 어떤 state를 인지하고 접근해야 할 때 사용한다.
  - component가 어디 있는지는 중요하지 않음
- global state의 예시로는 유저 로그인 상황을 예로 들수 있다.
  - 만약에 React-State만을 사용하게 된다면?
  - screen과 component가 많아질 수록 더 많은 props가 생기게 되고 너무 귀찮아 질 것이다.
  - 그렇기에 State-Management가 필요한 것이다.

### State-Management를 사용하면 어찌되나?

지금까지 우리는 완전 계층구조 형식으로 데이터를 전달해주었다.
`IsDark`: App -> Router -> Coin -> Chart 😭
하지만, State-Management를 사용하게 된다면 어디서든 접근할 수 있게 된다.
App -> (`isDark`) <- Chart

- isDark를 어딘가에 넣어서 접근한다는 느낌이다.

이게 Recoil의 **Point**!라고 할 수 있다!

---

## Recoil 시작

`Recoil`은 위에 계층구조 형식을 해결하기 위해서 만들어졌다고 볼 수 있다.
위에서 isDark를 어딘가에 넣는다고 하였는데 그것을 `Recoil`에서는 **Atom**이라고 부른다.
그 **Atom**에 어떤 value를 저장해서 사용할 수 있는 것이다.

> Atom은 특정 Component에 종속되어 있지 않는다.

그리고 **Component**가 **Atom**의 정보를 원한다면?
**Component**를 직접 **Atom**에 연결하면 되는 것이다!

이러면 좋은점이 value가 필요한 **Component**만 value를 가진다는 것이다!

굳이 위에서처럼 App -> Router -> Coin -> Chart에서 Router와 Coin에게 쓸모없는 값을 줄 필요가 없다는 것이다.

## Recoil 사용 해볼까?

그럼 이제 Recoil을 사용해보자!

먼저 Recoil을 다운받아준다.
`npm install recoil`

그리고 react-query를 사용할 때 queryclient로 `index.tsx`를 감싸준 것과 같이 recoil은 recoilroot로 감싸준다.

```JS
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>,
);
```

이러면 Recoil을 사용할 준비는 끝난 것이다!

그리고 `Atoms.ts`라는 파일을 만들어주자.

```JS
export const isDarkAtom = atom()
```

우리는 이제 이런식으로 atom을 만들 것이다.

atom에는 두 가지 요소가 필요한데,
key와 default이다.

```JS
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
```

이렇게 하면 atom을 사용할 수 있다.

그럼 이 atom을 어떻게 component와 연결할 수 있을까?

```JS
const isDark = useRecoilValue(isDarkAtom);
```

위와 같이 작성하면 App에 isDarkAtom을 연결한 것이다.

사용해보니 거쳐가는게 없어서 굉장히 편한 것 같다.

### Recoil 값 변경

Recoil에서 값을 변경하기 위해서는 위에서 useRecoilValue처럼 hook을 사용해야하는데

```JS
const setterFn = useSetRecoilState(isDarkAtom);
```

이런식으로 `useSetRecoilState`라는 함수를 사용해서 set함수를 받아올 수 있다.

`useSetRecoilState`로 받은 함수는 React의 setState와 같은 방식으로 동작한다.

---

### 요약

Recoil에 대해서는 아직 배워야 할 것이 많지만, 짧게 설명해보자면

> Recoil은 Atom이라는 파편에게서 component들이 값을 관찰하고, 수정할 수 있다는 것이 핵심 개념이라고 볼 수 있다.

또한 component가 Atom을 관찰(구독)하였을 때 Atom의 값이 수정된다면, 리렌더링이 된다.

그래서 이런 Recoil같은 상태관리 라이브러리를 사용하게 된다면!
쓸모없는 행위가 줄고 코드 가독성도 좋아진다. (심지어 Recoil은 이해하기도 쉽다)

# ToDo-List 만들기

자~! 이제 위애서 Recoil을 공부하였기때문에! 이번에는 ToDoList를 만들면서 Recoil의 새로운기능을 배우고 익숙해져 볼 것이다.

먼저 복습차원으로 React에서 From을 어떤식으로 만들었는지 상기 시킬 것이다.

```JS
const [toDo, setToDo] = useState("");
const onChange = (event: React.FormEvent<HTMLInputElement>) => {
const {
  currentTarget: { value },
} = event;
  setToDo(value);
};
const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(toDo);
};
return (
  <div>
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={toDo} placeholder="Write a to do" />
      <button>Add</button>
     </form>
   </div>
 );
```

우리는 원래 React에서 Form을 구성할 때 이런식으로 구성을 했었다.
다른 기술을 사용하기전에 원래 코드에서 어떤식으로 개선 했는지 상기하기 위해 하였다.

하지만 이 코드를 단 하나의 코드를 만들 수 있다.
바로 React-Hook-Form이라는 것을 사용해서 이 많은 것들을 한 줄로 가능한지 알아보자.

## React-Hook-Form

이 라이브러리는 니꼬 피셜 Form을 관리할 때 가장 편하고 좋은 라이브러리라고 한다.
그리고 큰 Form이나 검증이 필요할 때 특히 더 좋다고 한다.

그럼 한 번 살펴보러가자

실제 우리가 앱을 빌드한다고 생각을 해보면 지금 처럼 input이 한 개가 아니라 여러 개 일 것이다. (아이디, 성, 이름, 비밀번호, 비밀번호 확인 등..)

이런식으로 input이 많아진다면 우리는 위처럼 form에 많은 **state들을 등록**하게 될 것이다.
그리고 또 거기서 끝나는 것이 아니 **검증과정** 즉 데이터 타입 체크, 조건 확인 등..을 해야한다는 것이다.

그렇게 되면 또..ErrorState를 만들고..submit함수에 조건 추가하고..이런 작업들은 복잡하지는 않지만 정말로 번거로운 작업이 될 것이다.

그럼 이제 한 번 React-Hook-Form을 사용해보자!

---

### register

먼저 **register**라는 것을 사용해볼 것이다.

`const { register } = useForm();`
register를 사용하게 되면 onChange이벤트 핸들러, input props, setState가 전부 필요없어진다.
이런것들을 적을 필요없이 register함수만 사용하면 된다.

register함수가 반환해주는 값 안에는 다양한 것들이 있다.
`{name: 'toDO', onChange: ƒ, onBlur: ƒ, ref: ƒ}` log를 찍어보면 이러한 것들이 있다는 것을 알 수 있다.

이렇게 반환 해주는 것들을 input에다가 바로 반환해서 props로 사용할 수도 있다.
`<input {...register("toDo")} placeholder="쓰세요" />`이런식으로 말이다.

> 주의: register 사용시 ""사이에 띄어쓰기하면 안됨

실행해보면 실행은 잘된다. 하지만 좀 불안하기에 useForm에서 제공해주는 watch를 이용해보자

### watch

**watch**는 우리가 form의 입력값 변화를 관찰할 수 있게 해주는 함수이다.

만약에 우리가 여러 개의 인풋을 관리하게 된다면?

```JS
  const { register, watch } = useForm();
  console.log(watch());

  return (
    <div>
      <form>
        <input {...register("userName")} placeholder="userName" />
        <input {...register("email")} placeholder="email" />
        <input {...register("password")} placeholder="password" />
        <input {...register("checkPassword")} placeholder="checkPassword" />
        <button>추가</button>
      </form>
    </div>
  );
```

WoW 진짜 편하게 관리할 수 있다.

그리고 watch로 변화하는 모든 것들을 볼 수 있다.
`{userName: '200원', email: 'gyejeongjin@gmail.com', password: '1234', checkPassword: '1234'}`

---

### handleSubmit

자 이제 위에 onSubmit을 대체 해볼 것이다.
대체하기 위해서는 **handleSubmit**이라는 함수를 사용하면 된다.

handleSubmit이 여기서 검증과 eventPrevent도 담당해 줄 것이다.

handleSubmit의 사용방법은 다음과 같다.
onSubmit에 넣어서 사용을 해주면 되는데 2가지의 인자를 넣어줘야 한다.

1. 데이터가 유효할 때 호출되는 함수
   - 필수
2. 데이터가 유효하지 않을 때 호출되는 함수
   - 필수 아님

그리고 onValid, 즉 첫 번째 함수는 data를 받는데 일단 타입은 any로 지정하고 log를 찍으면
`{userName: '200원', email: 'gyejeongjin@gmail.com', password: '1234', checkPassword: '1234'}` 이런식으로 watch를 했을때 보았던 data를 볼 수 있다.

```JS
const { register, watch, handleSubmit } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("userName")} placeholder="userName" />
        <input {...register("email")} placeholder="email" />
        <input {...register("password")} placeholder="password" />
        <input {...register("checkPassword")} placeholder="checkPassword" />
        <button>추가</button>
      </form>
    </div>
  );
```

이런식으로 handleSubmit은 submit을 하였을 때, 해야 할 일을 모두 끝내고 데이터가 유효하다면 함수를 호출해준다.

그럼 이제는 form을 유효하지 않게 만들어보자

그러기위해서는 검증 조건이 있어야 하는데 간단하게 required를 해보자.

```JS
<input
  {...register("userName", { required: true })}
  placeholder="userName"
/>
<input {...register("email", { required: true })} placeholder="email" />
<input
  {...register("password", { required: true })}
  placeholder="password"
/>
<input
  {...register("checkPassword", { required: true })}
  placeholder="checkPassword"
/>
```

왜 이런식으로 register안에 required를 넣는가 궁금할 수도 있는데, 만약 html에 넣어버린다면 누군가가 소스코드를 건드리거나, required를 지원하지 않는 곳에서 사용할 가능성이 있기 때문이다. (HTML에 의지하지 말고 JS에 의지하자!)

이렇게 코드를 짠다면 짜잔! 값이 비어있다면 그 빈 input으로 이동을 시켜준다. (보호수단생김)

검증하고 싶은걸 추가하고 싶다면 그냥 required처럼 넣어주기만 하면 바로 적용이된다!!
저 위에 코드처럼 if(어쩌구)이럴 필요가 없어진 것이다!

그냥 react-hook-form이 다 해준다.

fromState라는 속성을 추가해주고 errors를 출력해본다면?
`console.log(formState.errors);`
에러처리가 자동으로 되고 있는 것을 볼 수 있다.

```
1. checkPassword: {type: 'required', message: '', ref: input}
2. email: {type: 'required', message: '', ref: input}
3. password: {type: 'required', message: '', ref: input}
4. userName: {type: 'required', message: '', ref: input}
```

이런 에러처리를 그냥 자동을 해주고, 어떤 에러인지도 알려준다...미춋다..

그리고 보면 message라는 것도 있는걸 알 수 있는데 message도 보낼 수 있다..

```JS
<input
  {...register("userName", {
	required: { value: true, message: "userName이 필요합니다!" },
  })}
  placeholder="userName"
/>
```

요런식으로 객체로 message를 보낼 수 있다.
`userName: {type: 'required', message: 'userName이 필요합니다!', ref: input}`

그럼 이 react-hook-form을 사용해서 해결된 것을 본다면
데이터의 검증이 자동으로 해결이 되고, 에러가 어디서 발생하는지도 알려주고, message도 보낼 수 있고, \[state, onChange, onSubmit\]함수들 안만들어도 되고, input props 일일이 안줘도 된다.

그냥 미쳤다...

그리고 추가로 또 다른 검증방법이 있는데 바로 정규식이다.
정규식으로 naver.com메일만 넘기게 할 수도 있고 전화번호도 특정 지역만 받을 수도 있다.

`/^[A-Za-z0-9._%+-]+@naver.com$/`만약 이러한 정규식으로 사용한다면 naver.com메일만 받는다는 것이다.

```JS
{...register("email", {
	required: true,
	pattern: { value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "naver메일만 허용됩니다." },
})}
```

이런식으로 정규식을 사용할 수 있다.

그럼 이제 이 에러객체의 메세지를 유저에게 보여주자!

`<Span>{errors?.email?.message}</Span>` 메세지를 보여주기 위해서 styledComponent를 만들어주고 안에 message를 넣어주면 된다. (?.은 email이 undefind일수도 있기에 넣어줬다.)

TypeScript를 사용한다면, useForm<> 제네릭에다가 interface를 넣어줘야 한다.

```TS
interface FormType {
  userName: string;
  email: string;
  password: string;
  checkPassword: string;
}

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>();
```

여기서 더 사용할 수 있는 기능이 존재하는데 defaultValue를 줄수도 있다.

```JS
useForm<FormType>({
    defaultValues: {
      email: "@naver.com",
    },
  });
```

이런식으로 default값을 넣어줄 수도 있다.

---

### Custom Error

백앤드와 연결한다면, 서버에서 문제가 생겼을 때 에러를 발생시켜야 할 경우도 있다.
그리고 지금 하고 있는 검사 방법 이외에도 validation 방법이 있는지 배워볼 것이다.
(지금도 좋은 validation을 하고 있지만 우리가 특수한 경우의 검증을 하기 위해서는 직접 만들어서 validation(검증)을 해야 할 때도 있을 것이다.)

그럼 먼저 password와 checkPassword가 같지 않을 때를 검증해보자.

먼저 data를 interface로 타입을 지정해주고 setError를 가져오자.
여기서 setError는 Error를 발생시켜준다.

```JS
const onValid = (data: FormType) => {
    if (data.password !== data.checkPassword) {
      setError("checkPassword", { message: "password가 다릅니다." });
    }
  };
```

이런식으로 에러를 발생시킬 수 있다.

그리고 만약에 서버가 해킹당해서 서버가 다운되었을 때 에러를 보여주고 싶다면,
TypeScript에 extraError라는 변수의 타입을 지정해주고, setError를 해주면 된다.
extraError라는 변수는 form전체적인 에러를 나타낼 때 사용할 것이다. (이름은 상관없다.)

setError는 추가적으로 에러를 설정할 수 있게 해줘서 유용하다.

setError의 또 다른 유용한 기능은 우리가 선택한 input항목에 강제로 focus시킬 수 있다.

```JS
setError("checkPassword", { message: "password가 다릅니다." }, { shouldFocus: true });
```

위처럼 shouldFocus를 사용해서 input항목에 커서를 focus시킬 수 있다.

### validate

우리가 원하는 어떤 조건도 검증할 수 있다!

만약에 내가 사이트를 만들었는데 200won이라는 이름을 가진 사용자는 계정을 못만들게 막고 싶다?라고 한다면 validate를 사용할 수 있다.

validate는 값을 함수로 가지고, 인자로는 항목에 현재 쓰여지는 값을 받는다.
그리고 true or false를 반환한다.

```JS
validate: (value) => value.includes("200won") ? "아닛 200원을 포함하고 있다닛!!!" : true,
```

이런식으로 register안에 validate를 넣어서 조건에 맞게 에러를 낼수도 있다!

그리고 validate는 하나의 함수뿐만 아니라 여러 함수가 있는 객체가 될 수도 있다.
여러 함수가 있는 객체는 input에 여러개의 검사를 할 때 필요할 수도 있다.

```JS
<input
  {...register("userName", {
	required: { value: true, message: "userName이 필요합니다!" },
	validate: {
	  no200won: (value) =>
		value.includes("200won") ? "아닛 200원을 포함하고 있다닛!!!" : true,
	  noYejun: (value) =>
		value.includes("Yejun") ? "아닛 Yejun을 포함하고 있다닛!!!" : true,
	  noSeunghun: (value) =>
		value.includes("Seunghun") ? "아닛 Seunghun을 포함하고 있다닛!!!" : true,
	},
  })}
  placeholder="userName"
/>
```

그리고 이렇게 사용할 수 있다!

또한 validate의 함수를 async로 만들어서 서버에다가 확인하고 응답을 받을 수도 있다.

---

### 요약

일단 한줄평을 먼저 해보자면

> Form의 규모가 크면 클수록 유용해지는 라이브러리

- register를 이용해서 state, eventFunc 대체가능
- validation option을 이용해 편리한 검증가능
- 에러 객체 제공으로 인해 작업하기 수월함
- 이 모든걸 handleSubmit이 호출되면 수행됨
  - handleSubmit함수는 인자를 총 1~2개를 받음
  - onValid함수 onInValid함수
  - 검증 성공 | 검증 실패
  - onValid는 필수로 넣어줘야 함
  - onValid함수는 data를 받을 수 있음
- validation은 only value or 객체 리터럴로 작성함
- validation에서 error가 나게 되면 formState: {errors}에서 에러를 확인할 수 있음
- useForm의 인자에 defaultValues를 넣어줄 수 있음
- setError는 에러를 발생시킬 때 사용함
- setError에서 shouldFocus라는 기능을 사용할 수 있음
  - 사용자가 form을 submit할 때 에러를 발생시키면 그 항목으로 focus됨

그럼 처음으로 돌아가서 toDoList의 토대를 react-hook-form을 사용해서 만들어 본다면,

```JS
interface IForm {
  toDo: string;
}

function ToDoList() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: { value: true, message: "toDo를 입력해주세요" } })}
          placeholder="to do를 작성하세요"
        />
        <button>추가</button>
      </form>
    </div>
  );
}

export default ToDoList;
```

이런식으로 만들 수 있다.

그리고 여기서는 setValue라는 속성도 사용을 해보았는데 setValue는 첫 번째 인자에 form state 이름을 적고, 두 번째 인자에는 값을 넣어주면 된다.

이제 react-hook-form은 끝났고!

다시 Recoil로 돌아간다!

---

## useRecoilState

일단 이번에는 Recoil을 중점으로 볼 것 같다.

일단 todoList에다가 모든 것을 만들어놓고 분리시킬 것이다.

이번에는 recoil에서 안써봤던 중요한 기능을 보여줄 것이다.
일단 atom을 만들어주자

```JS
const toDoState = atom({
  key: "toDo",
  default: [],
});
```

이런식으로 atom을 만들어주고,
전에 배웠던 것 처럼 atom을 가져오기 위해서 recoilValues를 사용해보자

```JS
const value = useRecoilValue(toDoState);
```

그리고 atom의 value를 변경하기 위해서는 useSetRecoilState로 modifier함수를 가져와서 변경할 수 있었다.

```JS
const modFn = useSetRecoilState(toDoState);
```

이 두가지는 recoil을 사용하게 되면 엄청 자주 사용할 것이다.

그러면 이런 방법말고 다른 방법을 사용해보자.
바로 useRecoilState를 사용하자!

```JS
const [value, modFn] = useRecoilState(toDoState);
```

뭔가 익숙하지 않은가? useState와 거의 유사하게 사용할 수 있다.

둘 중 하나만 하고 싶으면 useRecoilValue or useSetRecoilState를 둘 다 하고 싶으면 useRecoilState를 사용하면 된다.

```JS
const [toDos, setToDos] = useRecoilState(toDoState);
```

이런식으로 toDos를 만들어주고 toDos의 타입을 지정해줄 것이다.

거기에 text와 category를 만들어줄 것인데,
category에는 할 일, 하는 일, 한 일이 들어가야 하기 때문에 TO_DO, DOING, DONE이라는 string만 들어가야 한다.

그렇때는 아래처럼 쓰면 된다.

```JS
interface IToDo {
  text: string;
  category: "TO_DO" | "DOING" | "DONE";
}
```

그리고 atom에게 interface를 제네릭으로 적용시켜주자.

```JS
const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
```

그래서 이번에는 useRecoilState라는 것을 사용해보았는데 그냥 평소에 사용하던 useState랑 비슷하여서 쓰기 좋았던 것 같다.

---

## Refectoring

자 이번에는 리팩토링을 해보았다.

```JS
/* ToDoList.tsx */

import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { toDoState } from "../atoms";

function ToDoList() {
	const toDos = useRecoilValue(toDoState);
	return (
		<div>
			<h1>투두 리스트!</h1>
			<hr></hr>
			<CreateToDo />
			<ul>
				{toDos.map((toDo) => (
					<ToDo {...toDo} />
				))}
			</ul>
		</div>
	);
}

export default ToDoList;

```

```JS
/* CreateToDo.tsx */

import React from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
	toDo: string;
}

function CreateToDo() {
	const setToDos = useSetRecoilState(toDoState);
	const { register, handleSubmit, setValue } = useForm<IForm>();
	const onValid = ({ toDo }: IForm) => {
		console.log("add to do", toDo);
		setToDos((oldToDos) => [{ text: toDo, id: Date.now(), category: "TO_DO" }, ...oldToDos]);
		setValue("toDo", "");
	};
	return (
		<form onSubmit={handleSubmit(onValid)}>
			<input
				{...register("toDo", { required: { value: true, message: "toDo를 입력해주세요" } })}
				placeholder="to do를 작성하세요"
			/>
			<button>추가</button>
		</form>
	);
}

export default CreateToDo;


```

```JS
/* ToDo.tsx */

import { IToDo, toDoState } from "../atoms";

function ToDo({ text }: IToDo) {
	return <li>{text}</li>;
}
export default ToDo;
```

와 진짜 recoil을 사용하니까 리팩토링 할 때 component끼리의 의존성이 사라지고 모두 atom을 보면서 편안한 코딩을 할 수 있었다. recoil 만든 사람에게는 노벨상을 줘야 할 것 같다.

==**팁**==
그리고 만약에 onClick같은 이벤트에서 인자를 넘기고 싶다??
익명함수를 사용해서 인자를 넘겨주면 된다.

```JS
{category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>To Do</button>}
{category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>}
{category !== "DONE" && <button onClick={() => onClick("DONE")}>Done</button>}
```

이런식으로 사용할 수 있다!

newCategory가 3가지의 string으로만 이루어져야 하기 때문에 IToDo 인터페이스의 category를 가져와서 type지정을 해줄 수 있다.

```JS
const onClick = (newCategory: IToDo["category"]) => {};
```

이렇게 interface안에 것만 가져올 수 있다.

---

```js
function ToDo({ text, category }: IToDo) {
	const onClick = (newCategory: IToDo["category"]) => {
		console.log(newCategory);
	};
	return (
		<li>
			<TextSpan>{text}</TextSpan>
			{category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>To Do</button>}
			{category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>}
			{category !== "DONE" && <button onClick={() => onClick("DONE")}>Done</button>}
		</li>
	);
}
```

이런식으로 구성을 해도 되지만

```js
function ToDo({ text, category }: IToDo) {
	const setToDos = useSetRecoilState(toDoState);
	const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const {
			currentTarget: { name },
		} = event;
		console.log(name);
	};
	return (
		<li>
			<TextSpan>{text}</TextSpan>
			{category !== "TO_DO" && (
				<button name="TO_DO" onClick={onClick}>
					To Do
				</button>
			)}
			{category !== "DOING" && (
				<button name="DOING" onClick={onClick}>
					Doing
				</button>
			)}
			{category !== "DONE" && (
				<button name="DONE" onClick={onClick}>
					Done
				</button>
			)}
		</li>
	);
}
```

이런식으로 html name을 사용할수도 있다.

---

만약 우리가 찾고 싶은 값이 있는데 어디 인덱스에 존재하는지 모르겠다? 라고 한다면 아래의 함수를 사용할 수 있다.

```js
const findIndex = oldToDos.findIndex((toDo) => toDo.id === id);
```

바로 findIndex라는 함수이다.

findIndex라는 함수의 인자로 조건을 주는 함수를 넣어주면 그 조건의 맞는 인덱스를 return해준다.
요소가 없으면 -1을 반환한다.

---

array에서 immutate하게 원소를 바꾸고 싶다면,

```JS
const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
	const {
		currentTarget: { name },
	} = event;
	setToDos((oldToDos) => {
		const findIndex = oldToDos.findIndex((toDo) => toDo.id === id);
		const oldToDo = oldToDos[findIndex];
		const newToDo = { text, id, category: name as IToDo["category"] };
		return [...oldToDos.slice(0, findIndex), newToDo, ...oldToDos.slice(findIndex + 1)];
	});
};
```

이런식으로 코드를 짜준다면 mutate하지 않게 상태를 변환할 수 있다.

---

## Selector in recoil

이번에는 recoil의 selector라는 개념을 공부해볼 것이다.

정의를 보면

- Selector는 파생된 state(derived state)의 일부를 나타낸다.
- 즉, 기존 state를 가져와서, 기존 state를 이용해 새로운 state를 만들어서 반환할 수 있다.
- 기존 state를 이용만할 뿐 변형시키지 않는다.
- derived state는 다른 데이터에 의존하는 동적인 데이터를 만들 수 있기 때문에 강력한 개념이다.
  이렇다고 한다.

지금 현재 코드는 아래처럼 카테고리 분류없이 todo라는 state하나에 모든 값을 넣고 있다.

```JS
export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
```

여기서 우리는 selector를 이용해서 카텤고리별 todo들을 분리할 것이다.

selector를 이용하게 되면 어떤 state를 가져다가 다른 state를 만들 수 있다.
state를 우리 마음대로 변형할 수 있는 것이다.

여기서 우리는 atom을 세 개 만드는 선택지도 있지만, 너무 번거롭고 todo하나에 담아놓고 싶다.
그걸 하기 위해서 우리는 **selector function**을 사용할 것이다.

- selector는 atom의 아웃풋을 변형시키는 도구이다.
- selector는 state를 가져다가 무언가를 return한다.

```JS
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    // return 하는 값이 toDoSelector의 value가 된다.
    return "Hello";
  },
});
```

이런식으로 selector를 만들 수 있고, 값을 가져와서 출력을 하면 Hello가 잘 나온다.

여기서 중요하게 봐야할 점은 selector는 atom을 가져와서 output를 변형할 수 있다는 것이다.

- 여기서 get func이 state를 가져올 수 있게 해주는 함수이다.

```JS
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return toDos.length;
  },
});
```

이런식으로 toDoState를 가져올 수 있다.

이렇게 atom를 가져오게 된다면, 이제 이 selector는 그 atom를 바라보고 있다는 것이다.
atom이 변하게 되면 selector도 변하게 되는 것이다! ( 의존성을 가지게 된다 )

```JS
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    return [
      toDos.filter((toDo) => toDo.category === "TO_DO"),
      toDos.filter((toDo) => toDo.category === "DOING"),
      toDos.filter((toDo) => toDo.category === "DONE"),
    ];
  },
});
```

이런식으로 selector를 사용해서 atom의 아웃풋을 변형시켜서 값을 받을 수 있기 때문에 좋은 기능인 것 같다.

"아웃풋"을 **변형**한다는 것이 엄청난 장점인 것 같다.
(Selector를 사용하면 component에서는 render만 할 수 있게 할 수도 있다.)

또한 selector는 두 가지의 atom을 동시에 바라볼 수도 있다. ( 둘 중 하나가 바뀌면 다시 렌더 )

여기서 **팁**
단축문법을 사용함으로써 `category: category`이 코드를 `category`이렇게 만들 수 있다.

---

끝
