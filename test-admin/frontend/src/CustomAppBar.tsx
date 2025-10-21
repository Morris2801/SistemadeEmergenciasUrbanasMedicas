import * as React from 'react';
import { AppBar, CustomRoutes, Admin, DataProvider } from 'react-admin';
import { Box, Typography, useMediaQuery, IconButton, Tooltip } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router-dom';
import ManualUsuario from './ManualUsuario';

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
            <Typography
                sx={{
                    flexGrow: 1,
                    ml: 2,
                    letterSpacing: isSmall ? '0.1em' : '0.2em', 
                    fontWeight: '700',
                    fontSize: isSmall ? '0.8rem' : isMedium ? '1.0rem' : '1.5rem', 
                    color: '#ffff',
                    marginRight: '10px',
                    fontFamily: 'Roboto, sans-serif'
                }}
            >
                Protección Civil - Cuajimalpa de Morelos
            </Typography>

            <Box sx={{ mr: 2 }}>
                <Typography
                    sx={{
                        fontSize: isSmall ? '1rem' : '1.2rem', 
                        color: '#ffff',
                        marginRight: '10px'
                    }}
                >
                    {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                </Typography>
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