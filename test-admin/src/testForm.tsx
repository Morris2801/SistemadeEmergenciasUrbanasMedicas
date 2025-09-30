import React, { useState } from 'react';
import {
    TextInput, DateInput, TimeInput, required, SelectInput,
    BooleanInput, SimpleForm, NumberInput, Create
} from 'react-admin';
import {
    Accordion, AccordionSummary, AccordionDetails, Grid
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const MedicFormCreate = () => {
    const [motivo, setMotivo] = useState("");

    return (
        <Create>
            <SimpleForm>
                {/* Folio */}
                <TextInput source="folio" validate={required()} />

                {/* GRID CONTAINER FOR THE SIX SECTIONS */}
                <Grid container spacing={2}>
                    {/* I. Datos del Servicio */}
                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                I. Datos del Servicio
                            </AccordionSummary>
                            <AccordionDetails>
                                <DateInput source="fecha" label="Fecha" validate={required()} />
                                <TimeInput source="hora_llamada" label="Hora de Llamada" validate={required()} />
                                <TimeInput source="hora_traslado" label="Hora de Traslado" />
                                <TimeInput source="hora_salida" label="Hora de Salida" />
                                <TimeInput source="hora_hospital" label="Hora de Hospital" />
                                <TimeInput source="hora_llegada" label="Hora de Llegada" validate={required()} />
                                <SelectInput
                                    source="motivo" label="Motivo de atención" validate={required()}
                                    choices={[
                                        { id: "enfermedad", name: "Enfermedad" },
                                        { id: "traumatismo", name: "Traumatismo" },
                                        { id: "ginecobstetricia", name: "Ginecobstetricia" },
                                    ]}
                                    onChange={(e) => setMotivo(e.target.value)}
                                />
                                <TextInput source="calle" label="Calle" validate={required()} />
                                <TextInput source="entre" label="Entre" validate={required()} />
                                <TextInput source="colonia" label="Colonia" validate={required()} />
                                <TextInput source="alcaldia" label="Alcaldía" validate={required()} />
                                <SelectInput
                                    source="lugar" label="Lugar de ocurrencia" validate={required()}
                                    choices={[
                                        { id: "transporte", name: 'Transporte' },
                                        { id: "escuela", name: "Escuela" },
                                        { id: "trabajo", name: "Trabajo" },
                                        { id: "hogar", name: "Hogar" },
                                        { id: "recreacion", name: "Recreación y deporte" },
                                        { id: "via_publica", name: "Vía pública" },
                                        { id: "otro", name: "Otro" },
                                    ]}
                                />
                                <TextInput source="lugar_otro" label="Especifique otro lugar" />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    {/* II. Control */}
                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                II. Control
                            </AccordionSummary>
                            <AccordionDetails>
                                <NumberInput source="num_ambulancia" label="Número de Ambulancia" />
                                <TextInput source="operador" label="Operador" validate={required()} />
                                <TextInput source="tum" label="T.U.M." />
                                <TextInput source="socorrista" label="Socorrista" validate={required()} />
                                <TextInput source="helicoptero" label="Matrícula de Helicóptero" />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    {/* III. Paciente */}
                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                III. Paciente
                            </AccordionSummary>
                            <AccordionDetails>
                                <TextInput source="paciente_nombre" label="Nombre del Paciente" validate={required()} />
                                <SelectInput
                                    source="sexo" label="Sexo de Paciente" validate={required()}
                                    choices={[
                                        { id: "masculino", name: 'Masculino' },
                                        { id: "femenino", name: "Femenino" },
                                    ]}
                                />
                                <NumberInput source="años" label="Años" validate={required()} />
                                <NumberInput source="meses" label="Meses" validate={required()} />
                                <TextInput source="domicilio" label="Domicilio" validate={required()} />
                                <TextInput source="colonia" label="Colonia" validate={required()} />
                                <TextInput source="alcaldia" label="Alcaldía" validate={required()} />
                                <TextInput source="derechohabiencia" label="Derechohabiente a" validate={required()} />
                                <TextInput source="telefono" label="Teléfono" validate={required()} />
                                <TextInput source="ocupacion" label="Ocupación" validate={required()} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    {/* IV. Parto */}
                    {motivo === "ginecobstetricia" && (
                        <Grid item xs={12} md={4}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    IV. Parto
                                </AccordionSummary>
                                <AccordionDetails>
                                    <NumberInput source="semanas_gesta" label="Semanas de gestación" />
                                    <TimeInput source="hora_inicio_contracciones" label="Hora de inicio de contracciones" />
                                    <NumberInput source="frecuencia_contracciones" label="Frecuencia de contracciones (min)" />
                                    <NumberInput source="duracion_contracciones" label="Duración de contracciones (seg)" />
                                    <TimeInput source="hora_nacimiento" label="Hora de nacimiento" />
                                    <TimeInput source="placenta_expulsada" label="Hora de expulsión de placenta" />
                                    <TextInput source="lugar_nacimiento" label="Lugar de nacimiento" />
                                    <SelectInput
                                        source="sexo_nacido" label="Sexo del recién nacido"
                                        choices={[
                                            { id: "masculino", name: 'Masculino' },
                                            { id: "femenino", name: "Femenino" },
                                        ]}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )}

                    {/* V. Causa Traumática */}
                    {motivo === "traumatismo" && (
                        <Grid item xs={12} md={4}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    V. Causa Traumática
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SelectInput source="agente_causal" label="Agente Causal" choices={[/* Agentes */]} />
                                    <TextInput source="agente_causal_otro" label="Otro agente" />
                                    {/* Subcontenidos omitidos por brevedad */}
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )}

                    {/* VI. Causa Clínica */}
                    {motivo === "enfermedad" && (
                        <Grid item xs={12} md={4}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    VI. Causa Clínica
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SelectInput source="origen_probable" label="Origen probable" choices={[/* Orígenes */]} />
                                    <TextInput source="origen_probable_otro" label="Otro origen" />
                                    <BooleanInput source="historico" label="Primera vez?" />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    )}
                </Grid>
            </SimpleForm>
        </Create>
    );
};
