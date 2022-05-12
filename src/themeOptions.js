import { createTheme } from "@mui/material"; 

export const themeOptions = createTheme({
    palette: {
        text: {
            primary: '#FFFFFF',
            secondary: '#FFFFFF',
            black: '#000000',
        },
        action: {
            disabled: 'lightgray',
            disabledBackground: 'gray',
        }
    }
});