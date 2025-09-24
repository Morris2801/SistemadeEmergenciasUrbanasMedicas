import React, { useState } from 'react';
import { TextInput, DateInput, TimeInput, required, SelectInput, BooleanInput, SimpleForm, NumberInput, Create, Datagrid, }
    from 'react-admin';
import { Accordion, AccordionSummary, AccordionDetails, Select, List, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const MedicFormCreate = () => {
    const [motivo, setMotivo] = useState("");
    return (
        <Create>
            <SimpleForm>
                {/*Folio*/}
                <TextInput source="folio" validate={required()} />
                {/*I. DatosServicio*/}
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        I. Datos del Servicio
                    </AccordionSummary>
                    <AccordionDetails>
                        Cronometría
                        <DateInput source="fecha" label="Fecha" validate={required()} />
                        <TimeInput source="hora_llamada" label="Hora de Llamada" validate={required()} />
                        <TimeInput source="hora_traslado" label="Hora de Traslado" />
                        <TimeInput source="hora_salida" label="Hora de Salida" />
                        <TimeInput source="hora_hospital" label="Hora de Hospital" />
                        <TimeInput source="hora_llegada" label="Hora de Llegada" validate={required()} />
                        <SelectInput source="motivo" label="Motivo de atención" validate={required()}
                            choices={[
                                { id: "enfermedad", name: "Enfermedad" },
                                { id: "traumatismo", name: "Traumatismo" },
                                { id: "ginecobstetricia", name: "Ginecobstetricia" },
                            ]}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                        Ubicación de servicio
                        <TextInput source="calle" label="Calle" validate={required()} />
                        <TextInput source="entre" label="Entre" validate={required()} />
                        <TextInput source="colonia" label="Colonia" validate={required()} />
                        <TextInput source="alcaldia" label="Alcaldía" validate={required()} />
                        <SelectInput source="lugar" label="Lugar de ocurrencia" validate={required()}
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
                {/*II. Control*/}
                <Accordion defaultExpanded={true}>
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
                {/*III. Paciente*/}
                <Accordion defaultExpanded={true}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        III. Paciente
                    </AccordionSummary>
                    <AccordionDetails>
                        <TextInput source="paciente_nombre" label="Nombre del Paciente" validate={required()} />
                        <SelectInput source="sexo" label="Sexo de Paciente" validate={required()}
                            choices={[
                                { id: "masculino", name: 'Masculino' },
                                { id: "femenino", name: "Femenino" },
                            ]}
                        />
                        <NumberInput source="años" label="Años" validate={required()} />
                        <NumberInput source="meses" label="Meses" validate={required()}/>
                        <TextInput source="domicilio" label="Domicilio" validate={required()}/>
                        <TextInput source="colonia" label="Colonia" validate={required()}/>
                        <TextInput source="alcaldia" label="Alcaldía" validate={required()}/>
                        <TextInput source="derechohabiencia" label="Derechohabiente a" validate={required()}/>
                        <TextInput source="telefono" label="Teléfono" validate={required()}/>
                        <TextInput source="ocupacion" label="Ocupación" validate={required()}/>
                    </AccordionDetails>
                </Accordion>
                {/*IV. Parto*/}
                {motivo === "ginecobstetricia" && (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            IV. Parto
                        </AccordionSummary>
                        <AccordionDetails>
                            Datos de la madre
                            <NumberInput source="semanas_gesta" label="Semanas de gestación" />
                            <TimeInput source="hora_inicio_contracciones" label="Hora de inicio de contracciones" />
                            <NumberInput source="frecuencia_contracciones" label="Frecuencia de contracciones (min)" />
                            <NumberInput source="duracion_contracciones" label="Duración de contracciones (seg)" />
                            Datos postparto y recién nacidos
                            <TimeInput source="hora_nacimiento" label="Hora de nacimiento" />
                            <TimeInput source="placenta_expulsada" label="Hora de expulsión de placenta" />
                            <TextInput source="lugar_nacimiento" label="Lugar de nacimiento" />
                            <SelectInput source="sexo_nacido" label="Sexo del recién nacido"
                                choices={[
                                    { id: "masculino", name: 'Masculino' },
                                    { id: "femenino", name: "Femenino" },
                                ]}
                            />
                            Puntaje de APGAR (esta tabla podría ser chatgpteada?)
                        </AccordionDetails>
                    </Accordion>
                )}
                {/*V. Causa Tramtca*/}
                {motivo === "traumatismo" && (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            V. Causa Traumática
                        </AccordionSummary>
                        <AccordionDetails>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    Agente Causal
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SelectInput source="agente_causal" label="Agente Causal"
                                        choices={[
                                            { id: "arma", name: 'Arma' },
                                            { id: "juguete", name: "Juguete" },
                                            { id: "explosión", name: "Explosión" },
                                            { id: "fuego", name: "Fuego" },
                                            { id: "animal", name: "Animal" },
                                            { id: "bicicleta", name: "Bicicleta" },
                                            { id: "automotor", name: "Automotor" },
                                            { id: "maquinaria", name: "Maquinaria" },
                                            { id: "herramienta", name: "Herramienta" },
                                            { id: "electricidad", name: "Electricidad" },
                                            { id: "sustancia_caliente", name: "Sustancia caliente" },
                                            { id: "sustancia_quimica", name: "Sustancia química" },
                                            { id: "producto_biologico", name: "Producto biológico" },
                                            { id: "ser_humano", name: "Ser humano" },
                                            { id: "otro", name: "Otro" },
                                        ]}
                                    />
                                    <TextInput source="agente_causal_otro" label="Especifique otro agente causal" />
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    Accidente Automobilístico
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SelectInput source="accidente_automovilistico" label="Accidente Automobilístico"
                                        choices={[
                                            { id: "colision", name: "Colisión" },
                                            { id: "volcadura", name: "Volcadura" },
                                            { id: "automotor", name: "Automotor" },
                                            { id: "bicicleta", name: "Bicicleta" },
                                            { id: "motocicleta", name: "Motocicleta" },
                                            { id: "maquinaria", name: "Maquinaria" },
                                            { id: "contra_objeto_fijo", name: "Contra objeto fijo" },
                                        ]}
                                    />
                                    <SelectInput source="impacto_tipo" label="Tipo de Impacto"
                                        choices={[
                                            { id: "posterior", name: "Posterior" },
                                            { id: "lateral", name: "Lateral" },
                                            { id: "frontal", name: "Frontal" },
                                            { id: "rotacional", name: "Rotacional" },
                                            { id: "volcadura", name: "Volcadura" },
                                        ]}
                                    />
                                    <SelectInput source="parabrisas_estado" label="Estado del Parabrisas"
                                        choices={[
                                            { id: "integro", name: "Íntegro" },
                                            { id: "estrellado", name: "Estrellado" },
                                        ]}
                                    />
                                    <SelectInput source="volante_estado" label="Estado del Volante"
                                        choices={[
                                            { id: "integro", name: "Íntegro" },
                                            { id: "doblado", name: "Doblado" },
                                        ]}
                                    />
                                    <SelectInput source="bolsa_aire" label="Bolsa de aire"
                                        choices={[
                                            { id: "si", name: "Sí" },
                                            { id: "no", name: "No" },
                                        ]}
                                    />
                                    <SelectInput source="cinturon_seguridad" label="Cinturón de seguridad"
                                        choices={[
                                            { id: "colocado", name: "Colocado" },
                                            { id: "no_colocado", name: "No colocado" },
                                        ]}
                                    />
                                    <SelectInput source="dentro_vehiculo" label="Dentro de vehículo"
                                        choices={[
                                            { id: "si", name: "Sí" },
                                            { id: "no", name: "No" },
                                            { id: "eyectado", name: "Eyectado" },
                                        ]}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                )}
                {/*VI. Causa clicna*/}
                {motivo === "enfermedad" && (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            VI. Causa Clínica
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectInput source="origen_probable" label="Origen probable"
                                choices={[
                                    { id: "neurologica", name: 'Neurológica' },
                                    { id: "infecciosa", name: "Infecciosa" },
                                    { id: "musculoesqueletica", name: "Musculoesquelética" },
                                    { id: "urogenital", name: "Urogenital" },
                                    { id: "digestiva", name: "Digestiva" },
                                    { id: "cardiovascular", name: "Cardiovascular" },
                                    { id: "oncologica", name: "Oncológica" },
                                    { id: "metabolico", name: "Metabólico" },
                                    { id: "ginecobstetricia", name: "Ginecobstetricia" },
                                    { id: "respiratorio", name: "Respiratorio" },
                                    { id: "otro", name: "Otro - Cognitivo Emocional" },
                                ]}
                            />
                            <TextInput source="origen_probable_otro" label="Especifique otro origen probable" />
                            <BooleanInput source="historico" label="Primera vez?" />
                        </AccordionDetails>
                    </Accordion>
                )
                }
            </SimpleForm>
        </Create>
    );
};