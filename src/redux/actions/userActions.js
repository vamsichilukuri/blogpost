import {
	AUTH_FORM_SUCCESS,
	AUTH_FORM_FAIL,
	AUTH_ERROR,
	USER_DATA,
	LOG_OUT,
	CHECK_PASSWORDS,
	CHANGE_PASSWORD,
	CHANGE_PASSWORD_FAIL,
	CHANGE_PROFILE,
	CHANGE_USER_DATA_FAILED,
	GET_USERS,
	SEARCH_BY_USERNAME,
} from "../constants/user-constants";

export const authFormSuccess = (res) => {
	return {
		type: AUTH_FORM_SUCCESS,
		payload: res,
	};
};

export const authFormFailed = (res) => {
	return {
		action: AUTH_FORM_FAIL,
		payload: res,
	};
};

export const authError = (err) => {
	return {
		action: AUTH_ERROR,
		payload: err,
	};
};

export const userData = (res) => {
	console.log(res)
	return {
		type: USER_DATA,
		payload: res,
	};
};

export const logoutUser = () => {
	return {
		action: LOG_OUT,
	};
};
