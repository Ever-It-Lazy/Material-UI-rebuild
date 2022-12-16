import { Container, Typography } from '@mui/material';

const Footer = () => {
	return (
		<Container component="footer" sx={{
			display: "flex",
			justifyContent: "center"
		}}>
			<Typography variant="caption">Copyright &copy; Note Zipper</Typography>
		</Container>
	)
};

export default Footer;
