// src/UrbanFormImproved.tsx
import {
  SimpleForm,
  TextInput,
  DateTimeInput,
  SelectInput,
  NumberInput,
  FileInput,
  ImageField,
  required,
} from 'react-admin';
import { Grid, Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const UrbanFormImproved = () => {
  const navigate = useNavigate();

  return (
    <SimpleForm>
      <Box mb={2}>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/selector')}>
          ← Volver
        </Button>
      </Box>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información General
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput source="folio" label="Folio" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimeInput source="fecha_hora" label="Día, fecha y hora" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="turno"
              label="Turno"
              validate={required()}
              choices={[
                { id: 'matutino', name: 'Matutino' },
                { id: 'vespertino', name: 'Vespertino' },
                { id: 'nocturno', name: 'Nocturno' },
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="personal_a_cargo" label="Nombre del personal a cargo" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="modo_activacion"
              label="Modo de activación"
              validate={required()}
              choices={[
                { id: 'llamada', name: 'Llamada de emergencia' },
                { id: 'oficio', name: 'Seguimiento de oficio' },
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="tipo_servicio" label="Tipo de servicio al que se acude" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimeInput source="fecha_atencion" label="Fecha y hora de atención" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput source="tiempo_traslado" label="Tiempo de traslado" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="ubicacion" label="Ubicación (GPS o dirección/mapa)" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="gravedad"
              label="Gravedad de la emergencia"
              validate={required()}
              choices={[
                { id: 'baja', name: 'Baja' },
                { id: 'media', name: 'Media' },
                { id: 'alta', name: 'Alta' },
              ]}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput source="km_recorridos" label="Kilómetros recorridos" fullWidth />
          </Grid>
        </Grid>
      </Paper>

      <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Detalles de la Emergencia
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput source="trabajos_realizados" label="Trabajos realizados" multiline fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="observaciones" label="Observaciones" multiline fullWidth />
          </Grid>
          <Grid item xs={12}>
            <FileInput source="fotos" label="Fotografías" accept="image/*" multiple>
              <ImageField source="src" title="Fotografía" />
            </FileInput>
          </Grid>
          <Grid item xs={12}>
            <TextInput source="conclusion" label="Conclusión / Dictamen" multiline fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="responsables" label="Responsables de la emergencia" multiline fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextInput source="autoridades_participantes" label="Autoridades o dependencias participantes" multiline fullWidth />
          </Grid>
        </Grid>
      </Paper>
    </SimpleForm>
  );
};
