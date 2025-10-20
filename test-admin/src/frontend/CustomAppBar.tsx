import * as React from 'react';
import { AppBar } from 'react-admin';
import { Box, Typography, useMediaQuery, Theme } from '@mui/material';

const CustomAppBar = (props) => {
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
    const isMedium = useMediaQuery<Theme>((theme) => theme.breakpoints.between('sm', 'md'));

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
                background: 'linear-gradient(90deg, #0d47a1 0%, #1565c0 100%)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
            }}
            {...props}
        >
            <Typography
                component="h1"
                aria-label="Barra superior de Protección Civil Cuajimalpa"
                sx={{
                    flexGrow: 1,
                    ml: 2,
                    letterSpacing: isSmall ? '0.1em' : '0.2em', 
                    fontWeight: '700',
                    fontSize: isSmall ? '1rem' : isMedium ? '1.2rem' : '1.5rem', 
                    color: '#ffff',
                    marginRight: '120px',
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
                        marginRight: '240px'
                    }}
                >
                    {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                </Typography>
            </Box>
        </AppBar>
    );
};

export default CustomAppBar;