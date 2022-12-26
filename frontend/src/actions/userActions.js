import axios from "axios";
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
	'user/login',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				"/api/users/login",
				{ email, password },
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			localStorage.setItem('userInfo', JSON.stringify(data));
			return data;
		} catch (error) {
			throw rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const userLogout = createAction('user/logout');

export const logout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch(userLogout());
}

const loginFulfilled = createAction('user/login/fulfilled');

export const register = createAsyncThunk(
	'user/register',
	async ({ name, pic, email, password }, { dispatch, rejectWithValue }) => {
		try {
			const { data } = await axios.post(
				"/api/users",
				{ name, pic, email, password },
				{
					headers: { 'Content-Type': 'application/json' }
				}
			);

			dispatch(loginFulfilled(data));

			localStorage.setItem('userInfo', JSON.stringify(data));

			return data;
		} catch (error) {
			throw rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const updateProfile = createAsyncThunk(
	'user/update',
	async (user, { dispatch, getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const { data } = await axios.post(
				"/api/users/profile",
				user,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${userInfo.token}`
					}
				}
			);

			dispatch(loginFulfilled(data));

			localStorage.setItem('userInfo', JSON.stringify(data));

			return data;
		} catch (error) {
			throw rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);