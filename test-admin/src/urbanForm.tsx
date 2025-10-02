import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const UrbanForm = () => {
    const navigate = useNavigate();

    return (
        <Box p={4}>
            <Button variant="outlined" color="secondary" onClick={() => navigate('../../selector')} sx={{ mb: 3 }}>
                ← Volver
            </Button>
            <Typography variant="h5">Formulario Emergencia Urbana</Typography>
            <p>A Amilka le dio flojera poner su parte aquí</p>
        </Box>
    );
};

export default UrbanForm;
