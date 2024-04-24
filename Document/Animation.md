# Ch 08 시작

이번 챕터에서는 Framer Motion이라는 것을 사용해서 아름다운 애니메이션을 만드는 법을 공부해볼 것이다.

이번 단원은 제가 직접해보고 실습하는 단계가 많아서 문서의 양이 그렇게 많지는 않을 것 같다.

## Motion 설치

`npm install framer-motion`
하지만 이렇게 깔고 사용하면 에러가 난다.

왜냐하면 `<div></div>`이런식으로 animation을 적용시키지 못하기 때문이다.
그러면 어떻게 해야할까?
바로 `<motion.div></motion.div>`이런식으로 작성해줘야 한다.

- cra version이 4면 에러가 날 수도 있다고 한다.

이렇게 하면 설치 끝!

## Basic Animation

일단 알아야 할 것이 존재한다.
animation을 적용시키고 싶다면 무조건 motion.HTMLelement 사용해야 한다.
( 모션 컴포넌트라고 부른다 )

styled-component에 적용시키는 법

```TSX
const Box = styled(motion.div)
```

이런 문법으로 작성해주면 styled-components를 사용하면서 animation 사용가능

**animate props**

```TSX
<Box animate={{ borderRadius: "100px" }} />
```

이런식으로 바로 애니메이션 적용가능

- chorme에서는 작동하지 않는 버그가 있어 텍스트같은 다른 요소를 넣어주면 괜찮아짐

**transition**
Transition은 값이 한 상태에서 다른 상태로 움직이는 방식을 정의한다.

```TSX
<Box transition={{ duration: 2 }} animate={{ borderRadius: "100px" }} />
```

이런식으로 props를 사용해서 다양하게 애니메이션을 줄 수 있다.

**initial**
속성, 변형 레이블 또는 시작할 변형 레이블의 배열이다.
animate의 값으로 초기화하려면 false로 설정한다(마운트 애니메이션 비활성화)

즉, 요소의 초기 상태를 적으면 된다.

그리고 props에는 css format으로 작성하면 된다.

```TSX
<Box initial={{ scale: 0 }} transition={{ delay: 1 }} animate={{ scale: 1, rotateZ: 360 }} />
```

이런식으로 작성해서 실행을 시켜보면 조금 튕기는게 존재한다.
왜냐하면 모든 애니메이션에는 spring이라는 옵션이 달려있기 때문이다. ( ease같은거라고 보면 된다 )
이 옵션은 transition에 type이라는 것으로 바꿀 수 있다.

그리고 spring이라는 옵션은 stiffness, damping 같은 것으로 시뮬레이션도 할 수 있다.

이런식으로 아주 간단하게 animation을 만들 수 있는 것을 볼 수 있다.

## Variants

> Variants은 컴포넌트가 가질 수 있는 미리 정의된 시각적 state입니다.

- 코드를 깔끔하게 해준다.
- 많은 애니메이션을 하나로 연결시켜준다.

이번시간에는 Variants를 배우고 사용해볼 것이다.

```TSX
const myVars = {
  start: { scale: 0 },
  end: { scale: 1, rotateZ: 360, transition: { type: "spring", delay: 1 } },
};
```

이런식으로 Variants를 js object로 가지고 있을 수 있다. ( Object의 이름과 Property이름도 마음대로 적어도 된다 )

```TSX
<Box variants={myVars} initial="start" animate="end" />
```

이런식으로 variants를 넣고 그 안에 state를 꺼내서 쓸 수 있다. ( 반드시 object안에 property와 같은 이름으로 작성해야 된다 )

즉, variants는 설정을 가져가서 object형태로 넣어서 꺼내 쓸 수 있는 것이라고 생각하면 된다.

---

이제 variants로 애니메이션을 만들어 볼 것이다.

```TSX
const boxVariants = {
  start: { opacity: 0, scale: 0 },
  end: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", duration: 0.5, bounce: 0.5, delay: 1 },
  },
};
```

