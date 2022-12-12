import React, { useEffect, useState } from 'react';
import { Button, Box, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
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
			dispatch(register(name, pic, email, password));
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
					<FormControl fullWidth={true} controlId="name">
						<InputLabel>Name</InputLabel>
						<OutlinedInput
							type="name"
							value={name}
							placeholder="Enter name"
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>

					<FormControl fullWidth={true}>
						<InputLabel htmlFor="formBasicEmail">Email address</InputLabel>
						<OutlinedInput
							id="formBasicEmail"
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>

					<FormControl fullWidth={true}>
						<InputLabel htmlFor="formBasicPassword">Password</InputLabel>
						<OutlinedInput
							id="formBasicPassword"
							type="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>

					<FormControl fullWidth={true}>
						<InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
						<OutlinedInput
							id="confirmPassword"
							type="password"
							value={confirmPassword}
							placeholder="Confirm Password"
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</FormControl>

					{picMessage &&
						<ErrorMessage severity="error">{picMessage}</ErrorMessage>
					}

					<FormControl fullWidth={true}>
						<InputLabel htmlFor="pic">Profile Picture</InputLabel>
						<OutlinedInput
							id="pic"
							type="file"
							label="Upload Profile Picture"
							onChange={(e) => postDetails(e.target.files[0])}
						/>
					</FormControl>

					<Button variant="primary" type="submit">
						Register
					</Button>
				</Box>
				<Box className="py-3">
					Have an Account ? <Link to="/login">Login</Link>
				</Box>
			</div>
		</>
	)
}

export default RegisterScreen;
