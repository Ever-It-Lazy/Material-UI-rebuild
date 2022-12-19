import { createTheme } from '@mui/material';

export const defaultTheme = createTheme({
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
		MuiTextField: {
			defaultProps: {
				variant: 'outlined',
				sx: {
					marginTop: '10px',
					marginBottom: '10px'
				}
			}
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: {
					variant: 'p'
				},
				margin: 0
			}
		},
		MuiFormControl: {
			defaultProps: {
				fullWidth: true
			}
		}
	}
});