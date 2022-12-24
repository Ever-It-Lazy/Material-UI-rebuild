import { configureStore } from '@reduxjs/toolkit';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteCreateReducer, noteDeleteReducer, noteUpdateReducer } from './reducers/noteReducers';
import { noteListReducer } from './actions/noteActions';

const reducer = {
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userUpdate: userUpdateReducer,
	noteList: noteListReducer,
	noteCreate: noteCreateReducer,
	noteUpdate: noteUpdateReducer,
	noteDelete: noteDeleteReducer
};

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const preloadedState = {
	userLogin: { userInfo: userInfoFromStorage }
}

const store = configureStore({
	reducer,
	preloadedState
});

export default store;