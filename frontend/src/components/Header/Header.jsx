import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Menu,
	MenuItem,
	InputBase
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { logout } from "../../actions/userActions";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
			width: '20ch',
			},
		},
	},
}));

const Header = ({ setSearch }) => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const logoutHandler = () => {
		dispatch(logout());
		navigate("/");
	}

	useEffect(() => {
		console.log(location)
	}, [userInfo]);

	return (
			<AppBar position="static">
				<Toolbar>
					<Typography
						component="h1"
						sx={{
							flexGrow: 1,
							cursor: "pointer"
						}}
						onClick={() => navigate("/")}
					>
						Note Zipper
					</Typography>

					{userInfo && location.pathname == '/mynotes' && (
						<Search sx={{ }}>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								onChange={(e) => setSearch(e.target.value)}
							/>
						</Search>
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
								<ArrowDropDownIcon/>
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
						<Button
							variant="text" color="inherit"
							href="/login"
							sx={{ textTransform: 'none' }}
						>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
	);
}

export default Header;
