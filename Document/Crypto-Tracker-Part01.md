API를 사용해서 간단하게 비트코인을 보여주는 사이트를 만들어보면서 지금까지 배웠던 기술들을 총합해서 사용해보는 간단 프로젝트

- React.js
- Styled-Component
- TypeScript
- React-Router
- React-Query
- React-Helmet

# 알게 된 점

- 현재 TypeScript를 사용하고 있기때문에 아래 구문을 하면 오류가 나게 될 것이다.

```JS
import { BrowserRouter } from "react-router-dom";
```

- 그럴때는 `npm i --save-dev @types/react-router-dom`이런식으로 types를 다운받아주면 된다.
- 아래 처럼 작성하게 된다면 URL에 변수값을 가진다는 것

```JS
<Route path="/:coinId">
  <Coin />
</Route>
```

- url 파라미터를 가져오고 싶을 때는 useParams()라는 ReactHook을 사용해준다.
- `const { coinId } = useParams();`이런식으로 작성을 하면 오류가 나는데, 이럴때는 TypeScript가 useParams가 비어있다고 인식해서 그렇다.
- 해결 방법은 두 가지가 존재한다. interface를 사용하든가? 그냥 타입지정을 해주든가.
  이 경우에서는 값이 한 가지만 존재하기에 나는 그냥 타입지정을 해주었다.
  `const { coinId } = useParams<{ coinId: string }>();`
- 우리가 여러 개의 element를 사용해야 할 때에는 fragment를 사용할 수 있다.

```JS
<>
  <GlobalStyle />
  <Router />
</>
```

- createGlobalStyle (전역 스타일을 처리함)
  전역 스타일을 처리하는 특수 Styled Component를 생성하는 helper 함수이다.

```JS
const GlobalStyle = createGlobalStyle` //css코드 `;
```

- a href를 사용하면 페이지의 새로고침이 일어난다.
- 그래서 새로고침을 안하기 위해서는 react-router-dom에 있는 Link를 사용한다.
- Link는 결국 a로 바뀌기 때문에 css에서는 a로 쓰면 된다.
- 아래 코드처럼 사용하면 함수를 바로 실행시킬 수 있다. (즉시 실행 함수)

```JS
(() => console.log("1"))()
```

- API가져올 때 아래처럼 fetch를 사용해서 가져왔는데..

```JS
useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);
```

- axios를 사용하면 기본이 json이기에 좀 더 편하게 가져올 수 있다.

```JS
const getCoins = async() =>{
	const res = await axios("https://api.coinpaprika.com/v1/coins");
	setCoins(res.data.slice(0, 100));
	setLoading(false);
};
```

- Link를 사용할 state를 사용해준다면 데이터를 넘길 수 있다.

```JS
<Link
	to={{
		pathname: `/${coin.id}`,
		state: { name: coin.name },
	}}
>
```

- state값을 가져오기 위해서는 react-router-dom의 locationObj에 접근하면 된다.

```JS
const location = useLocation();
```

```JS
const { state } = useLocation<RouteStates>();
```

- 이런식으로 state를 가져와서 사용할 수 있다.
- 이렇게 가져와주면 웹이 좀 빠른것처럼 만들 수 있다.
- 하지만 이런식으로 하면 home에서 클릭할 때 name을 넘겨주는 것이기 때문에 링크를 복붙하면 에러가 나게된다.
- 그럴 때는 아래처럼 해주면 된다.

```JS
<Title>{state?.name || "이름 로딩중"}</Title>
```

- 이런식으로 대처해줄 수 있다!
- API불러올 때 한 줄로 만들고 싶다? 라고 하면 아래 처럼 써보자

```JS
const response = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
```

- 별로 안이쁘지만 시간 절약은 된다. (react-query배우면 지린다고 함)

## nested route

```JS
<Switch>
	<Route path={`/:coinId/price`}>
		<Price />
	</Route>
	<Route path={`/:coinId/chart`}>
		<Chart />
	</Route>
