import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit';

export const listNotes = createAsyncThunk(
	'notes/listNotes',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const { data } = await axios.get(
				"/api/notes",
				{
					headers: { Authorization: `Bearer ${userInfo.token}` }
				}
			);

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

export const createNoteAction = createAsyncThunk(
	'notes/createNote',
	async ({ title, content, category }, { getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const { data } = await axios.post(
				"/api/notes/create",
				{ title, content, category },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userInfo.token}`
					}
				}
			);

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

export const updateNoteAction = createAsyncThunk(
	'notes/updateNote',
	async ({ id, title, content, category }, { getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const { data } = await axios.put(
				`/api/notes/${id}`,
				{ title, content, category },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${userInfo.token}`
					}
				}
			);

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

export const deleteNoteAction = createAsyncThunk(
	'notes/deleteNote',
	async ({ id }, { getState, rejectWithValue }) => {
		try {
			const { userLogin: { userInfo } } = getState();

			const { data } = await axios.delete(
				`/api/notes/${id}`,
				{
					headers: { Authorization: `Bearer ${userInfo.token}` }
				}
			);

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