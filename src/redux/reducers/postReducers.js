import {
	POST_CREATE,
	GET_POST_LIST,
	REQUEST_SEND,
	REQUEST_ERROR,
} from "../constants/post-constants";

const initialState = {
	posts: [],
	post: {},
	error: "",
	isLoading: false,
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case POST_CREATE:
			return {
				...state,
				post: action.payload,
				isLoading: false,
			};
		case GET_POST_LIST:
			return {
				...state,
				posts: action.payload,
				error: "",
				isLoading: false,
			};
		case REQUEST_SEND:
			return {
				...state,
				isLoading: true,
			};
		case REQUEST_ERROR:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default postReducer;
