import { createTheme } from '@mui/material/styles';
import { defaultTheme } from 'react-admin';

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#0078D4',        // azul principal (header, botones importantes)
      contrastText: '#ffffff', 
    },
    secondary: {
      main: '#1B2845',        // azul oscuro (menu, hover)
      contrastText: '#ffffff',
    },
    warning: {
      main: '#EEA243',        // amarillo para botones resaltantes
      contrastText: '#000000',
    },
    background: {
      default: '#f2f2f2',     // gris claro para fondos
      paper: '#ffffff',        // blanco para cards, paneles, ventanas
    },
    error: {
      main: '#d32f2f',
    },
    text: {
      primary: '#000000',      // negro para textos normales
      secondary: '#333333',    // charcoal para secundarios
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
    // --- botones ---
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
          borderRadius: '8px',
        },
        containedPrimary: {
          color: '#ffffff',
          backgroundColor: '#0078D4',
          border: '1px solid #0078D4',
          '&:hover': {
            backgroundColor: '#005A9E',
            borderColor: '#004C87',
          },
        },
        containedSecondary: {
          color: '#ffffff',
          backgroundColor: '#1B2845',
          border: '1px solid #1B2845',
          '&:hover': {
            backgroundColor: '#151F36',
          },
        },
        containedWarning: {
          color: '#000000',
          backgroundColor: '#EEA243',
          border: '1px solid #EEA243',
          '&:hover': {
            backgroundColor: '#D99130',
          },
        },
      },
    },

    // --- menu desplegable ---
  MuiMenuItem: {
    styleOverrides: {
      root: {
        fontSize: '1.1rem',
        fontWeight: 500,
        borderRadius: '6px',
        margin: '4px 0',
        padding: '8px 16px',
        backgroundColor: '#0078D4', // mismo color que botones
        color: '#ffffff',           // texto blanco por defecto
        display: 'flex',
        alignItems: 'center',
        gap: '8px',

        // hover destacado: gris claro o ligeramente más claro que azul
        '&:hover': {
          backgroundColor: '#3399FF', // azul más claro que contraste con el fondo
          color: '#1B2845',           // texto azul oscuro al hover
          '& .MuiSvgIcon-root': { color: '#1B2845' }, // iconos también azul oscuro
        },

        // opción seleccionada / activa
        '&.Mui-selected, &.RaMenuItemLink-active': {
          backgroundColor: '#EEA243', // fondo amarillo para seleccionado
          color: '#1B2845',           // texto azul oscuro
          '& .MuiListItemText-root, & .MuiTypography-root': {
            color: '#1B2845',
          },
          '& .MuiListItemIcon-root, & .MuiSvgIcon-root': {
            color: '#1B2845',
          },
        },
      },
    },
  },


    // --- header ---
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0078D4', // azul principal como en el login
          color: '#ffffff',           // textos blancos
        },
      },
    },

    // --- textfields ---
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#1b1b1b', // texto ingresado negro/charcoal
          },
          '& .MuiInputLabel-root': {
            color: '#1b1b1b', // label negro
          },
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#ffffff',
            '& fieldset': { borderColor: '#0078D4' },
            '&:hover fieldset': { borderColor: '#1B2845' },
            '&.Mui-focused fieldset': { borderColor: '#0078D4' },
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
          fontSize: '1.1rem',
          fontWeight: 500,
          borderRadius: '6px',
          margin: '4px 0',
          padding: '8px 16px',
          backgroundColor: '#1B2845', // fondo gris oscuro del menú
          color: '#ffffff', // texto blanco por defecto
          display: 'flex',
          alignItems: 'center',
          gap: '8px',

          '&:hover': {
            backgroundColor: '#2c2c2c', // hover: gris intermedio (no muy claro)
            color: '#ffffff',
            '& .MuiSvgIcon-root': {
              color: '#ffffff',
            },
          },

          // estado seleccionado / activo: fondo blanco, texto e íconos azul oscuro
          '&.Mui-selected, &.RaMenuItemLink-active': {
            backgroundColor: '#ffffff', // fondo blanco al seleccionar
            color: '#1B2845', // texto azul oscuro sobre blanco
            '& .MuiListItemText-root, & .MuiTypography-root': {
              color: '#1B2845',
            },
            '& .MuiListItemIcon-root, & .MuiSvgIcon-root': {
              color: '#1B2845',
            },
          },
        },
      },
    },

  },
});
