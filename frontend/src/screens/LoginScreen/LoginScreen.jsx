import React, { useEffect, useState } from 'react';
import { Button, Box, FormControl, InputLabel, OutlinedInput, FormHelperText } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MainScreen from '../../components/MainScreen';
import "./LoginScreen.css";
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LoginScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;
	const navigate = useNavigate();

	useEffect(() => {

		if (userInfo) {
			navigate('/mynotes');
		}
	}, [navigate,userInfo]);


	const submitHandler =  (e) => {
		e.preventDefault();

		dispatch(login(email, password));
	};

	return (
		<>
			<MainScreen title="Login" />
			<div className='loginContainer'>
				{error && <ErrorMessage severity="error">{error}</ErrorMessage>}
				{loading && <Loading />}
				<Box component="form" onSubmit={submitHandler}>

					<FormControl fullWidth={true}>
						<InputLabel htmlFor="formBasicEmail">Email address</InputLabel>
						<OutlinedInput
							id="formBasicEmail"
							type="email"
							value={email}
							placeholder="Enter email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<FormHelperText>
							We'll never share your email with anyone else.
						</FormHelperText>
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

					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Box>
				<Box className="py-3">
					New Customer ? <Link to="/register">Register Here</Link>
				</Box>
			</div>
		</>
	)
}

export default LoginScreen
