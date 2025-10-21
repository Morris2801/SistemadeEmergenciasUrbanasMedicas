import * as React from 'react';
import { AppBar, CustomRoutes, Admin, DataProvider } from 'react-admin';
import { Box, useMediaQuery, IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import ManualUsuario from './ManualUsuario';
import logoHorizontal from "./assets/logo-horizontal-blanco.png";

const CustomAppBar = (props) => {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery<Theme>((theme) => theme.breakpoints.between('sm', 'md'));

    const navigate = useNavigate();

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppBar
            sx={{
                height: isSmall ? '12%' : isMedium ? '10%' : '8%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                padding: isSmall ? '8px' : '16px',
            }}
            {...props}
        >
            {/* Logo horizontal */}
            <Box
                component="img"
                src={logoHorizontal}
                alt="Logo Cuajimalpa"
                sx={{
                    height: isSmall ? 30 : isMedium ? 40 : 50, 
                    width: 'auto',
                    ml: 2,
                    flexShrink: 0,
                }}
            />

            {/* Espacio vacío flexible, modificable */}
            <Box sx={{
                flexGrow: 1,   // empuja el reloj a la derecha
                minWidth: isSmall ? 16 : 32, // puedes ajustar el tamaño mínimo
            }} />

            {/* Reloj */}
            <Box sx={{ mr: 2 }}>
                <Box
                    sx={{
                        fontSize: isSmall ? '1rem' : '1.2rem',
                        color: '#ffffff',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                </Box>
            </Box>

            <Tooltip title="Manual de Usuario">
          <IconButton
            color="inherit"
            onClick={() => navigate('/manual')}
            sx={{
              backgroundColor: '#1976d2',
              color: '#fff',
              '&:hover': { backgroundColor: '#1565c0' },
              borderRadius: '10px',
              p: '6px',
            }}
          >
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
        </AppBar>
    );
};

export default CustomAppBar;