상자의 variants는 이런식으로 만들어주고, 이제부터 알아볼 것은 컴포넌트가 자식들을 가지고 있을 variants가 얼마나 유용한지이다.

기본값으로 아무 설정도 없을 때,

```TSX
<Box variants={boxVariants} initial="start" animate="end">
	<Circle></Circle>
	<Circle></Circle>
	<Circle></Circle>
	<Circle></Circle>
</Box>
```

부모 컴포넌트가 가지고 있는 props를 motion이 복사를 해서 자식 컴포넌트에게 넣어준다.

```TSX
const circleVariants = {
  start: { scale: 0 },
  end: { scale: 2, transition: { type: "spring", bounce: 0.8 } },
};

<Box variants={boxVariants} initial="start" animate="end">
	<Circle variants={circleVariants}></Circle>
	<Circle variants={circleVariants}></Circle>
	<Circle variants={circleVariants}></Circle>
	<Circle variants={circleVariants}></Circle>
</Box>
```

또한 이런식으로 사용해준다면, start와 end를 자동으로 넣어주기에 다른 애니메이션을 실행할 수 있다.

또한 부모 컴포넌트에서 delayChildren을 하면 자식에게 animation delay를 줄 수도 있다.
그리고 자식에게 하나하나 delay를 연속해서 따로 주고 싶다면 staggerChildren을 사용하면 된다. 그럼 motion은 자동적으로 첫 번째 요소에게 0.5초 다음은 0.5\*1초 이런식으로 값을 자동으로 준다.

```TSX
const boxVariants = {
  start: { opacity: 0, scale: 0 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delay: 1,
      delayChildren: 1.5,
      staggerChildren: 0.1,
    },
  },
};
```

이런식으로 자식 애니메이션도 컨트롤 할 수 있는것이 대박이다.

또한

```TSX
const circleVariants = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 },
};
```

motion에서만 사용할 수 있는 property로 효과를 줄 수도 있다.

---

## Gesture

이번에는 마우스 상태에 따른 이벤트를 listening하는 방법을 배울 것이다.

### while

- whileHover
  - 호버 제스처가 인식되는 동안 애니메이션할 속성 또는 변형 레이블입니다.
- whileTap
  - 컴포넌트를 누르고 있는 동안 애니메이션할 속성 또는 변형 레이블입니다.
- drag
  - 이 요소에 대해 끌기를 활성화합니다. 기본적으로 false로 설정됩니다. 양방향으로 드래그하려면 true로 설정하십시오. 특정 방향으로만 드래그하려면 "x" 또는 "y"를 설정합니다.
- whileDrag
  - 드래그 제스처가 인식되는 동안 애니메이션할 속성 또는 변형 레이블입니다.

```TSX
<Box whileHover={{ scale: 2 }} whileTap={{ borderRadius: "100px" }} />
```

이런식의 코드를 짜면 아주 편한하게 event를 listen할 수 있다.

그리고 여기다가 variants를 올려주면!!

```TSX
const boxVariants = {
  hover: { scale: 1.5, rotateZ: "90deg" },
  click: { scale: 0.5, borderRadius: "100px" },
}

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} whileHover="hover" whileTap="click" />
    </Wrapper>
  );
}
```

이렇게 하면 진짜 좋은점이 조건문을 써서 이때는 이 애니메이션 저때는 저 애니메이션 조건을 만들 때, variants를 사용하면 문자열만 딱 적으면 되기에 간편하다고 볼 수 있다.

**drag**
이번에는 drag를 할껀데 너무 간편하다..

```TSX
<Box drag />
```

이게 끝이다..

그리고 drag하는 동안 요소를 변경시키고 싶다면, whileDrag를 사용하면 된다.
여기서 주의 할 점 backgroundColor를 바꾼다고 할 때 "red" 이런식으로 넣지말고 rgb or rgba를 사용해야지 애니메이션이 적용된다. 왜냐하면 red는 문자열이기에 계산을 할 수 없다고 한다.

