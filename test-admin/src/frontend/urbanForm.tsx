// src/urbanForm.tsx
import {
  Create,
  List,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  Show,
  Edit,
  SimpleForm,
  TextInput,
  DateTimeInput,
  SelectInput,
  NumberInput,
  FileInput,
  ImageField,
  useRecordContext,
  required,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery, Theme, Paper, Typography, Grid, Box } from '@mui/material';

const turnoChoices = [
    { id: 'L-V_8-3', name: 'Lunes a Viernes - 8am a 3pm' },
    { id: 'L-V_3-9', name: 'Lunes a Viernes - 3pm a 9pm' },
    { id: 'L-Mi-V_9-8', name: 'Lunes, Miércoles y Viernes - 9pm a 8am' },
    { id: 'Ma-Ju-Do_9-8', name: 'Martes, Jueves y Domingo - 9pm a 8am' },
    { id: 'Sa-Do-F_8-8', name: 'Sábado, Domingo y festivos - 8am a 8pm' },
    { id: 'Sa-Do-F_8p-8a', name: 'Sábado, Domingo y festivos - 8pm a 8am' },
];


const UrbanFormImproved = () => {
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
          <Grid item xs={12} md={6}>
              <SelectInput
                source="turno"
                label="Turno"
                choices={turnoChoices}
                validate={required()}
                fullWidth
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimeInput source="fecha_hora" label="Día, fecha y hora" validate={required()} fullWidth />
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

const UrbanFormShowImproved = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Información General
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Folio:</strong> {record.folio}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Día, fecha y hora:</strong> {new Date(record.fecha_hora).toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Nombre del personal a cargo:</strong> {record.personal_a_cargo}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Modo de activación:</strong> {record.modo_activacion}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Tipo de servicio:</strong> {record.tipo_servicio}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Fecha y hora de atención:</strong> {new Date(record.fecha_atencion).toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Tiempo de traslado:</strong> {record.tiempo_traslado}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Ubicación (GPS o dirección/mapa):</strong> {record.ubicacion}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Gravedad de la emergencia:</strong> {record.gravedad}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Kilómetros recorridos:</strong> {record.km_recorridos}</Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom mt={4}>
        Detalles de la Emergencia
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography><strong>Trabajos realizados:</strong> {record.trabajos_realizados}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Observaciones:</strong> {record.observaciones}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Fotografías:</strong></Typography>
          {record.fotos && record.fotos.length > 0 ? (
            <Grid container spacing={1}>
              {record.fotos.map((foto: any, index: number) => (
                <Grid item key={index}>
                  <img src={foto.src} alt={`Foto ${index}`} style={{ maxHeight: 150 }} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No hay fotos.</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Conclusión / Dictamen:</strong> {record.conclusion}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Responsables de la emergencia:</strong> {record.responsables}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Autoridades o dependencias participantes:</strong> {record.autoridades_participantes}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export const UrbanFormCreate = () => (
  <Create resource="urbanForm">
    <UrbanFormImproved />
  </Create>
);

export const UrbanFormList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  return (
    <>
      <Box mb={2} sx={{ p: 1 }}>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/selector')}>
          ← Volver 
        </Button>
      </Box>
      <List title="Listado de Formularios Urbanos">
        {isSmall ? (
          <SimpleList
            primaryText={(record) => record.folio}
            secondaryText={(record) => new Date(record.fecha_hora).toLocaleString()}
            tertiaryText={(record) => record.personal_a_cargo}
          />
        ) : (
          <Datagrid>
            <TextField source="folio" label="Folio" />
            <DateField source="fecha_hora" label="Fecha y Hora" />
            <TextField source="turno" label="Turno" />
            <TextField source="personal_a_cargo" label="Personal a Cargo" />
            <TextField source="tipo_servicio" label="Tipo de Servicio" />
            <EditButton />
          </Datagrid>
        )}
      </List>
    </>
  );
};

export const UrbanFormEdit = () => (
  <Edit title="Editar Formulario Urbano">
    <UrbanFormImproved />
  </Edit>
);

export const UrbanFormShow = () => (
  <Show title="Detalles del Formulario Urbano">
    <UrbanFormShowImproved />
  </Show>
);
