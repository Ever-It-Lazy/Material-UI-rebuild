import React, { useEffect, useState } from 'react';
import { Button, Box, FormControl, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import "./RegisterScreen.css";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';

const RegisterScreen = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [pic, setPic] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");
	const [picMessage, setPicMessage] = useState("");

	const dispatch = useDispatch();
	const userRegister = useSelector(state => state.userRegister);
	const { loading, error, userInfo } = userRegister;
	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) {
			navigate("/mynotes");
		}
	}, [navigate, userInfo]);


	const submitHandler = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			setMessage("");
			dispatch(register({ name, pic, email, password }));
		}
	};

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage("Please select an image");
		}
		setPicMessage(null);

		if (pics.type === "image/png" || pics.type === "image/jpeg") {
			const data = new FormData();
			data.append('file', pics);
			data.append('upload_preset', 'notezipper');
			data.append('cloud_name', 'dnymu8b28');
			fetch('https://api.cloudinary.com/v1_1/dnymu8b28/image/upload', {
				method: 'post',
				body: data
			})
				.then((res) => res.json())
				.then((data) => {
					setPic(data.url.toString());
				})
				.catch((err) => {
					console.log(err);
				});

		} else {
			return setPicMessage("Please select an image");
		}
	};

	return (
		<>
			<MainScreen title="Sign Up" />
			<div className='registerContainer'>
				{error && <ErrorMessage severity="error">{error}</ErrorMessage>}
				{message && <ErrorMessage severity="error">{message}</ErrorMessage>}
				{loading && <Loading />}
				<Box component="form" onSubmit={submitHandler}>
					<FormControl>
						<TextField
							label="Name"
							type="name"
							value={name}
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</FormControl>

					<FormControl>
						<TextField
							label="Email Address"
							id="formBasicEmail"
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</FormControl>

					<FormControl>
						<TextField
							label="Password"
							id="formBasicPassword"
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</FormControl>

					<FormControl>
						<TextField
							label="Confirm Password"
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</FormControl>

					{picMessage &&
						<ErrorMessage severity="error">{picMessage}</ErrorMessage>
					}

					<FormControl>
						<TextField
							id="pic"
							type="file"
							onChange={(e) => postDetails(e.target.files[0])}
						/>
					</FormControl>

					<Button type="submit">
						Register
					</Button>
				</Box>
				<Box>
					Have an Account ? <Link to="/login">Login</Link>
				</Box>
			</div>
		</>
	)
}

export default RegisterScreen;
