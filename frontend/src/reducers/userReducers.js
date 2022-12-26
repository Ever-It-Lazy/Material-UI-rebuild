import { createSlice } from '@reduxjs/toolkit';
import { login, userLogout, register, updateProfile } from '../actions/userActions';

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