`drag="x", drag="y"`처럼 props를 줘서 수평,수직 제약을 줄 수 있다.
공간에 제약을 주고 싶다면 dragConstraints를 사용하면 된다.

- 허용된 드래그 가능 영역에 제약 조건을 적용합니다.
- dragConstraints 에는 드래그 가능한 컴포넌트의 가장자리 거리를 정의합니다. (드래그 가능한 영역에 가장자리에서 얼마만큼까지 허용할 것인지 지정)

```TSX
<Box
        drag
        dragConstraints={{ top: -50, bottom: 50, left: -50, right: 50 }}
        whileDrag={{ backgroundColor: "#df4e4e" }}
  />
```

이런식으로 하면 저 공간안에서만 드래그가 가능하다.

이제 박스안에 박스를 넣는 것을 만들 것이다.

```TSX
function App() {
  const BiggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BiggerBox ref={BiggerBoxRef}>
        <Box drag dragConstraints={BiggerBoxRef} whileDrag={{ backgroundColor: "#df4e4e" }} />
      </BiggerBox>
    </Wrapper>
  );
}
```

이런식으로 원래는 수학을 써서 top,bottom,left,right를 만들어줘야 하지만, ref를 사용해서 BiggerBox의 ref를 가져오고 그 값을 dragcConstraints에 넣어준다면?? BiggerBox의 가장자리만큼 제약이 된다.

이러고 이제 드래그 후 놓으면 중앙으로 돌아오고 싶다면?
dragSnapToOrigin을 사용하면 된다.

- true인 경우 드래그 가능한 요소는 드래그를 놓을 때, 원점으로 다시 애니메이션됩니다.
  또는 dragElastic을 사용할 수도 있다. ( 탄성 )
- 외부 제약 조건에서 허용되는 이동 정도. 0 = 움직임 없음, 1 = 전체 움직임. 기본적으로 0.5로 설정됩니다. 움직임을 비활성화하기 위해 false로 설정할 수도 있습니다.

---

## MotionValue

> MotionValues는 애니메이션 값의 상태(state)와 속도(velocity)를 추적합니다.
> 모든 모션 컴포넌트는 내부적으로 MotionValues를 사용하여 애니메이션 값의 상태와 속도를 추적합니다.
> 일반적으로 이들은 자동으로 생성됩니다. (MotionValue는 React State가 아니기 때문에 Motion Value값이 바뀌어도 리랜더링이 일어나지 않는다.)

이번시간에는 MotionValue에 대해서 배워볼 것이다.
MotionValue는 우리의 Animation을 트랙킹할 때 사용한다.

그럼 이걸 사용해서 사용자가 왼쪽으로 드래그하면 빨강, 오른쪽으로 드래그하면 파랑 애니메이션을 구현다고 할 떄 필요할 수 있다.

```TSX
function App() {
  const x = useMotionValue(0);
  console.log(x);
  return (
    <Wrapper>
      <Box style={{ x }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
```

MotionValue는 일단 이런식으로 사용이 가능하다. style에서 x를 트래킹하고 있는 것이다.
또한, console.log를 하는데 한 번만 나올 것이다.
왜냐하면 MotionValue가 업데이트 될 때 React Rendering Cycle을 발동시키지 않기 때문이다.
즉, react state가 아니라는 말이다.

이것은 당연한 것이라고 볼 수 있다. 만약 우리가 API 컴포넌트를 가져오는데 거기에 애니메이션을 붙이고 실시간으로 계속 랜더링 되면 안되기 때문이다.

그래서 MotionValue는 ReactJs세계에 속하지 않는 것이다.

그럼 어떻게 값을 출력하는가?
바로 useEffect를 이용하면 된다.

