import React from 'react';
import {
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Divider,
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FireTruckIcon from '@mui/icons-material/FireTruck';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SelectorUIProps {
  onNavigate: (path: string) => void;
}

const SelectorUI: React.FC<SelectorUIProps> = ({ onNavigate }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          width: '100%',
          maxWidth: 500,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Selecciona el tipo de atención
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3} direction="column">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<LocalHospitalIcon />}
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => onNavigate('/medicForm/create')}
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
            >
              Atención Prehospitalaria
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              size="large"
              startIcon={<FireTruckIcon />}
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => onNavigate('/urbanForm/create')}
              sx={{ borderRadius: 3, py: 1.5, fontWeight: 600 }}
            >
              Emergencia Urbana
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SelectorUI;
