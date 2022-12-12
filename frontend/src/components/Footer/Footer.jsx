import { Container } from '@mui/material';

const Footer = () => {
	return (
		<footer
			style={{
				width: "100%",
				position: "relative",
				bottom: 0,
				display: "flex",
				justifyContent: "center",
			}}>
			<Container>
				<div className="text-center py-3">Copyright &copy; Note Zipper</div>
			</Container>
		</footer>
	)
};

export default Footer;
