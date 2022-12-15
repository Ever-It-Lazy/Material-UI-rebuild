import React, { useEffect, useState } from 'react'
import { Button, Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../actions/userActions';
import Loading from '../../components/Loading';
import "./ProfileScreen.css";

const ProfileScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pic, setPic] = useState();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [picMessage, setPicMessage] = useState("");

	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdate = useSelector((state) => state.userUpdate);
	const { loading, error, success } = userUpdate;

	const navigate = useNavigate();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
			setPic(userInfo.pic);
		} else {
			navigate("/");
		}
	}, [userInfo, navigate]);


	const submitHandler = async (e) => {
		e.preventDefault();

		if (password === confirmPassword) {
			dispatch(updateProfile({ name, pic, email, password }));
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
		<MainScreen title="Edit Profile">
			<div className="profileContainer">
				<>
					<>
						<Box component="form" onSubmit={submitHandler}>
							{loading && <Loading />}
							{success && (
								<ErrorMessage severity="success">
									Updated Successfully
								</ErrorMessage>
							)}
							{error && <ErrorMessage severity="error">{error}</ErrorMessage>}

							<FormControl fullWidth={true}>
								<InputLabel htmlFor="name">Name</InputLabel>
								<OutlinedInput
									id="name"
									type="text"
									placeholder="Enter Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</FormControl>

							<FormControl fullWidth={true}>
								<InputLabel htmlFor="email">Email Address</InputLabel>
								<OutlinedInput
									id="email"
									type="email"
									placeholder="Enter Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</FormControl>

							<FormControl fullWidth={true}>
								<InputLabel htmlFor="password">Password</InputLabel>
								<OutlinedInput
									id="password"
									type="password"
									placeholder="Enter Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</FormControl>

							<FormControl fullWidth={true}>
								<InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
								<OutlinedInput
									id="confirmPassword"
									type="password"
									placeholder="Confirm Password"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
							</FormControl>

							{picMessage && (
								<ErrorMessage severity="error">{picMessage}</ErrorMessage>
							)}

							<FormControl fullWidth={true}>
								<InputLabel htmlFor="pic">Confirm Profile Picture</InputLabel>
								<OutlinedInput
									id="pic"
									type="file"
									label="Upload Profile Picture"
									onChange={(e) => postDetails(e.target.files[0])}
								/>
							</FormControl>

							<Button variant="primary" type="submit">
								Update
							</Button>
						</Box>
					</>
					<Box
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						}}
					>
						<img src={pic} alt={name} style={{width: '20vw'}} className="profilePic" />
					</Box>
				</>
			</div>
		</MainScreen>
	)
}

export default ProfileScreen;
