import { createTheme } from '@mui/material/styles';
import { defaultTheme } from 'react-admin';

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#0d47a1', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1565c0', 
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9f9f9', 
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#212121',
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
          fontSize: '1.1rem',
          justifyContent: 'flex-start',
          padding: '8px 16px',
          border: '1px solid #1976d2',
          borderRadius: '8px',
          color: '#ffffff',
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#115293',
            borderColor: '#0d47a1',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#000000',
          fontSize: '1.1rem',
          fontWeight: 500,
          borderRadius: '6px',
          margin: '4px 0',
          padding: '8px 16px',
          '&:hover': {
            backgroundColor: '#e3f2fd',
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
      contrastText: '#000000',
    },
    secondary: {
      main: '#8fa0f4',
      contrastText: '#000000',
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
      secondary: '#7480a0ff',
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
          textTransform: 'none',
          fontSize: '1.1rem',
          justifyContent: 'flex-start',
          padding: '8px 16px',
          border: '1px solid #90caf9',
          borderRadius: '8px',
          color: '#000000',
          backgroundColor: '#90caf9',
          '&:hover': {
            backgroundColor: '#64b5f6',
            borderColor: '#42a5f5',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          fontSize: '1.1rem',
          fontWeight: 500,
          borderRadius: '6px',
          margin: '4px 0',
          padding: '8px 16px',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: '#2c2c2c',
            color: '#ffffff',
          },
        },
      },
    },
  },
});
