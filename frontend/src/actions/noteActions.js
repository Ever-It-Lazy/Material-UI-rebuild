import {
	NOTE_DELETE_FAIL,
	NOTE_DELETE_REQUEST,
	NOTE_DELETE_SUCCESS,
	NOTE_UPDATE_FAIL,
	NOTE_UPDATE_REQUEST,
	NOTE_UPDATE_SUCCESS
} from "../constants/noteConstants";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const listNotes = createAsyncThunk(
	'notes/listNotes',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const data = await fetch(
				"/api/notes",
				{
					method: 'get',
					headers: { Authorization: `Bearer ${userInfo.token}` }
				}
			).then(response => response.json());

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

export const noteListReducer = createSlice({
	name: 'notes',
	initialState: { notes: [] },
	reducers: {},
	extraReducers: {
		[listNotes.pending]: (state) => {
			state.loading = true;
		},
		[listNotes.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.notes = payload;
		},
		[listNotes.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
}).reducer;

export const createNoteAction = createAsyncThunk(
	'notes/createNote',
	async ({ title, content, category }, { getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const data = await fetch(
				"/api/notes/create",
				{
					method: 'post',
					body: JSON.stringify({ title, content, category }),
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userInfo.token}`
					}
				}
			).then(response => response.json());

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

export const noteCreateReducer = createSlice({
	name: 'note',
	initialState: {},
	reducers: {},
	extraReducers: {
		[createNoteAction.pending]: (state) => {
			state.loading = true;
		},
		[createNoteAction.fulfilled]: (state) => {
			state.loading = false;
			state.success = true;
		},
		[createNoteAction.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
	},
}).reducer;

export const updateNoteAction = (id, title, content, category) => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTE_UPDATE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const data = await fetch(
			`/api/notes/${id}`,
			{
				method: 'put',
				body: JSON.stringify({ title, content, category }),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${userInfo.token}`
				}
			}
		).then(response => response.json());

		dispatch({ type: NOTE_UPDATE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NOTE_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};

export const deleteNoteAction = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: NOTE_DELETE_REQUEST });

		const { userLogin: { userInfo } } = getState();

		const data = await fetch(
			`/api/notes/${id}`,
			{
				method: 'delete',
				headers: { Authorization: `Bearer ${userInfo.token}` }
			}
		).then(response => response.json());

		dispatch({ type: NOTE_DELETE_SUCCESS, payload: data });
	} catch (error) {
		dispatch({
			type: NOTE_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
		});
	}
};