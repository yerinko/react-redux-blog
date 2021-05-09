import React, {useCallback} from "react";
import Counter from "../components/Counter";
import {connect, useSelector, useDispatch} from 'react-redux';
import { increase, decrease, inputChange, changeName } from "../modules/counter";
import {bindActionCreators} from 'redux';

// const CounterContainer = ({ counterNum, increase, decrease }) => {
//     return <Counter number={counterNum} onIncrease={increase} onDecrease={decrease}/>;
// };
//
// const mapStateToProps = state => ({
//     counterNum: state.counter.number,
// });
// // const mapDispatchToProps = dispatch => ({
// //     increase: () => dispatch(increase()),
// //     decrease: () => dispatch(decrease())
// // });
// const mapDispatchToProps = dispatch =>
//     bindActionCreators(
//         {
//             increase,
//             decrease
//         },
//         dispatch
//     );
//
//
//
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

const CounterContainer = () => {
    const { counterNum, name, inputName } = useSelector(({ counter }) => ({
        counterNum: counter.number,
        name: counter.name,
        inputName: counter.inputName
    }));
    const dispatch = useDispatch();
    // useCallback 으로 감싸는 이유는 숫자가 바뀔 때마다 컴포넌트가 리렌더링 되어서 매번 함수를 새로 만드므로 useCallback 으로 감싸주는 것이 좋다.
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
            // onIncrease={() => dispatch(increase())}
            // onDecrease={() => dispatch(decrease())}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onChange={onInputChange}
            onChangeName={onChangeName}
        />
    );
};
// Hooks 를 사용하든 connect 함수를 사용하든 개인의 자유지만,
// useSelector 를 사용하여 Redux 의 상태를 조회하는 경우, 최적화 작업이 자동으로 이루어지지 않으므로
// React.memo 를 이용하는 것이 좋다.
export default React.memo(CounterContainer);
// props가 자주 변동되는 환경이라면 Reaxt.memo를 사용한다고 해도 컴포넌트를 다시 렌더링 해야하므로 불필요한 비교 과정만 추가하는 꼴이다! 현명하게 사용하자.

