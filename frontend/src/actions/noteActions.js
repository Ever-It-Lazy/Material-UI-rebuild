import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const handleErrors = (response) => {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
};

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
			).then(handleErrors).then(response => response.json());

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
			).then(handleErrors).then(response => response.json());

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

export const updateNoteAction = createAsyncThunk(
	'notes/updateNote',
	async ({ id, title, content, category }, { getState, rejectWithValue }) => {
		try {
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
			).then(handleErrors).then(response => response.json());

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

export const noteUpdateReducer = createSlice({
	name: 'note',
	initialState: {},
	reducers: {},
	extraReducers: {
		[updateNoteAction.pending]: (state) => {
			state.loading = true;
		},
		[updateNoteAction.fulfilled]: (state) => {
			state.loading = false;
			state.success = true;
		},
		[updateNoteAction.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
	},
}).reducer;

export const deleteNoteAction = createAsyncThunk(
	'notes/deleteNote',
	async ({ id }, { getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const data = await fetch(
				`/api/notes/${id}`,
				{
					method: 'delete',
					headers: { Authorization: `Bearer ${userInfo.token}` }
				}
			).then(handleErrors).then(response => response.json());

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

export const noteDeleteReducer = createSlice({
	name: 'note',
	initialState: {},
	reducers: {},
	extraReducers: {
		[deleteNoteAction.pending]: (state) => {
			state.loading = true;
		},
		[deleteNoteAction.fulfilled]: (state) => {
			state.loading = false;
			state.success = true;
		},
		[deleteNoteAction.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
			state.success = false;
		},
	},
}).reducer;