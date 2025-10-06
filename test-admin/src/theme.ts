// theme.tsx
import { createTheme } from '@mui/material/styles';
import { defaultTheme } from 'react-admin';

const myTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#244bf7d1',
      contrastText: '#fff',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    text: {
      primary: '#212121',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#333333',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          margin: '4px 0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.2rem',
          justifyContent: 'flex-start',
          padding: '8px 16px',
          border: '1px solid #c4c4c4', // Light border for buttons
          borderRadius: '12px', // Rounded corners
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#e3f2fd', // Light blue hover effect
            borderColor: '#1976d2', // Match primary color on hover
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#212121', // Dark text color for menu items
          fontSize: '1.2rem', // Slightly smaller font size for sidebar buttons
          fontWeight: 500, // Medium weight for better readability
          border: '1px solid #c4c4c4', // Light border for menu items
          borderRadius: '8px', // Rounded corners
          margin: '4px 0', // Spacing between menu items
          padding: '8px 16px', // Padding inside menu items
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#e3f2fd', // Light blue hover effect
            borderColor: '#1976d2', // Match primary color on hover
          },
        },
      },
    },
  },
});

export default myTheme;
