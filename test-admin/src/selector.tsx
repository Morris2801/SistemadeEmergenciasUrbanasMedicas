import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography } from '@mui/material';

const Selector = () => {
    const navigate = useNavigate();

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
            <Typography variant="h4" gutterBottom>
                Selecciona el tipo de atención
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/medicForm/create')} style={{ margin: '10px' }}>
                Atención Prehospitalaria
            </Button>
            <Button variant="contained" color="secondary" onClick={() => navigate('/urban-form')} style={{ margin: '10px' }}>
                Emergencia Urbana
            </Button>
        </Box>
    );
};

export default Selector;
