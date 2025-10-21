// src/urbanForm.tsx
import React from 'react';
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
  useNotify,
  useRedirect,
  TopToolbar,
  ExportButton,
  defaultExporter,
  DataTable,
  usePermissions,
  DateInput,
  FunctionField
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery, Theme, Paper, Typography, Grid, Box } from '@mui/material';
import { useSaveContent } from "./hooks/useSaveContent"; 
import { useImageInputPreview } from "./hooks/useImageInputPreview";

// Formato completo: YYYY-MM-DD HH:mm
const formatDateTime = (date?: string | Date) => {
  if (!date) return 'Sin fecha';
  const d = new Date(date);
  const isValid = !isNaN(d.getTime());
  if (!isValid) return 'Fecha inválida';

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

const formatDateYMD = (date?: string | Date) => {
  if (!date) return 'Sin fecha';
  const d = new Date(date);
  const isValid = !isNaN(d.getTime());
  if (!isValid) return 'Fecha inválida';

  const yyyy = d.getFullYear();
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const month = monthNames[d.getMonth()];
  const dd = String(d.getDate()).padStart(2, '0');

  return `${yyyy}-${month}-${dd}`;
};

const useUnique = () => {
  const generateUniqueFolio = React.useCallback(() => {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const random = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatorios
    return `URB-${y}${m}${d}-${random}`;
  }, []);

  return React.useMemo(() => generateUniqueFolio(), [generateUniqueFolio]);
};

const turnoChoices = [
    { id: 'Lunes a Viernes - 8am a 3pm', name: 'Lunes a Viernes - 8am a 3pm' },
    { id: 'Lunes a Viernes - 3pm a 9pm', name: 'Lunes a Viernes - 3pm a 9pm' },
    { id: 'Lunes, Miércoles y Viernes - 9pm a 8am', name: 'Lunes, Miércoles y Viernes - 9pm a 8am' },
    { id: 'Martes, Jueves y Domingo - 9pm a 8am' , name: 'Martes, Jueves y Domingo - 9pm a 8am' },
    { id: 'Sábado, Domingo y festivos - 8am a 8pm', name: 'Sábado, Domingo y festivos - 8am a 8pm' },
    { id: 'Sábado, Domingo y festivos - 8pm a 8am', name: 'Sábado, Domingo y festivos - 8pm a 8am' },
];


const FormSaver = () => {
    useSaveContent("urbanFormDraft");
    return null;
};


const UrbanFormImproved = () => {
  const navigate = useNavigate();
  const uniqueFolio = useUnique();

   const { previewUrls, handlePreview } = useImageInputPreview();

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
           <TextInput
              source="folio"
              label="Folio"
              validate={required()}
              fullWidth
              defaultValue={uniqueFolio}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimeInput source="fecha_hora" label="Día, fecha y hora" validate={required()} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              source="turno"
              label="Turno"
              choices={turnoChoices}
              validate={required()}
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
            <FileInput source="fotos" label="Fotografías" accept="image/*" multiple onChange={handlePreview} >
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
      <FormSaver />
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
          <Typography><strong>Día, fecha y hora:</strong> {formatDateYMD(record.fecha_hora)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography><strong>Turno:</strong> {record.turno}</Typography>
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
                  <img src={foto.src} />
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

export const UrbanFormCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect();

  return (
    <Create resource="urbanForm"
      mutationOptions={{
        onSuccess: () => {
          notify('Reporte guardado', { type: 'success' });
          localStorage.removeItem("urbanFormDraft");
          redirect('/selector');
        },
        onError: () => {
          notify('Error al guardar el reporte', { type: 'warning' });
        },
      }}>
      <UrbanFormImproved />
    </Create>
  );
};

const UrbanFormFilters = [
  <TextInput
    key="q"
    label="Buscar por folio o personal"
    source="q"
    alwaysOn
    sx={{ minWidth: 220 }}
  />,
  <SelectInput
    key="turno"
    label="Turno"
    source="turno"
    alwaysOn
    choices={turnoChoices}
    sx={{ minWidth: 180 }}
  />,
  <SelectInput
    key="gravedad"
    label="Gravedad"
    source="gravedad"
    alwaysOn
    choices={[
      { id: "baja", name: "Baja" },
      { id: "media", name: "Media" },
      { id: "alta", name: "Alta" },
    ]}
    sx={{ minWidth: 150 }}
  />,
  <SelectInput
    key="modo_activacion"
    label="Modo de activación"
    source="modo_activacion"
    alwaysOn
    choices={[
      { id: "llamada", name: "Llamada de emergencia" },
      { id: "oficio", name: "Seguimiento de oficio" },
    ]}
    sx={{ minWidth: 180 }}
  />,
  <DateInput
    key="fecha_hora"
    label="Fecha del servicio"
    source="fecha_hora"
    alwaysOn
    sx={{ minWidth: 180 }}
  />,
];

const ListActions = () => (
  <TopToolbar sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
    <ExportButton
      label="Exportar CSV"
      sx={{
        backgroundColor: "#1976d2",
        color: "#fff",
        textTransform: "none",
        fontWeight: 600,
        borderRadius: "6px",
        px: 2,
        "&:hover": { backgroundColor: "#1565c0" },
      }}
    />
  </TopToolbar>
);

export const UrbanFormList = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { permissions, isLoading } = usePermissions();

  if (isLoading) return <p>Cargando permisos...</p>;

  return (
    <>
      <List 
        title="Listado de Formularios Urbanos"
        filters={UrbanFormFilters}
        actions={<ListActions />}
        exporter={defaultExporter}
        perPage={25}
        sort={{ field: "fecha_hora", order: "DESC" }}
        sx={{
          "& .RaFilterForm-root": {
            backgroundColor: "#f5f5f5",
            padding: "12px 16px",
            borderRadius: "8px",
            marginBottom: "12px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          },
          "& .RaList-main": {
            width: "100%",
          },
        }}>
        {isSmall ? (
          <SimpleList
            primaryText={(record) => record.folio}
            secondaryText={(record) => formatDateYMD(record.fecha_hora)}
            tertiaryText={(record) => record.personal_a_cargo}
          />
        ) : (
          <DataTable
            sx={{
              width: "100%",
              "& .RaDataTable-table": {
                tableLayout: "auto",
                width: "100%",
              },
              "& th, & td": {
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: "8px",
              },
              "& th": {
                fontWeight: "bold",
                backgroundColor: "#f5f5f5",
              },
            }}
          >
            <DataTable.Col source="folio" label="Folio" />
            <DataTable.Col label="Fecha y Hora">
              <FunctionField render={(record: any) => formatDateYMD(record.fecha_hora)} />
            </DataTable.Col>
            <DataTable.Col source="turno" label="Turno" />
            <DataTable.Col source="personal_a_cargo" label="Personal a Cargo" />
            <DataTable.Col source="tipo_servicio" label="Tipo de Servicio" />
            <DataTable.Col label="Acciones">
              <ShowButton
                label="Ver"
                sx={{
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "6px",
                  px: 2,
                  "&:hover": { backgroundColor: "#1565c0" },
                }}
              />
            </DataTable.Col>
          </DataTable>
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