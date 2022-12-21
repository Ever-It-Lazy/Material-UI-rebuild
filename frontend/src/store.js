import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteListReducer, noteUpdateReducer } from './reducers/noteReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	userLogin: { userInfo: userInfoFromStorage }
}

const store = configureStore({
	reducer: {
		userLogin: userLoginReducer,
		userRegister: userRegisterReducer,
		userUpdate: userUpdateReducer,
		noteList: noteListReducer,
		noteCreate: noteCreateReducer,
		noteUpdate: noteUpdateReducer,
		noteDelete: noteDeleteReducer
	},
	preloadedState: initialState
});

export default store;