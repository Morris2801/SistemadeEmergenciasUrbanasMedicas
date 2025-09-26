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
    h6: {
      fontWeight: 700,
      fontSize: '1.3rem',
      letterSpacing: '0.02em',
      color: '#1976d2',
    },
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
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: '12px 14px', 
          minHeight: '48px', 
          fontSize: '1rem',
          borderRadius: 6,
          backgroundColor: '#fafafa',
          border: '1px solid #c4c4c4',
          transition: 'border-color 0.3s ease',
          '&:hover': {
            borderColor: '#1976d2',
            backgroundColor: '#fff',
          },
          '&.Mui-focused': {
            borderColor: '#1976d2',
            backgroundColor: '#fff',
            boxShadow: '0 0 5px rgba(25, 118, 210, 0.3)',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '1.5rem', 
          width: '100%',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
          '&.Mui-expanded': {
            marginBottom: '1.5rem',
          },
          '&::before': {
            display: 'none', 
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: '#e3f2fd', 
          borderRadius: '8px 8px 0 0',
          minHeight: 48,
          '&.Mui-expanded': {
            minHeight: 48,
          },
        },
        content: {
          '&.Mui-expanded': {
            margin: '12px 0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          backgroundColor: '#fff',
          borderRadius: '0 0 8px 8px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 20px',
          fontWeight: 600,
          fontSize: '1rem',
          textTransform: 'none',
        },
      },
    },
  },
});

export default myTheme;
