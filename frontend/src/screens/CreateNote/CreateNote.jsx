import React, { useState } from 'react'
import {
	Button,
	Box,
	FormControl,
	TextField,
	Card, CardHeader, CardContent
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import ReactMarkdown from "react-markdown";
import { createNoteAction } from '../../actions/noteActions';

const CreateNote = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const noteCreate = useSelector((state) => state.noteCreate);
	const { loading, error } = noteCreate;

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createNoteAction(title, content, category));
		if (!title || !content || !category) return;

		navigate("/mynotes");
	};

	const resetHandler = () => {
		setTitle("");
		setCategory("");
		setContent("");
	};

	return (
		<MainScreen title="Create a Note">
			<Card>
				<CardHeader title="Create a new Note"></CardHeader>
				<CardContent>
					<Box component="form" onSubmit={submitHandler}>
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
								<CardHeader>Note Preview</CardHeader>
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

						<Button type="submit">
							Create Note
						</Button>
						<Button color="warning" onClick={resetHandler}>
							Reset Fields
						</Button>
					</Box>
				</CardContent>

				<footer>
					Creating on - {new Date().toLocaleDateString()}
				</footer>
			</Card>
		</MainScreen>
	)
}

export default CreateNote;
