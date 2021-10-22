import {
	AUTH_FORM_SUCCESS,
	AUTH_FORM_FAIL,
	AUTH_ERROR,
	USER_DATA,
	LOG_OUT,
} from "../constants/user-constants";

const initialState = {
	// posts: [],
	users: [],
	user: {},
	token: null,
	error: "",
	isLoading: false,
	isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
		console.log(action)
	switch (action.type) {
		case USER_DATA:
			return {
				...state,
				user: action.payload.data,
				token: action.payload.accessToken,
				// posts: action.payload.posts,
				isLoading: false,
			};
		default:
			return state;
	}
};

export default userReducer;