```TSX
const x = useMotionValue(0);
useEffect(() => {
	x.on("change", () => console.log(x.get()));
}, [x]);
```

이런식으로 코드를 작성하면 된다.

- **const x = useMotionValue(0)**
  - useMotionValue 후크로 MotionValues를 생성할 수 있습니다.
  - useMotionValue에 전달된 값은 MotionValue의 초기 상태로 작동합니다.
- **x.set(100)**
  - set 메서드로 업데이트할 수 있습니다.
  - 이것은 React 리렌더링을 트리거하지 않습니다.
- **x.get()**
  - MotionValue는 문자열이나 숫자가 될 수 있습니다.
  - get 메소드로 값을 읽을 수 있습니다.

---

이제 Transformation을 해볼 것인데, 우리가 여기서 원하는 것은 얻은 값을 가지고 값을 변형시키는데 그 사이의 값까지 다 받는 것이다.

만약 -800위치에 div가 가면 scale: 2라고 하고, 800 위치에 가면 scale: 0이라고 하자.
그러면 자동적으로 0이면 scale: 1이고 400이면 0.5인 값을 받고 싶다는 것이다.

우리는 이것을 **useTransform**이라는 hook을 사용해서 할 것이다.

- useTransform 훅을 통해 MotionValues를 연결합니다.
- useTransform()는 한 값 범위에서 다른 값 범위로 매핑하여 다른 MotionValue의 output을 변환하는 MotionValue를 만듭니다.
- x(Motion Value)값을 다른 output값으로 변환해준다.

```TSX
const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
```

이런식으로 사용해주면 된다.

- 첫 번째 인자
  - MotionValue
- 두 번째 인자
  - 인풋
- 세 번째 인자 - 아웃풋
  **인풋과 아웃풋은 같은 크기의 배열을 가져야함**

```TSX
function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0.1]);
  return (
    <Wrapper>
      <Box style={{ x, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
```

이렇게 하면 구현완료이다.
왼쪽으로 갈수록 크기가 커지고, 오른쪽으로 갈수록 크기가 작아진다.

```TSX
function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    ["linear-gradient(135deg, #00a7ee, #0000ee)", "linear-gradient(135deg, #aeee00, #eeb200)"],
  );
  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}
```

이런식으로 작성하면 background에 gradient를 줄 수 있다.

그럼 이제 scroll을 이벤트로 만들어보자.

- useViewportScroll()
  - 뷰포트가 스크롤될 때 업데이트되는 MotionValues를 리턴합니다.
  - 아래 값들은 모두 MotionValue< number >를 넘겨줍니다.
  - scrollX: 실제 수평 스크롤 픽셀 ex) 500px
  - scrollY: 실제 수직 스크롤 픽셀 ex) 500px
  - scrollXProgress : 0 ~ 1 사이의 수평 스크롤
  - scrollYProgress : 0 ~ 1 사이의 수직 스크롤(가장 상단 0, 가장 하단 1)

```TSX
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
```

이런식으로 scroll값을 받아 변형시키고 그걸 scale에 넣어주면 스크롤에 따른 변화를 적용시킬 수 있다!

---

## SVG

이번 시간에는 SVG Animation에 대해서 알아볼 것이다.

우리는 Airbnb의 로고로 Animation을 해볼 것이다.

