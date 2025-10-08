// src/urbanForm.tsx
import {
    Create,
    SimpleForm,
    TextInput,
    DateTimeInput,
    SelectInput,
    NumberInput,
    FileInput,
    ImageField,
    required,
    List,
    SimpleList,
    Datagrid,
    ArrayField,
    TextField,
    DateField,
    EditButton,
    ShowButton,
    Show,
    Edit,
    SimpleShowLayout,
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, useMediaQuery, Theme } from '@mui/material';

// UrbanFormCreate Component
export const UrbanFormCreate = () => {
    const navigate = useNavigate();

    return (
        <Create resource="urbanForm">
            <SimpleForm>
                <Box display="flex" flexDirection="column" gap={2}>
                    <Button variant="outlined" color="secondary" onClick={() => navigate('/selector')}>
                        ← Volver
                    </Button>

                    <Typography variant="h6">Formulario Emergencia Urbana</Typography>

                    <TextInput source="folio" label="Folio" validate={required()} />
                    <DateTimeInput source="fecha_hora" label="Día, fecha y hora" validate={required()} />

                    <SelectInput
                        source="turno"
                        label="Turno"
                        validate={required()}
                        choices={[
                            { id: 'matutino', name: 'Matutino' },
                            { id: 'vespertino', name: 'Vespertino' },
                            { id: 'nocturno', name: 'Nocturno' },
                        ]}
                    />

                    <TextInput source="personal_a_cargo" label="Nombre del personal a cargo" validate={required()} />

                    <SelectInput
                        source="modo_activacion"
                        label="Modo de activación"
                        validate={required()}
                        choices={[
                            { id: 'llamada', name: 'Llamada de emergencia' },
                            { id: 'oficio', name: 'Seguimiento de oficio' },
                        ]}
                    />

                    <TextInput source="tipo_servicio" label="Tipo de servicio al que se acude" validate={required()} />
                    <DateTimeInput source="fecha_atencion" label="Fecha y hora de atención" validate={required()} />
                    <TextInput source="tiempo_traslado" label="Tiempo de traslado" validate={required()} />
                    <TextInput source="ubicacion" label="Ubicación (GPS o dirección/mapa)" validate={required()} />

                    <SelectInput
                        source="gravedad"
                        label="Gravedad de la emergencia"
                        validate={required()}
                        choices={[
                            { id: 'baja', name: 'Baja' },
                            { id: 'media', name: 'Media' },
                            { id: 'alta', name: 'Alta' },
                        ]}
                    />

                    <NumberInput source="km_recorridos" label="Kilómetros recorridos" />
                    <TextInput source="trabajos_realizados" label="Trabajos realizados" multiline fullWidth />
                    <TextInput source="observaciones" label="Observaciones" multiline fullWidth />

                    <FileInput source="fotos" label="Fotografías" accept="image/*" multiple>
                        <ImageField source="src" title="Fotografía" />
                    </FileInput>

                    <TextInput source="conclusion" label="Conclusión / Dictamen" multiline fullWidth />
                    <TextInput source="responsables" label="Responsables de la emergencia" multiline fullWidth />
                    <TextInput source="autoridades_participantes" label="Autoridades o dependencias participantes" multiline fullWidth />
                </Box>
            </SimpleForm>
        </Create>
    );
};

// UrbanFormList Component
export const UrbanFormList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

    return (
        <List title="Listado de Formularios Urbanos">
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.folio}
                    secondaryText={(record) => record.fecha_hora}
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
                    <ShowButton />
                </Datagrid>
            )}
        </List>
    );
};

// UrbanFormShow Component
export const UrbanFormShow = () => (
    <Show title="Detalles del Formulario Urbano">
        <SimpleShowLayout>
            <TextField source="folio" label="Folio" />
            <DateField source="fecha_hora" label="Fecha y Hora" />
            <TextField source="turno" label="Turno" />
            <TextField source="personal_a_cargo" label="Personal a Cargo" />
            <TextField source="modo_activacion" label="Modo de Activación" />
            <TextField source="tipo_servicio" label="Tipo de Servicio" />
            <DateField source="fecha_atencion" label="Fecha y Hora de Atención" />
            <TextField source="tiempo_traslado" label="Tiempo de Traslado" />
            <TextField source="ubicacion" label="Ubicación" />
            <TextField source="gravedad" label="Gravedad" />
            <NumberField source="km_recorridos" label="Kilómetros Recorridos" />
            <TextField source="trabajos_realizados" label="Trabajos Realizados" />
            <TextField source="observaciones" label="Observaciones" />
            <ArrayField source="fotos" label="Fotografías">
                <Datagrid>
                    <ImageField source="src" title="Fotografía" />
                </Datagrid>
            </ArrayField>
            <TextField source="conclusion" label="Conclusión" />
            <TextField source="responsables" label="Responsables" />
            <TextField source="autoridades_participantes" label="Autoridades Participantes" />
        </SimpleShowLayout>
    </Show>
);

export const UrbanFormEdit = () => (
    <Edit title="Editar Formulario Médico">
        <SimpleForm>
            <TextInput source="folio" label="Folio" />
            <DateInput source="fecha" label="Fecha" />
            <TimeInput source="hora_llamada" label="Hora de Llamada" />
            <TimeInput source="hora_llegada" label="Hora de Llegada" />
            <TextInput source="paciente_nombre" label="Nombre del Paciente" />
            <SelectInput
                source="sexo"
                label="Sexo"
                choices={[
                    { id: 'masculino', name: 'Masculino' },
                    { id: 'femenino', name: 'Femenino' },
                ]}
            />
            <NumberInput source="años" label="Edad" />
            <TextInput source="alcaldia" label="Alcaldía" />
            <TextInput source="telefono" label="Teléfono" />
            <TextInput source="ocupacion" label="Ocupación" />
            <ArrayInput source="signos_vitales" label="Signos Vitales">
                <SimpleFormIterator>
                    <TimeInput source="hora" label="Hora" />
                    <NumberInput source="fr" label="FR" />
                    <NumberInput source="fc" label="FC" />
                    <NumberInput source="tas" label="TAS" />
                    <NumberInput source="tad" label="TAD" />
                    <NumberInput source="sao2" label="SaO2" />
                    <NumberInput source="temp" label="Temp" />
                    <NumberInput source="gluc" label="Glucosa" />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);