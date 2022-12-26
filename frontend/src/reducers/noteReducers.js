import { createSlice } from '@reduxjs/toolkit';
import { listNotes, createNoteAction, updateNoteAction, deleteNoteAction } from '../actions/noteActions';

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