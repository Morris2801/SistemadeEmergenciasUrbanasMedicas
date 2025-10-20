import { createTheme } from '@mui/material/styles';
import { defaultTheme } from 'react-admin';

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#0d47a1',
      dark: '#0b3c8c',
      light: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#111111',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.9rem',
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
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#1f1f1f',
          boxShadow: '0 2px 6px rgba(255,255,255,0.05)',
        },
      },
    },
    MuiChip: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        fontSize: '0.9rem',
        color: '#e0e0e0',
        backgroundColor: '#2c2c2c',
        '&:hover': {
          backgroundColor: '#424242',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '8px',
        fontSize: '1.1rem',
        padding: '8px 16px',
        textTransform: 'none',
        border: '1px solid #90caf9',
        backgroundColor: '#1565c0',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#0d47a1',
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