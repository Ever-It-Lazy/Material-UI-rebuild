import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	Menu,
	MenuItem
} from '@mui/material';

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
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Note Zipper
					</Typography>

					{userInfo ? (
						<>
							<Button color="inherit" href="/mynotes">My Notes</Button>
							<Button color="inherit" onClick={handleMenu}>{userInfo.name}</Button>
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
								<MenuItem href="/profile">My Profile</MenuItem>
								{/* <NavDropdown.Divider /> */}
								<MenuItem onClick={logoutHandler}>Logout</MenuItem>
							</Menu>
						</>
					) : (
						<Button color="inherit" href="/login">Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

export default Header;
