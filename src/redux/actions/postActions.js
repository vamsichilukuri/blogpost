import {
	POST_CREATE,
	GET_POST_LIST,
	REQUEST_SEND,
	REQUEST_ERROR,
} from "../constants/post-constants";

export const createPost = (res) => {
	return {
		type: POST_CREATE,
		payload: res,
	};
};

export const getPostList = (res) => {
	return {
		type: GET_POST_LIST,
		payload: res,
	};
};

export const requestSendToPost = () => {
	return {
		type: REQUEST_SEND,
	};
};

export const requestError = () => {
	return {
		type: REQUEST_ERROR,
	};
};
