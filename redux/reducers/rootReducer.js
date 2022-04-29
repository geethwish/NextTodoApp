import { combineReducers } from "redux";
import mainReducer from "./main";

const rootReducer = combineReducers({
    user: mainReducer,
})

export default rootReducer;