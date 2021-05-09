import { combineReducers } from "redux";
import counter from "./counter";

// 우리가 만든 모듈을 rootReducer에 연결하기
const rootReducer = combineReducers({
    counter
});

export default rootReducer;



