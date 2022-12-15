import React, { useEffect } from 'react';
import {
	Accordion, AccordionSummary, AccordionDetails,
	Badge, Button, Typography,
	Card, CardHeader, CardContent, ButtonGroup
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
		<Link to="/createnote">
			<Button sx={{ marginLeft: 10, marginBottom: 6 }} size="1g">
				Create New Note
			</Button>
		</Link>
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
					<AccordionSummary id={note._id}>
						<Typography>
							<span>{note.title}</span>
								<Button href={`/note/${note._id}`}>Edit</Button>
								<Button
									color="warning"
									onClick={() => deleteHandler(note._id)}>
									Delete
								</Button>
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Card>
								<h4>
									<Badge variant="success">
										Category - {note.category}
									</Badge>
								</h4>
								<blockquote className="blockquote mb-0">
									<p>{note.content}</p>
									<footer className='blockquote-footer'>
										Created on{" "}
										<cite title="Source Title">
											{note.createdAt.substring(0, 10)}
										</cite>
									</footer>
								</blockquote>
							</Card>
						</AccordionDetails>
				</Accordion>
			))
		}
		</div>
	</MainScreen>

};

export default MyNotes;
