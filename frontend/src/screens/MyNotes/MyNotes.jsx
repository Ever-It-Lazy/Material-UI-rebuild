import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/noteActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import axios from 'axios';
const MyNotes = ({ search }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const noteList = useSelector(state => state.noteList);
	const { loading, notes, error } = noteList;
	//console.log(process.env.PORT);

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const noteCreate = useSelector((state) => state.noteCreate);
	const { success: successCreate } = noteCreate;

	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { success: successUpdate } = noteUpdate;

	const noteDelete = useSelector((state) => state.noteDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

	const fetchNotes = async () => {
		const data = await axios.get("/api/notes");

		console.log(data);
	}

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteNoteAction(id));
		}
	};

	useEffect(() => {
		fetchNotes();
	}, []);

	return <MainScreen title={`Welcome Back`}>

	</MainScreen>

};

export default MyNotes;
