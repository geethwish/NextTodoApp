import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#282959',
        },
        error: {
            main: red.A400,
        },
        light0: {
            main: '#ffffff'
        },
        light1: {
            main: '#f9fafc'
        },
        light2: {
            main: '#eceff5'
        },
        dark0: {
            main: '#000000'
        },
        dark1: {
            main: '#140f26'
        },
        dark2: {
            main: '#4b475a'
        },
        dark2: {
            main: '#8d96a4'
        }
    },
});

export default theme;
