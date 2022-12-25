import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS
} from "../constants/userConstants";

const handleErrors = (response) => {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
};

export const login = (email, password ) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });

		const data = await fetch(
			"/api/users/login",
			{
				method: 'post',
				body: JSON.stringify({ email, password }),
				headers: { 'Content-Type': 'application/json' }
			}
			).then(handleErrors).then(response => response.json());

		dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });
}

export const register = ( name, pic, email, password ) => async (dispatch) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });

		const data = await fetch(
			"/api/users",
			{
				method: 'post',
				body: JSON.stringify({ name, pic, email, password }),
				headers: { 'Content-Type': 'application/json' }
			}
			).then(handleErrors).then(response => response.json());

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const updateProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const data = await fetch(
			"/api/users/profile",
			{
				method: 'post',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`
				}
			}
		).then(handleErrors).then(response => response.json());

		dispatch({
			type: USER_UPDATE_SUCCESS,
			payload: data
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};