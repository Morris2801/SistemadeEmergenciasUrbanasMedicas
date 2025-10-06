import * as React from 'react';
import { AppBar } from 'react-admin';
import { Box, Typography } from '@mui/material';

const CustomAppBar = (props) => {
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AppBar sx = {{ height: "7%", justifyContent: "space-between" }} {...props}>
            <Typography sx={{ flexGrow: 1, ml: 2, letterSpacing: "0.2em", fontWeight: "700", fontSize: "2rem", color: "#ffff" }}>
                Protección Civil - Cuajimalpa de Morelos
            </Typography>

            <Box sx={{ mr: 2}}>
                <Typography sx={{fontSize: "1.2rem", color: "#ffff"}}>
                    {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
                </Typography>
            </Box>
        </AppBar>
    );
};

export default CustomAppBar;