```TSX
const svg = {
  start: { fill: "rgba(255,255,255,0)", pathLength: 0 },
  end: { fill: "rgba(255,255,255, 1)", pathLength: 1, transition: { duration: 5 } },
};

function App() {
  const x = useMotionValue(0);
  const gradient = useTransform(
    x,
    [-800, 800],
    ["linear-gradient(135deg, #00a7ee, #0000ee)", "linear-gradient(135deg, #aeee00, #eeb200)"],
  );
  return (
    <Wrapper style={{ background: gradient }}>
      <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <motion.path
          variants={svg}
          initial="start"
          animate="end"
          stroke="black"
          strokeWidth={3}
          d="M224 373.1c-25.2-31.7-40.1-59.4-45-83.2-22.6-88 112.6-88 90.1 0-5.5 24.3-20.3 52-45 83.2zm138.2 73.2c-42.1 18.3-83.7-10.9-119.3-50.5 103.9-130.1 46.1-200-18.9-200-54.9 0-85.2 46.5-73.3 100.5 6.9 29.2 25.2 62.4 54.4 99.5-32.5 36.1-60.6 52.7-85.2 54.9-50 7.4-89.1-41.1-71.3-91.1 15.1-39.2 111.7-231.2 115.9-241.6 15.8-30.1 25.6-57.4 59.4-57.4 32.3 0 43.4 25.9 60.4 59.9 36 70.6 89.4 177.5 114.8 239.1 13.2 33.1-1.4 71.3-37 86.6zm47-136.1C280.3 35.9 273.1 32 224 32c-45.5 0-64.9 31.7-84.7 72.8C33.2 317.1 22.9 347.2 22 349.8-3.2 419.1 48.7 480 111.6 480c21.7 0 60.6-6.1 112.4-62.4 58.7 63.8 101.3 62.4 112.4 62.4 62.9 .1 114.9-60.9 89.6-130.2 0-3.9-16.8-38.9-16.8-39.6z"
        />
      </Svg>
    </Wrapper>
  );
}
```

진짜 멋있다..

- Line drawing
  - svg 엘리먼트에 'pathLength', 'pathSpacing', 'pathOffset' 속성을 사용하여 Line drawing 애니메이션을 만들 수 있습니다.
- path (SVG)
  - path SVG 엘리먼트는 모양을 정의하는 일반 엘리먼트입니다.모든 기본 모양은 path 엘리먼트로 만들 수 있습니다.
  - path의 속성 d는 경로의 모양을 정의합니다.
- motion.path
  - motion.path 컴포넌트는 세 가지 강력한 SVG path 속성인 pathLength, pathSpacing 및 pathOffset을 가지고 있습니다.
  - 수동 경로 측정이 필요 없이 모두 0과 1 사이의 값으로 설정됩니다.

특정 property의 animation duration을 바꾸는 방법

```TSX
transition={{
	default: { duration: 5 },
	fill: { duration: 2, delay: 2 },
}}
```

이런식으로 transition을 작성해준다면 default, 즉, 기본값은 5초동안 animation이 실행되지만, fill만 따로 duration: 2와 delay: 2를 가지게 할 수 있다!
나중에 굉장히 도움될 것 같다.

---

## AnimatePresence

> AnimatePresence를 사용하면 React 트리에서 컴포넌트가 제거될 때 제거되는 컴포넌트에 애니메이션 효과를 줄 수 있습니다. React에는 다음과 같은 수명 주기 메서드가 없기 때문에 종료 애니메이션을 활성화해야 합니다.

원래 react라면 사라질 때 애니메이션을 못하지만 AnimatePresence가 있기에 할 수 있다.
AnimatePresence는 규칙이 존재하는데 무조건 보여야(visible) 한다.
그리고 AnimatePresence는 내부에 무조건 조건문이 있어야 한다.

```TSX
<AnimatePresence>{showing ? <Box /> : null}</AnimatePresence>
```

이런식으로 작성해야 된다는 뜻이다.

여기서 우리는 사라질 떄 animation을 적어야 하는데 exit라는 props에 작성한다.

- exit
  - 이 컴포넌트가 트리에서 제거될 때 애니메이션할 대상입니다.

