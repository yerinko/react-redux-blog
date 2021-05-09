# React Redux 프로세스 정리 
![redux](https://user-images.githubusercontent.com/46296865/117567346-e7a92f00-b0f6-11eb-9971-66e3ee37c60e.png)

## 프로젝트 구조

- **components**: 화면에 실제로 그려지는 컴포넌트를 담는 폴더
- **containers**: 리덕스 스토어와 컴포넌트를 이어주는 매개체를 담는 폴더
- **modules**: 리덕스의 State, Reducer를 정의한 파일들을 담는 폴더

## Redux 프로세스 

1. **modules** 폴더에 값, 그리고 액션 정의하기
2. **modules/index.js**에서 `combineReducers`를 사용해서 `rootReducer`만들어주기
3. **containers** 폴더에서 Container 만들고 `connect`함수 사용해서 컴포넌트와 리덕스 연동하기

### modules 수정
`modules` 를 수정하는 프로세스는 다음과 같다.
1. Action Type 정의하기
2. Action Type 반환하는 함수 만들어주기
3. 초기 상태 작성하기
4. `Reducer` 함수 만들기

### Action Type 정의하기
`modules/counter.js`
``` 
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INPUT_CHANGE = "counter/INPUT_CHANGE";
const CHANGE_NAME = "counter/CHANGE_NAME";
``` 

### Action Type 반환하는 함수 만들어주기
간단하게 작성하기 위해서 `createAction` 메소드를 사용했다.
``` 
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const inputChange = createAction(INPUT_CHANGE, input => input);
export const changeName = createAction(CHANGE_NAME, name => name);
``` 

### 초기 상태 작성하기
``` 
const initialState = {
  number: 0,
  name: "평범한 카운터",
  inputName: ""
};
``` 

### Reducer 함수 만들기
``` 
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({
      ...state,
      number: state.number + 1
    }),
    [DECREASE]: (state, action) => ({
      ...state,
      number: state.number - 1
    }),
    [INPUT_CHANGE]: (state, { payload: input }) => ({
      ...state,
      inputName: input
    }),

    [CHANGE_NAME]: (state, { payload: name }) => ({
      ...state,
      name: name
    })
  },
  initialState
);
``` 

### Container 
``` 
import {
  increase,
  decrease,
  inputChange,
  changeName
} from "../modules/counter";
(...)
  const { counterNum, name, inputName } = useSelector(({ counter }) => ({
    counterNum: counter.number,
    name: counter.name,
    inputName: counter.inputName
  }));
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  const onInputChange = useCallback(input => dispatch(inputChange(input)), [
    dispatch
  ]);
  const onChangeName = useCallback(name => dispatch(changeName(name)), [
    dispatch
  ]);
  return (
    <Counter
      name={name}
      inputName={inputName}
      number={counterNum}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onChange={onInputChange}
      onChangeName={onChangeName}
    />
  );
};
export default React.memo(CounterContainer);
``` 

### onClick
`components/Counter.js`
``` 
(...)
const onClick = () => {
  onChangeName(inputName);
  onChange("");
};
``` 
