import React, { useEffect, useState } from 'react'
import {
	Button,
	Box,
	FormControl,
	TextField,
	Card, CardHeader, CardContent
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import ReactMarkdown from "react-markdown";
import { deleteNoteAction, updateNoteAction } from '../../actions/noteActions';
import axios from 'axios';

const SingleNote = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [date, setDate] = useState("");

	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();

	const noteUpdate = useSelector((state) => state.noteUpdate);
	const { loading, error } = noteUpdate;

	const noteDelete = useSelector((state) => state.noteDelete);
	const { loading: loadingDelete, error: errorDelete } = noteDelete;

	const updateHandler = (e) => {
		e.preventDefault();
		dispatch(updateNoteAction(id, title, content, category));
		if (!title || !content || !category) return;

		navigate("/mynotes");
	};

	useEffect(() => {
		const fetching = async () => {
			const { data } = await axios.get(`/api/notes/${id}`);

			setTitle(data.title);
			setContent(data.content);
			setCategory(data.category);
			setDate(data.updatedAt);
		};

		fetching();
	}, [id, date]);

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteNoteAction(id));
			navigate("/mynotes");
		}
	};

	return (
		<MainScreen title="Edit Note">
			<Card>
				<CardHeader title="Edit your note" />
				<CardContent>
					<Box component="form" onSubmit={updateHandler}>
						{errorDelete && <ErrorMessage severity="error">{errorDelete}</ErrorMessage>}
						{loadingDelete && <Loading/>}
						{error && <ErrorMessage severity="error">{error}</ErrorMessage>}

						<FormControl fullWidth={true}>
							<TextField
								label="Title"
								type="title"
								value={title}
								placeholder="Enter the title"
								onChange={(e) => setTitle(e.target.value)}
							/>
						</FormControl>

						<FormControl fullWidth={true}>
							<TextField
								label="Content"
								multiline={true}
								value={content}
								placeholder="Enter the Content"
								rows={4}
								onChange={(e) => setContent(e.target.value)}
							/>
						</FormControl>

						{content && (
							<Card>
								<CardHeader title="Note Preview" />
								<CardContent>
									<ReactMarkdown>{content}</ReactMarkdown>
								</CardContent>
							</Card>
						)}

						<FormControl fullWidth={true}>
							<TextField
								label="Category"
								type="category"
								value={category}
								placeholder="Enter the Category"
								onChange={(e) => setCategory(e.target.value)}
							/>
						</FormControl>

						{loading && <Loading size={50} />}

						<Button type="submit" sx={{ marginRight: "10px" }}>
							Update Note
						</Button>
						<Button color="warning" onClick={() => deleteHandler(id)}>
							Delete Note
						</Button>
					</Box>
				</CardContent>

				<footer>
					Updated on - {date.substring(0, 10)}
				</footer>
			</Card>
		</MainScreen>
	)
}

export default SingleNote;
