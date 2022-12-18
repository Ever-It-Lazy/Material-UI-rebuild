import { useEffect } from 'react';
import { Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const userInfo = localStorage.getItem('userInfo');

		if (userInfo) {
			navigate("/mynotes");
		}
	}, [navigate]);

	return (
		<div className='main'>
			<Container>
					<div className="intro-text">
						<div>
							<h1 className="title">Welcome to Note Zipper</h1>
							<p className="subtitle">One Safe place for all your notes.</p>
							<div className="buttonContainer">
								<Button
									href="/login"
									size="large"
									className="landingbutton"
								>
									Login
								</Button>
								<Button
									href="/register"
									size="large"
									className="landingbutton"
									color="inherit"
								>
									Signup
								</Button>
							</div>
						</div>
					</div>
			</Container>
		</div>
	)
}

export default LandingPage;
