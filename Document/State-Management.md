아마도 이번에 하는 것도 Crypto-Tracker의 연장선이 될 수 있다.

# State Management

## Recoil

- FackBook사람들이 개발한 state관리 libarary
- 아주 미니멀하고, 간단하다고 한다.

## state management에 대해서 알아보자

먼저! state management가 무엇인지 이해하기 위해 state management가 무엇인지 알아보고,
Recoil을 해보기전에 state management를 사용하지않고, 저번에 만들었던 코인 웹에 기능을 구현해볼 것이다.

**이것을 왜 알아야 하나?**

- 사람들이 React에서 state-management를 공부하고 사용해야 된다고 함 (Recoil, Redux) - But? state-management가 왜 필요한지 모름
  > 기술은 문제를 해결하기 위해서 만들어진다.
  > 그 기술이 왜 만들어졌는지 모르고 쓰는 건
  > 그 기술의 본질을 모르는 것이다.

우리는 처음으로 recoil을 사용하지 않고 다크|라이트 모드 체인지 기능을 구현할 것이다.

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

### 요약

Recoil에 대해서는 아직 배워야 할 것이 많지만, 짧게 설명해보자면

> Recoil은 Atom이라는 파편에게서 component들이 값을 관찰하고, 수정할 수 있다는 것이 핵심 개념이라고 볼 수 있다.

또한 component가 Atom을 관찰(구독)하였을 때 Atom의 값이 수정된다면, 리렌더링이 된다.

그래서 이런 Recoil같은 상태관리 라이브러리를 사용하게 된다면!
쓸모없는 행위가 줄고 코드 가독성도 좋아진다. (심지어 Recoil은 이해하기도 쉽다)
