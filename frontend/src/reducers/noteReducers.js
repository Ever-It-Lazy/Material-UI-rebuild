import { createSlice } from '@reduxjs/toolkit';
import { listNotes, createNoteAction, updateNoteAction, deleteNoteAction } from '../actions/noteActions';

export const noteListReducer = createSlice({
	name: 'notes',
	initialState: { notes: [] },
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(listNotes.pending, (state) => {
				state.loading = true;
			})
			.addCase(listNotes.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.notes = payload;
			})
			.addCase(listNotes.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
	}
}).reducer;

export const noteCreateReducer = createSlice({
	name: 'note',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createNoteAction.pending, (state) => {
				state.loading = true;
			})
			.addCase(createNoteAction.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(createNoteAction.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
			})
	}
}).reducer;

export const noteUpdateReducer = createSlice({
	name: 'note',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(updateNoteAction.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateNoteAction.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(updateNoteAction.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
	}
}).reducer;

export const noteDeleteReducer = createSlice({
	name: 'note',
	initialState: {},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(deleteNoteAction.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteNoteAction.fulfilled, (state) => {
				state.loading = false;
				state.success = true;
			})
			.addCase(deleteNoteAction.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload;
				state.success = false;
			})
	}
}).reducer;