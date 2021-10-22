import { combineReducers } from "redux";
import postReducer from "../reducers/postReducers";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
	postReducer,
	userReducer,
});
export default rootReducer;