```TSX
const boxVariants = {
	initial: {
		opacity: 0,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
	},
	leaving: {
		opacity: 0,
		scale: 0,
		y: 50,
	},
};

function App() {
	const x = useMotionValue(0);
	const gradient = useTransform(
		x,
		[-800, 800],
		["linear-gradient(135deg, #00a7ee, #0000ee)", "linear-gradient(135deg, #aeee00, #eeb200)"],
	);
	const [showing, setShowing] = useState(false);
	const toggleShowing = () => setShowing((prev) => !prev);
	return (
		<Wrapper style={{ background: gradient }}>
			<button onClick={toggleShowing}>Click</button>
			<AnimatePresence>
				{showing ? (
					<Box variants={boxVariants} initial="initial" animate="visible" exit="leaving" />
				) : null}
			</AnimatePresence>
		</Wrapper>
	);
}
```

짜잔, 이러면 사라질 때 애니메이션이 적용이 된다.

---

이번에는 AnimatePresence를 이용해서 슬라이더를 만들어 볼 것이다.

> AnimatePresence의 단일 자식 key를 변경하여 슬라이드쇼(슬라이더)와 같은 컴포넌트를 쉽게 만들 수 있습니다.

```TSX
const box = {
	invisible: { x: 500, opacity: 0, scale: 0 },
	visible: { x: 0, opacity: 1, scale: 1, transition: { duration: 1 } },
	exit: { x: -500, opacity: 0, scale: 0, transition: { duration: 1 } },
};

function App() {
	const [visible, setVisible] = useState(1);
	const nextPlease = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
	const prevPlease = () => setVisible((prev) => (prev === 1 ? 1 : prev - 1));
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
			<AnimatePresence>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
					i === visible ? (
						<Box
							variants={box}
							initial="invisible"
							animate="visible"
							exit="exit"
							key={i}
						>
							{i}
						</Box>
					) : null,
				)}
			</AnimatePresence>
			<button onClick={nextPlease}>Next</button>
			<button onClick={prevPlease}>Prev</button>
		</Wrapper>
	);
}
```

구조를 좀 고치면

```TSX
<Box
	  variants={box}
	  initial="invisible"
	  animate="visible"
	  exit="exit"
	  key={visible}
>
	  {visible}
</Box>
```

이런식으로도 할 수 있다.
왜냐하면 react에서는 key가 바뀌면 element가 사라졌다고 판별하고 exit animation이 실행되기 때문이다. ( re-rendering 시켜준다 )

이런식으로 하면 슬라이더가 되긴 하지만 prev와 next의 애니메이션이 똑같아서 헷갈린다.

이것을 고치기 위해서는 custom이라는 property를 사용하면 된다.

- 각 애니메이션 컴포넌트에 대해 동적 variants를 다르게 적용할 때 사용할 수 있는 사용자 지정 데이터입니다.

custom을 사용하면 variants에서 함수 형태로 넘겨준 값을 받을 수 있다.
custom을 사용하면 animatePresence에도 custom을 똑같이 넘겨줘야 한다.

```TSX
const box = {
	entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }),
	center: { x: 0, opacity: 1, scale: 1, transition: { duration: 1 } },
	exit: (back: boolean) => ({
		x: back ? 500 : -500,
		opacity: 0,
		scale: 0,
		transition: { duration: 1 },
	}),
};

function App() {
	const [visible, setVisible] = useState(1);
	const [back, setBack] = useState(false);
	const nextPlease = () => {
		setBack(false);
		setVisible((prev) => (prev === 10 ? 10 : prev + 1));
	};
	const prevPlease = () => {
		setBack(true);
		setVisible((prev) => (prev === 1 ? 1 : prev - 1));
	};
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
			<AnimatePresence custom={back}>
				<Box
					custom={back}
					variants={box}
					initial="entry"
					animate="center"
					exit="exit"
					key={visible}
				>
					{visible}
				</Box>
			</AnimatePresence>
			<button onClick={nextPlease}>Next</button>
			<button onClick={prevPlease}>Prev</button>
		</Wrapper>
	);
}
```

이런식으로 하면 슬라이드를 만들 수 있다.

