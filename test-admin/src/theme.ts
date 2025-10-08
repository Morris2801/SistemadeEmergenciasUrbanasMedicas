// theme.tsx
import { createTheme } from '@mui/material/styles';
import { defaultTheme } from 'react-admin';

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#c1c7e4ff',
    },
    secondary: {
      main: '#244bf7d1',
      contrastText: '#c1c7e4ff',
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
          border: '1px solid #c4c4c4',
          borderRadius: '12px',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#e3f2fd',
            borderColor: '#1976d2',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#212121',
          fontSize: '1.2rem',
          fontWeight: 500,
          border: '1px solid #c4c4c4',
          borderRadius: '8px',
          margin: '4px 0',
          padding: '8px 16px',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#e3f2fd',
            borderColor: '#1976d2',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      contrastText: '#000',
    },
    secondary: {
      main: '#8fa0f4ff',
      contrastText: '#000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    error: {
      main: '#f44336',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#ffffff',
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
          color: "#ffffff",
          textTransform: 'none',
          fontSize: '1.2rem',
          justifyContent: 'flex-start',
          padding: '8px 16px',
          border: '1px solid #444444',
          borderRadius: '12px',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#333333',
            borderColor: '#90caf9',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          backgroundColor: "#333333",
          fontSize: '1.2rem',
          fontWeight: 500,
          border: '1px solid #444444',
          borderRadius: '8px',
          margin: '4px 0',
          padding: '8px 16px',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          '&:hover': {
            backgroundColor: '#656565ff',
            color: "#000000",
            borderColor: '#90caf9',
          },
        },
      },
    },
  },
});