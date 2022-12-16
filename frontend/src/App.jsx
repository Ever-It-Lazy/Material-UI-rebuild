import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import {
	BrowserRouter,
	Route,
	Routes
} from 'react-router-dom';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import CreateNote from './screens/CreateNote/CreateNote';
import SingleNote from './screens/SingleNote/SingleNote';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
	components: {
		MuiButton: {
			defaultProps: {
				variant: 'contained'
			}
		},
		MuiButtonGroup: {
			defaultProps: {
				variant: 'contained'
			}
		},
	}
});

const App = () => {
	const [search, setSearch] = useState("");

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header setSearch={setSearch} />
				<main>
					<Routes>
						<Route path="/" element={<LandingPage />} exact />
						<Route path="/login" element={<LoginScreen />} />
						<Route path="/register" element={<RegisterScreen />} />
						<Route path="/createnote" element={<CreateNote />} />
						<Route path="/note/:id" element={<SingleNote />} />
						<Route path="/mynotes" element={<MyNotes search={search} />} />
						<Route path="/profile" element={<ProfileScreen />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</ThemeProvider>
	)
};

export default App;
