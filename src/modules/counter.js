import {createAction, handleActions} from 'redux-actions';

// Action Type 정의하기
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";
const INPUT_CHANGE = "counter/INPUT_CHANGE";
const CHANGE_NAME = "counter/CHANGE_NAME";

// Action Type 반환하는 함수 만들어주기
// export const increase = () => ({ type: INCREASE});
// export const decrease = () => ({ type: DECREASE});

// createAction 메소드를 사용해 Action 타입을 반환하는 함수 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const inputChange = createAction(INPUT_CHANGE, input => input);
export const changeName = createAction(CHANGE_NAME, name => name);

// 초기 상태 작성하기
const initialState = {
    number : 0,
    name: "평범한 카운터",
    inputName: " "
};

// Reducer 함수 만들기
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
        [INPUT_CHANGE]: (state, { payload: input}) => ({
            ...state,
            inputName: input
        }),
        [CHANGE_NAME]: (state, { payload: name}) => ({
            ...state,
            name: name
        }),
    },
    initialState
);

export default counter;