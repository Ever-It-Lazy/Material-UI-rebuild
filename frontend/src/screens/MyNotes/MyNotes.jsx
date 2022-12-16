import React, { useEffect } from 'react';
import {
	Accordion, AccordionSummary, AccordionDetails,
	ButtonGroup, Button, Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/noteActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyNotes = ({ search }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const noteList = useSelector(state => state.noteList);
	const { loading, notes, error } = noteList;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const noteCreate = useSelector((state) => state.noteCreate);
	const { success: successCreate } = noteCreate;

	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { success: successUpdate } = noteUpdate;

	const noteDelete = useSelector((state) => state.noteDelete);
	const { loading: loadingDelete, error: errorDelete, success: successDelete } = noteDelete;

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteNoteAction(id));
		}
	};

	useEffect(() => {
		dispatch(listNotes());

		if (!userInfo) {
			navigate("/");
		}
	}, [dispatch, userInfo, navigate, successCreate, successUpdate, successDelete]);

	return <MainScreen title={`Welcome Back ${userInfo.name}..`}>
		<Button
			sx={{ marginLeft: 10, marginBottom: 6 }}
			onClick={() => navigate("/createnote")}
		>
			Create New Note
		</Button>
		{errorDelete && <ErrorMessage severity="error">{errorDelete}</ErrorMessage>}
		{loadingDelete && <Loading/>}
		{error && <ErrorMessage severity="error">{error}</ErrorMessage>}
		{loading && <Loading/>}
		<div>
		{
			notes?.reverse().filter(filteredNote => (
				filteredNote.title.toLowerCase().includes(search.toLowerCase())
			)).map((note) => (
				<Accordion key={note._id}>
					<AccordionSummary sx={{ backgroundColor: 'rgba(0,0,0,.03)' }} expandIcon={<ExpandMoreIcon />}>
						<Typography
							component="header"
							sx={{ alignSelf: 'center', width: 'stretch' }}
						>
							{note.title}
						</Typography>
						<ButtonGroup variant="outlined" sx={{ display: 'flex' }}>
							<Button onClick={() => navigate(`/note/${note._id}`)}>Edit</Button>
							<Button
								color="warning"
								onClick={() => deleteHandler(note._id)}
							>
								Delete
							</Button>
						</ButtonGroup>

					</AccordionSummary>
					<AccordionDetails>
						<Typography variant="h4">
							Category - {note.category}
						</Typography>
						<blockquote>
							<p>{note.content}</p>
							<footer>
								Created on{" "}
								<cite title="Source Title">
									{note.createdAt.substring(0, 10)}
								</cite>
							</footer>
						</blockquote>
					</AccordionDetails>
				</Accordion>
			))
		}
		</div>
	</MainScreen>

};

export default MyNotes;
