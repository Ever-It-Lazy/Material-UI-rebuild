import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	Menu,
	MenuItem,
	OutlinedInput
} from '@mui/material';
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/");
	}

	useEffect(() => {}, [userInfo]);

	return (
			<AppBar position="static">
				<Toolbar>
					<Typography
						component="h1"
						sx={{ flexGrow: 1 }}
						onClick={() => navigate("/")}
					>
						Note Zipper
					</Typography>

					{userInfo && (
						<Box component="form" sx={{ flexGrow: 1 }}>
							<OutlinedInput
								type="text"
								sx={{ background: 'white' }}
								placeholder="Search"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</Box>
					)}

					{userInfo ? (
						<>
							<Button
								variant="text" color="inherit"
								href="/mynotes"
								sx={{ textTransform: 'none' }}
							>My Notes</Button>
							<Button
								variant="text" color="inherit"
								onClick={handleMenu}
								sx={{ textTransform: 'none' }}
							>
								{userInfo.name}
							</Button>
							<Menu 
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem component="a" href="/profile" divider={true}>
									<img
										alt=""
										src={`${userInfo.pic}`}
										width="25"
										height="25"
										style={{ marginRight: 10 }}
									/>
									My Profile
								</MenuItem>
								<MenuItem onClick={logoutHandler}>Logout</MenuItem>
							</Menu>
						</>
					) : (
						<Button color="inherit" href="/login">Login</Button>
					)}
				</Toolbar>
			</AppBar>
	);
}

export default Header;