여기서 mode="wait"라는 속성을 써볼수도 있다. ( 과거 exitBeforeEnter )

- true로 설정하면 AnimatePresence는 한 번에 하나의 컴포넌트만 랜더링합니다.
- exiting중인 컴포넌트는 entering하는 컴포넌트가 렌더링되기 전에 exit 애니메이션을 완료합니다.
  exit 애니메이션이 완전히 끝나면 initial을 하게 하는 props이다.

```TSX
const box = {
	entry: (back: boolean) => ({ x: back ? -500 : 500, opacity: 0, scale: 0 }),
	center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.3 } },
	exit: (back: boolean) => ({
		x: back ? 500 : -500,
		opacity: 0,
		scale: 0,
		transition: { duration: 0.3 },
	}),
};

function App() {
	const [visible, setVisible] = useState(1);
	const [back, setBack] = useState(false);
	const prevPlease = async () => {
		await setBack(true);
		setVisible((prev) => (prev === 1 ? 1 : prev - 1));
	};

	const nextPlease = async () => {
		await setBack(false);
		setVisible((prev) => (prev === 10 ? 10 : prev + 1));
	};
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
			<AnimatePresence custom={back}>
				<Box
					custom={back}
					variants={box}
					initial="entry"
					animate="center"
					exit="exit"
					key={visible}
				>
					{visible}
				</Box>
			</AnimatePresence>
			<button onClick={nextPlease}>Next</button>
			<button onClick={prevPlease}>Prev</button>
		</Wrapper>
	);
}
```

그래서 이렇게 코드를 짜면 끝이다.
setBack state를 비동기 처리를 하면 넘길 때 일어나는 에러가 없어진다.

## Layout Animation

- layout
  - true인 경우 이 컴포넌트는 레이아웃이 변경될 때 새 위치에 자동으로 애니메이션을 적용합니다.
  - 크기나 위치가 변경될 때 모션 컴포넌트의 레이아웃에 자동으로 애니메이션을 적용하려면 레이아웃 prop을 제공합니다.
  - 부모 플렉스박스 방향, 너비, 상단/오른쪽 등 레이아웃 변경의 원인이 무엇이든 상관없이 애니메이션 자체는 최대 성능을 위해 변환으로 수행됩니다.

layout이라는 props를 element에게 넣어주면 element의 layout(css)이 바뀔 때 animate를 해준다.

```TSX
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
			<Box
				style={{
					justifyContent: clicked ? "center" : "flex-start",
					alignItems: clicked ? "center" : "flex-start",
				}}
			>
				<Circle layout />
			</Box>
		</Wrapper>
	);
}
```

이렇게 Circle에 layout만 넣어준다면?? 너무 간단하게 애니메이션을 적용 시킬 수 있다.

이것도 좋아보이는데 이것보다 더 좋은게 있다.
바로 shared layout animation(Syncing layout animations)이다.

- 모션 컴포넌트의 layout prop은 레이아웃이 변할 때마다, 자동으로 애니메이션을 적용합니다.

```TSX
<Wrapper onClick={toggleClicked} style={{ background: gradient }}>
  <Box>{!clicked ? <Circle /> : null}</Box>
  <Box>{clicked ? <Circle /> : null}</Box>
</Wrapper>
```

이런 두 가지의 똑같은 circle이 있을 때, 같은 component라고 framer에게 말해주면?

```TSX
<Wrapper onClick={toggleClicked} style={{ background: gradient }}>
  <Box>{!clicked ? <Circle layoutId="circle" /> : null}</Box>
  <Box>{clicked ? <Circle layoutId="circle" /> : null}</Box>
</Wrapper>
```

진짜 엄청나다. 애니메이션을 연결해준다..!

```TSX
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
```

최종본!

## Final Project

마지막으로 지금까지 배운것들을 사용해서 간단한 것을 만들어보는 시간이다.

```TSX
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
```

이걸로 끝!
