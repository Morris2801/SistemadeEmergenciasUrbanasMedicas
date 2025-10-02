import React, { useState } from 'react';
import { usePermissions, TextInput, DateInput, TimeInput, required, SelectInput, BooleanInput, SimpleForm, NumberInput, Create, ArrayInput, SimpleFormIterator }
    from 'react-admin';
import { Accordion, AccordionSummary, AccordionDetails, Grid, Button, Box, Typography, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const MedicFormCreate = () => {
    const { permissions } = usePermissions(); 
    const [currentPage, setCurrentPage] = useState(0);
    const [enfermedad, setEnfermedad] = useState(false);
    const [traumatismo, setTraumatismo] = useState(false);
    const [ginecobstetricia, setGinecobstetricia] = useState(false);

    if (permissions !== "paramedico" && permissions !== "admin" && permissions !== "jefe") {
        return <p>No tienes permiso para acceder a este formulario.</p>;
    }

    const pageNames = [
        "Información Principal",
        "Evaluación Médica", 
        "Tratamiento y Observaciones",
        "Información Legal"
    ];

    const renderPage = () => {
        switch(currentPage) {
            case 0:
                return (
                    <Grid container spacing={2}>
                        {/* I. Datos del Servicio */}
                        <Grid item xs={12} md={4}>
                            <Accordion defaultExpanded>
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
                                    <BooleanInput label="Enfermedad" source="enfermedad" value={enfermedad}
                                        onChange={e => setEnfermedad(e.target.checked)}
                                    />
                                    <BooleanInput label="Traumatismo" source="traumatismo" value={traumatismo}
                                        onChange={e => setTraumatismo(e.target.checked)}
                                    />
                                    <BooleanInput label="Ginecobstetricia" source="ginecobstetricia" value={ginecobstetricia}
                                        onChange={e => setGinecobstetricia(e.target.checked)}
                                    />
                                    {/* Conditional sections */}
                                    {ginecobstetricia && (
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
                                                <SelectInput source="sexo_nacido" label="Sexo del recién nacido"
                                                    choices={[
                                                        { id: "masculino", name: 'Masculino' },
                                                        { id: "femenino", name: "Femenino" },
                                                    ]}
                                                />
                                            </AccordionDetails>
                                        </Accordion>
                                    )}
                                    {traumatismo && (
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
                                            </AccordionDetails>
                                        </Accordion>
                                    )}
                                    {enfermedad && (
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
                                    )}
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
                    </Grid>
                );

            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            {/* VII. Evaluación Inicial */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    VII. Evaluación Inicial
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SelectInput source="nivel_consciencia" label="Nivel de consciencia"
                                        choices={[
                                            { id: "alerta", name: "Alerta" },
                                            { id: "dolor", name: "Dolor" },
                                            { id: "verbal", name: "Verbal" },
                                            { id: "inconsciente", name: "Inconsciente" },
                                        ]}
                                    />
                                    <SelectInput source="deglucion" label="Deglución"
                                        choices={[
                                            { id: "ausente", name: "Ausente" },
                                            { id: "presente", name: "Presente" },
                                        ]}
                                    />
                                    <SelectInput source="via_aerea" label="Vía aérea"
                                        choices={[
                                            { id: "permeable", name: "Permeable" },
                                            { id: "comprometida", name: "Comprometida" },
                                        ]}
                                    />
                                    <SelectInput source="ventilacion" label="Ventilación"
                                        choices={[
                                            { id: "regular", name: "Automatismo regular" },
                                            { id: "rapido", name: "Automatismo rápido" },
                                            { id: "irregular", name: "Automatismo irregular" },
                                            { id: "superficial", name: "Automatismo superficial" },
                                            { id: "apnea", name: "Apnea" },
                                        ]}
                                    />
                                    <SelectInput source="auscultacion" label="Auscultación"
                                        choices={[
                                            { id: "normal", name: "Ruidos normales" },
                                            { id: "disminuidos", name: "Ruidos disminuidos" },
                                            { id: "ausentes", name: "Ruidos ausentes" },
                                        ]}
                                    />
                                    <SelectInput source="hemitorax" label="Hemitórax"
                                        choices={[
                                            { id: "derecho", name: "Derecho" },
                                            { id: "izquierdo", name: "Izquierdo" },
                                        ]}
                                    />
                                    <SelectInput source="sitio" label="Sitio"
                                        choices={[
                                            { id: "apical", name: "Apical" },
                                            { id: "base", name: "Base" },
                                        ]}
                                    />
                                    <SelectInput source="pulsos" label="Pulsos"
                                        choices={[
                                            { id: "carotideo", name: "Carotídeo" },
                                            { id: "radial", name: "Radial" },
                                            { id: "paro", name: "Paro cardiorrespiratorio" },
                                        ]}
                                    />
                                    <SelectInput source="piel" label="Piel"
                                        choices={[
                                            { id: "normal", name: "Normal" },
                                            { id: "palida", name: "Pálida" },
                                            { id: "cianotica", name: "Cianótica" },
                                        ]}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* VIII. Evaluación Secundaria */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    VIII. Evaluación Secundaria
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="exploracion_fisica" label="Exploración física (mapa/dibujo)" />
                                    <TextInput source="pupilas" label="Pupilas" />
                                    <ArrayInput source="signos_vitales">
                                        <SimpleFormIterator>
                                            <TimeInput source="hora" label="Hora" />
                                            <NumberInput source="fr" label="FR" />
                                            <NumberInput source="fc" label="FC" />
                                            <NumberInput source="tas" label="TAS" />
                                            <NumberInput source="tad" label="TAD" />
                                            <NumberInput source="sao2" label="SaO2" />
                                            <NumberInput source="temp" label="Temp" />
                                            <NumberInput source="gluc" label="Glucosa" />
                                            <SelectInput source="neuro" label="Neuro Test"
                                                choices={[
                                                    { id: "a", name: "Alerta" },
                                                    { id: "v", name: "Verbal" },
                                                    { id: "d", name: "Dolor" },
                                                    { id: "i", name: "Inconsciente" },
                                                ]}
                                            />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                    <NumberInput source="glasgow" label="Glasgow Total" />
                                    <TextInput source="alergias" label="Alergias" />
                                    <TextInput source="medicamentos" label="Medicamentos en ingesta" />
                                    <TextInput source="padecimientos" label="Padecimientos/cirugías" />
                                    <TextInput source="ultima_comida" label="Última comida" />
                                    <TextInput source="eventos_previos" label="Eventos previos" />
                                    <SelectInput source="condicion" label="Condición"
                                        choices={[
                                            { id: "critico", name: "Crítico" },
                                            { id: "no_critico", name: "No crítico" },
                                            { id: "estable", name: "Estable" },
                                            { id: "inestable", name: "Inestable" },
                                        ]}
                                    />
                                    <SelectInput source="prioridad" label="Prioridad"
                                        choices={[
                                            { id: "rojo", name: "Rojo" },
                                            { id: "amarillo", name: "Amarillo" },
                                            { id: "verde", name: "Verde" },
                                            { id: "negro", name: "Negra" },
                                        ]}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* IX. Traslado */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    IX. Traslado
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="institucion" label="Institución de traslado" />
                                    <TextInput source="hospital" label="Hospital" />
                                    <TextInput source="doctor" label="Doctor" />
                                    <TextInput source="folio_cru" label="Folio CRU" />
                                    <BooleanInput source="seNego" label="¿Se negó?" />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {/* X. Tratamiento */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    X. Tratamiento
                                </AccordionSummary>
                                <AccordionDetails>
                                    <SelectInput source="via_aerea_trat" label="Vía aérea"
                                        choices={[
                                            { id: "aspiracion", name: "Aspiración" },
                                            { id: "canula", name: "Cánula orofaríngea" },
                                            { id: "intubacion", name: "Intubación orotraqueal" },
                                            { id: "mascarilla", name: "Mascarilla laríngea" },
                                            { id: "crico", name: "Cricotiroidotomía" },
                                        ]}
                                    />
                                    <SelectInput source="control_cervical" label="Control cervical"
                                        choices={[
                                            { id: "manual", name: "Manual" },
                                            { id: "rigido", name: "Collarín rígido" },
                                            { id: "blando", name: "Collarín blando" },
                                        ]}
                                    />
                                    <ArrayInput source="tratamientos">
                                        <SimpleFormIterator>
                                            <TimeInput source="hora" label="Hora" />
                                            <TextInput source="medicamento" label="Medicamento" />
                                            <TextInput source="dosis" label="Dosis" />
                                            <TextInput source="via" label="Vía Administración" />
                                            <TextInput source="doctor" label="Dr. Tratante" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* XI. Observaciones */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    XI. Observaciones
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="pertenencias" label="Pertenencias" fullWidth />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                );

            case 3:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {/* XII. Ministerio Público */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    XII. Ministerio Público
                                </AccordionSummary>
                                <AccordionDetails>
                                    <BooleanInput source="mp_notificado" label="Notificado?" />
                                    <TextInput source="mp_responsable" label="Responsable" />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* XIII. Datos legales */}
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    XIII. Datos Legales
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="dependencia" label="Dependencia" />
                                    <TextInput source="unidad" label="Número de unidad" />
                                    <TextInput source="oficiales" label="Número de oficiales" />
                                    <ArrayInput source="vehiculos">
                                        <SimpleFormIterator>
                                            <TextInput source="tipo_marca" label="Tipo y marca" />
                                            <TextInput source="placas" label="Placas" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };
    return (
        <Create>
            <SimpleForm>
                <TextInput source="folio" validate={required()} />
                <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        {pageNames[currentPage]} - Página {currentPage + 1} de {pageNames.length}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        {pageNames.map((name, index) => (
                            <Button key={index} variant={currentPage === index ? "contained" : "outlined"} onClick={() => setCurrentPage(index)} size="small" sx={{ minWidth: 120 }}>
                                {index + 1}. {name}
                            </Button>
                        ))}
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" onClick={() => setCurrentPage(Math.max(0, currentPage - 1))} disabled={currentPage === 0}>
                            ← Anterior
                        </Button>
                        <Button variant="outlined" onClick={() => setCurrentPage(Math.min(pageNames.length - 1, currentPage + 1))} disabled={currentPage === pageNames.length - 1}>
                            Siguiente →
                        </Button>
                    </Box>
                </Paper>
                {renderPage()}
            </SimpleForm>
        </Create>
    );
};
