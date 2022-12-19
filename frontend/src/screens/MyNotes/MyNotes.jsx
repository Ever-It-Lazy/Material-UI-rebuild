import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import {
	ButtonGroup, Button, Typography
} from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listNotes } from '../../actions/noteActions';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
}	,
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'dark'
			? 'rgba(255, 255, 255, .05)'
			: 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

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

	const [expanded, setExpanded] = useState(notes);

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

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
				<Accordion key={note._id} expanded={expanded === note._id} onChange={handleChange(note._id)}>
					<AccordionSummary id={note._id}>
						<Typography
							component="header"
							sx={{ alignSelf: 'center', flexGrow: 1 }}
						>
							{note.title}
						</Typography>
						<ButtonGroup>
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