</Switch>
```

이런식으로 Route안에 Route를 추가해서 탭마다 하나만 보이게 만들 수도 있다.

## Props를 사용할 때 $를 붙이는 이유

React18 이후 일관성을 높이고, 사용자 혼동을 방지하기 위해 prop의 이름은 소문자나 앞에 $가 있어야만 사용자 지정 속성으로 인식한다. $가 추가된 이유는 일부 라이브러리 또는 구성 요소는 대문자를 사용하는 prop을 요구하기 때문이다.

### useRouteMatch

- 특정한 url에 있는지 여부를 알려주는 hook이다.

```JS
const priceMatch = useRouteMatch("/:coinId/price")
```

- 이런식으로 작성해서 콘솔에 출력을 해보면 만약에 url이 맞다면 object하나를 넘겨주고 아니라면 null이 뜬다.

## ReactQuery

```JS
const [coins, setCoins] = useState<CoinInterface[]>([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
}, []);
```

만약에 이 코드를 React-Query를 사용하게 되면 어떻게 될까?

일단 fetcher라는 함수를 만들어줘야 한다.
fetcher는 api.ts라는 파일을 하나 만들어서 관리하게 된다.

> fetcher함수는 fetch를 하는 함수라고 보면 된다.

```JS
const response = await fetch("https://api.coinpaprika.com/v1/coins");
const json = await response.json();
```

이 부분을 때와서

```JS
export async function fetchCoins() {
  return await fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
    response.json(),
  );
}
```

만들어주고

그 다음부터 useQuery라는 hook을 사용하면 되는데 useQuery는 2가지 인자가 필요하다.

- queryKey
  - query의 고유 식별자
- fetcher 함수
  그리고 useQuery가 return하는 것을 받아오면 된다.

잠깐 정리해보면

> useQuery가 fetcher함수를 불러주고 isLoading값에 로딩중인지 알려주고 data에 fetcher에서 return한 json을 넣어준다!

그래서 그 긴거를..

```JS
const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
```

단 한 줄로 해결할 수 있다..

심지어 React-Query를 사용하면 가져온 데이터를 캐싱해두기 때문이다.
그래서 코인을 누르고 뒤로가기를 눌러도 loading이 뜨지 않는다!

심지어 많은 state들도 사라지기에 사용할 때 너무 편하다!

또한 캐싱된 데이터를 보기 위해서

```JS
<ReactQueryDevtools initialIsOpen={true} />
```

를 사용하여 시각화해 확인할 수도 있다.

ReactQuery는 Key를 Array로 받기 때문에 key을 줄 때 중복이 된다면,

```JS
const {} = useQuery(["info", coinId], () => fetchCoinInfo(coinId));
const {} = useQuery(["tickers", coinId], () => fetchCoinTickers(coinId));
```

이런식으로 Array로 Key를 만들어주면 고유한 값을 가지게 할 수 있다.

이제 우리가 useQuery에서 하나씩 뽑아 먹을 때, 여러 개의 쿼리를 날리면 프로퍼티 이름이 겹칠 것이다.
그렇때는 아래처럼 이름을 지정해서 사용해주면 된다.

```JS
const { isLoading: infoLoading, data: infoData } = useQuery(
	["info", coinId],
	() => fetchCoinInfo(coinId),
);

const { isLoading: tickersLoading, data: tickerData } = useQuery(
	["tickers", coinId],
	() => fetchCoinTickers(coinId),
);
```

또한 이놈들도 infoData의 type과 tickerData의 type을 모르기에 타입 지정을 해줘야한다.

```JS
const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
	["info", coinId],
	() => fetchCoinInfo(coinId),
);

const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
	["tickers", coinId],
	() => fetchCoinTickers(coinId),
);
```

![[Pasted image 20240404080950.png]]
그러면 이런식으로 캐시에 들어가게 된다.

```JS
const [loading, setLoading] = useState(true);
const [info, setInfo] = useState<InfoData>();
const [priceInfo, setPriceInfo] = useState<PriceData>();
useEffect(() => {
	(async () => {
		const infoData = await (
			await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
		).json();
		console.log(infoData);
		setInfo(infoData);
		const priceData = await (
			await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
		).json();
		setPriceInfo(priceData);
		setLoading(false);
	})();
}, []);
```

그래서 결론을 보면 위에서 아래로 바뀐 것을 볼 수 있다!

```JS
const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
	["info", coinId],
	() => fetchCoinInfo(coinId),
);
const { isLoading: tickersLoading, data: tickerData } = useQuery<PriceData>(
	["tickers", coinId],
	() => fetchCoinTickers(coinId),
);

const loading = infoLoading || tickersLoading;
```

## React-Helmet

React-Helmet이라는 것을 사용해서 head를 넣을 수 있다.
