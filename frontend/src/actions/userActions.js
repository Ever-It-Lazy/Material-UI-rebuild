import axios from "axios";
import { createSlice, createAsyncThunk, createAction, createReducer } from '@reduxjs/toolkit';
import {
	USER_LOGOUT
} from "../constants/userConstants";

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

const userLogout = createAction('user/logout');

export const userLoginReducer = createSlice({
	name: 'user',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userInfo = payload;
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
			.addCase(userLogout, (state) => {
				delete state.userInfo;
			})
	}
}).reducer;

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

export const userRegisterReducer = createSlice({
	name: 'user',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userInfo = payload;
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
	}
}).reducer;

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

export const userUpdateReducer = createSlice({
	name: 'user',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateProfile.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.userInfo = payload;
				state.succes = true;
			})
			.addCase(updateProfile.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
	}
}).reducer;