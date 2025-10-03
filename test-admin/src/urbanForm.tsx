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
} from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button } from '@mui/material';

const UrbanFormCreate = () => {
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
                            { id: "matutino", name: "Matutino" },
                            { id: "vespertino", name: "Vespertino" },
                            { id: "nocturno", name: "Nocturno" },
                        ]}
                    />
                    
                    <TextInput source="personal_a_cargo" label="Nombre del personal a cargo" validate={required()} />
                    
                    <SelectInput
                        source="modo_activacion"
                        label="Modo de activación"
                        validate={required()}
                        choices={[
                            { id: "llamada", name: "Llamada de emergencia" },
                            { id: "oficio", name: "Seguimiento de oficio" },
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
                            { id: "baja", name: "Baja" },
                            { id: "media", name: "Media" },
                            { id: "alta", name: "Alta" },
                        ]}
                    />

                    <NumberInput source="km_recorridos" label="Kilómetros recorridos" />
                    <TextInput source="trabajos_realizados" label="Trabajos realizados" multiline fullWidth />
                    <TextInput source="observaciones" label="Observaciones" multiline fullWidth />

                    <FileInput
                        source="fotos"
                        label="Fotografías"
                        accept={{ 'image/*': [] }}
                        multiple
                    >
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

export default UrbanFormCreate;
