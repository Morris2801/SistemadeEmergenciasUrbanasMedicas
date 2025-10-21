import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissions, FunctionField, TextInput, DateInput, TimeInput, required, SelectInput, BooleanInput, SimpleForm, NumberInput, Create, ArrayInput, SimpleFormIterator, FileInput, ImageField, Edit, Show, TextField, DateField, Datagrid, List, DataTable, EditButton, SimpleList, EmailField , useNotify, useRedirect , Theme,  TopToolbar, ExportButton, FilterButton , CreateButton, ShowButton, SimpleShowLayout , useListContext, defaultExporter}
    from 'react-admin';
import { Accordion, AccordionSummary, AccordionDetails, Grid, Button, Box, Typography, Paper, useMediaQuery , Dialog, DialogTitle, DialogContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from "@mui/icons-material/Visibility";

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

const turnoChoices = [
    { id: 'Lunes a Viernes - 8am a 3pm', name: 'Lunes a Viernes - 8am a 3pm' },
    { id: 'Lunes a Viernes - 3pm a 9pm', name: 'Lunes a Viernes - 3pm a 9pm' },
    { id: 'Lunes, Miércoles y Viernes - 9pm a 8am', name: 'Lunes, Miércoles y Viernes - 9pm a 8am' },
    { id: 'Martes, Jueves y Domingo - 9pm a 8am' , name: 'Martes, Jueves y Domingo - 9pm a 8am' },
    { id: 'Sábado, Domingo y festivos - 8am a 8pm', name: 'Sábado, Domingo y festivos - 8am a 8pm' },
    { id: 'Sábado, Domingo y festivos - 8pm a 8am', name: 'Sábado, Domingo y festivos - 8pm a 8am' },
];

export const MedicFormCreate = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const { permissions } = usePermissions();
    const [currentPage, setCurrentPage] = useState(0);
    const [enfermedad, setEnfermedad] = useState(false);
    const [traumatismo, setTraumatismo] = useState(false);
    const [ginecobstetricia, setGinecobstetricia] = useState(false);
    const notify = useNotify();
    const redirect = useRedirect();

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
        switch (currentPage) {
            case 0:
                return (
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={4}>
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    I. Datos del Servicio
                                </AccordionSummary>
                                <AccordionDetails>
                                     <Box sx={{ p: 4 }}>
                                    Cronometría
                                    <DateInput source="fecha" label="Fecha" validate={required()} />
                                    <TimeInput source="hora_llamada" label="Hora de Llamada" validate={required()} />
                                    <TimeInput source="hora_traslado" label="Hora de Traslado" />
                                    <TimeInput source="hora_salida" label="Hora de Salida" />
                                    <TimeInput source="hora_hospital" label="Hora de Hospital" />
                                    <TimeInput source="hora_llegada" label="Hora de Llegada" validate={required()} />
                                    <TextInput source="calle" label="Calle" validate={required()} />
                                    <TextInput source="entre" label="Entre" validate={required()} />
                                    {/* FIX: Renamed colonia to colonia_servicio */}
                                    <TextInput source="colonia_servicio" label="Colonia (Servicio)" validate={required()} />
                                    {/* FIX: Renamed alcaldia to alcaldia_servicio */}
                                    <TextInput source="alcaldia_servicio" label="Alcaldía (Servicio)" validate={required()} />
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
                                    </Box>
                                    <TextInput source="lugar_otro" label="Especifique otro lugar" />
                                    <BooleanInput label="Ginecobstetricia" source="ginecobstetricia" value={ginecobstetricia}
                                        onChange={e => setGinecobstetricia(e.target.checked)}
                                    />

                                    <BooleanInput label="Traumatismo" source="traumatismo" value={traumatismo}
                                        onChange={e => setTraumatismo(e.target.checked)}
                                    />
                                    <BooleanInput label="Enfermedad" source="enfermedad" value={enfermedad}
                                        onChange={e => setEnfermedad(e.target.checked)}
                                    />
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
                                                {/* FIX: Renamed sexo_nacido to sexo_paciente to avoid conflict with Parto section */}
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

                        <Grid item xs={12} md={4}>
                            <Accordion >
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

                        <Grid item xs={12} md={4}>
                            <Accordion >
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    III. Paciente
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="paciente_nombre" label="Nombre del Paciente" validate={required()} />
                                    {/* FIX: Renamed sexo to sexo_paciente to avoid conflict with Parto section */}
                                    <SelectInput
                                        source="sexo_paciente" label="Sexo de Paciente" validate={required()}
                                        choices={[
                                            { id: "masculino", name: 'Masculino' },
                                            { id: "femenino", name: "Femenino" },
                                        ]}
                                    />
                                    <NumberInput source="años" label="Años" validate={required()} />
                                    <NumberInput source="meses" label="Meses" validate={required()} />
                                    <TextInput source="domicilio" label="Domicilio" validate={required()} />
                                    {/* FIX: Renamed colonia to colonia_paciente */}
                                    <TextInput source="colonia_paciente" label="Colonia (Paciente)" validate={required()} />
                                    {/* FIX: Renamed alcaldia to alcaldia_paciente */}
                                    <TextInput source="alcaldia_paciente" label="Alcaldía (Paciente)" validate={required()} />
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
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={4}>
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
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    VIII. Evaluación Secundaria
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="exploracion_fisica" label="Exploración física (mapa/dibujo)" />
                                    <TextInput source="pupilas" label="Pupilas" />
                                    <ArrayInput source="signos_vitales">
                                        <SimpleFormIterator>
                                            {/* FIX: Renamed hora to hora_sv */}
                                            <TimeInput source="hora_sv" label="Hora" />
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
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    IX. Traslado
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="institucion" label="Institución de traslado" />
                                    <TextInput source="hospital" label="Hospital" />
                                    {/* FIX: Renamed doctor to doctor_traslado */}
                                    <TextInput source="doctor_traslado" label="Doctor" />
                                    <TextInput source="folio_cru" label="Folio CRU" />
                                    <BooleanInput source="seNego" label="¿Se negó?" />
                                </AccordionDetails>
                            </Accordion>dont
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={6}>
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
                                            {/* FIX: Renamed hora to hora_trat */}
                                            <TimeInput source="hora_trat" label="Hora" />
                                            <TextInput source="medicamento" label="Medicamento" />
                                            <TextInput source="dosis" label="Dosis" />
                                            <TextInput source="via" label="Vía Administración" />
                                            {/* FIX: Renamed doctor to doctor_tratante */}
                                            <TextInput source="doctor_tratante" label="Dr. Tratante" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={6}>
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
        <Create sx={{ width: "100%", maxWidth: "none" }} 
            mutationOptions={{
                onSuccess: () => {
                    notify('Reporte guardado correctamente', { type: 'success' });
                    redirect('/selector'); 
                },
                onError: () => {
                    notify('Error al guardar el reporte', { type: 'warning' });
                },
                }}
    >
            <Box sx={{ mb: 2 }}>
                <Button variant="outlined" color="secondary" onClick={() => navigate('../../selector')} sx={{ mb: 2 }}>
                    ← Volver
                </Button>
            </Box>
<SimpleForm sx={{ width: "100%", maxWidth: "100%" }}>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                        <TextInput
                            source="folio"
                            label="Folio"
                            validate={required()}
                            fullWidth
                        />
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
                </Grid>

                <Paper elevation={2} sx={{ p: 2, mb: 3, width: "100%", maxWidth: "100%" }}>

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
                <br></br>
                <br></br>
                <FileInput source="fotos" label="Al terminar, adjuntar escaneos de reportes" accept={{ 'image/*': [] }} multiple>
                    <ImageField source="src" title="Fotografía" />
                </FileInput>
            </SimpleForm>
        </Create>
    );
};

export const MedicFormEdit = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const { permissions } = usePermissions();
    const [currentPage, setCurrentPage] = useState(0);
    const [enfermedad, setEnfermedad] = useState(false);
    const [traumatismo, setTraumatismo] = useState(false);
    const [ginecobstetricia, setGinecobstetricia] = useState(false);

    if (permissions !== "admin") {
        return <p>No tienes permiso para acceder a este formulario.</p>;
    }

    const pageNames = [
        "Información Principal",
        "Evaluación Médica",
        "Tratamiento y Observaciones",
        "Información Legal"
    ];

    const renderPage = () => {
        switch (currentPage) {
            case 0:
                return (
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={4}>
                            <Accordion >
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
                                    {/* CORRECCIÓN 1: De 'colonia' a 'servicio_colonia' */}
                                    <TextInput source="servicio_colonia" label="Colonia (Servicio)" validate={required()} />
                                    {/* CORRECCIÓN 2: De 'alcaldia' a 'servicio_alcaldia' */}
                                    <TextInput source="servicio_alcaldia" label="Alcaldía (Servicio)" validate={required()} />
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
                                    <BooleanInput label="Ginecobstetricia" source="ginecobstetricia" value={ginecobstetricia}
                                        onChange={e => setGinecobstetricia(e.target.checked)}
                                    />

                                    <BooleanInput label="Traumatismo" source="traumatismo" value={traumatismo}
                                        onChange={e => setTraumatismo(e.target.checked)}
                                    />
                                    <BooleanInput label="Enfermedad" source="enfermedad" value={enfermedad}
                                        onChange={e => setEnfermedad(e.target.checked)}
                                    />
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

                        <Grid item xs={12} md={4}>
                            <Accordion >
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

                        <Grid item xs={12} md={4}>
                            <Accordion >
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
                                    {/* CORRECCIÓN 3: De 'colonia' a 'paciente_colonia' */}
                                    <TextInput source="paciente_colonia" label="Colonia (Paciente)" validate={required()} />
                                    {/* CORRECCIÓN 4: De 'alcaldia' a 'paciente_alcaldia' */}
                                    <TextInput source="paciente_alcaldia" label="Alcaldía (Paciente)" validate={required()} />
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
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={4}>
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
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    VIII. Evaluación Secundaria
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="exploracion_fisica" label="Exploración física (mapa/dibujo)" />
                                    <TextInput source="pupilas" label="Pupilas" />
                                    <ArrayInput source="signos_vitales">
                                        <SimpleFormIterator>
                                            {/* CORRECCIÓN 5: De 'hora' a 'sv_hora' (hora de signos vitales) */}
                                            <TimeInput source="sv_hora" label="Hora" />
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
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    IX. Traslado
                                </AccordionSummary>
                                <AccordionDetails>
                                    <TextInput source="institucion" label="Institución de traslado" />
                                    <TextInput source="hospital" label="Hospital" />
                                    {/* CORRECCIÓN 6: De 'doctor' a 'traslado_doctor' */}
                                    <TextInput source="traslado_doctor" label="Doctor" />
                                    <TextInput source="folio_cru" label="Folio CRU" />
                                    <BooleanInput source="seNego" label="¿Se negó?" />
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    </Grid>
                );

            case 2:
                return (
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={6}>
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
                                            {/* CORRECCIÓN 7: De 'hora' a 'trat_hora' (hora de tratamiento) */}
                                            <TimeInput source="trat_hora" label="Hora" />
                                            <TextInput source="medicamento" label="Medicamento" />
                                            <TextInput source="dosis" label="Dosis" />
                                            <TextInput source="via" label="Vía Administración" />
                                            {/* CORRECCIÓN 8: De 'doctor' a 'trat_doctor' */}
                                            <TextInput source="trat_doctor" label="Dr. Tratante" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                    <Grid container spacing={2} sx={{ width: "100%", maxWidth: "100%", justifyContent: "center" }}>
                        <Grid item xs={12} md={6}>
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
        <Edit sx={{ width: "100%", maxWidth: "none" }} >
            <Box sx={{ mb: 2 }}>
                <Button variant="outlined" color="secondary" onClick={() => navigate('../../selector')} sx={{ mb: 2 }}>
                    ← Volver
                </Button>
            </Box>
            <SimpleForm sx={{ width: "100%", maxWidth: "100%" }}>
                <TextInput source="folio" validate={required()} />
                <Paper elevation={2} sx={{ p: 2, mb: 3, width: "100%", maxWidth: "100%" }}>

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
                <br></br>
                <br></br>
                <FileInput source="fotos" label="Al terminar, adjuntar escaneos de reportes" accept={{ 'image/*': [] }} multiple>
                    <ImageField source="src" title="Fotografía" />
                </FileInput>
            </SimpleForm>
        </Edit>
    );
};

import { 
    useShowController,
    Labeled
} from 'react-admin';


const InfoRow = ({ label, value }: { label: string; value: any }) => {
    if (!value && value !== 0 && value !== false) return null;
    return (
        <Box sx={{ mb: 1.5 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {label}
            </Typography>
            <Typography variant="body1">
                {typeof value === 'boolean' ? (value ? 'Sí' : 'No') : value}
            </Typography>
        </Box>
    );
};

const PartoSection = ({ record }: { record: any }) => {
    if (!record?.ginecobstetricia) return null;
    
    return (
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">IV. Parto</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <InfoRow label="Semanas de gestación" value={record.semanas_gesta} />
                <InfoRow label="Hora de inicio de contracciones" value={record.hora_inicio_contracciones} />
                <InfoRow label="Frecuencia de contracciones (min)" value={record.frecuencia_contracciones} />
                <InfoRow label="Duración de contracciones (seg)" value={record.duracion_contracciones} />
                <InfoRow label="Hora de nacimiento" value={record.hora_nacimiento} />
                <InfoRow label="Hora de expulsión de placenta" value={record.placenta_expulsada} />
                <InfoRow label="Lugar de nacimiento" value={record.lugar_nacimiento} />
                <InfoRow label="Sexo del recién nacido" value={record.sexo_nacido} />
            </AccordionDetails>
        </Accordion>
    );
};

const TraumatismoSection = ({ record }: { record: any }) => {
    if (!record?.traumatismo) return null;
    
    return (
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">V. Causa Traumática</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Agente Causal
                </Typography>
                <InfoRow label="Agente Causal" value={record.agente_causal} />
                <InfoRow label="Especifique otro agente causal" value={record.agente_causal_otro} />
            </AccordionDetails>
        </Accordion>
    );
};

const EnfermedadSection = ({ record }: { record: any }) => {
    if (!record?.enfermedad) return null;
    
    return (
        <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">VI. Causa Clínica</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <InfoRow label="Origen probable" value={record.origen_probable} />
                <InfoRow label="Especifique otro origen probable" value={record.origen_probable_otro} />
                <InfoRow label="Primera vez?" value={record.historico} />
            </AccordionDetails>
        </Accordion>
    );
};

const SignosVitalesTable = ({ signos }: { signos: any[] }) => {
    if (!signos || signos.length === 0) return null;

    return (
        <Box sx={{ overflowX: 'auto', mt: 2 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5',  }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>Hora</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>FR</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>FC</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>TAS</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>TAD</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>SaO2</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>Temp</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>Glucosa</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue'}}>Neuro</th>
                    </tr>
                </thead>
                <tbody>
                    {signos.map((signo, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.hora_sv || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.fr || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.fc || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.tas || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.tad || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.sao2 || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.temp || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.gluc || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{signo.neuro || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

const TratamientosTable = ({ tratamientos }: { tratamientos: any[] }) => {
    if (!tratamientos || tratamientos.length === 0) return null;
    
    return (
        <Box sx={{ overflowX: 'auto', mt: 2 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue' }}>Hora</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue' }}>Medicamento</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue' }}>Dosis</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue' }}>Vía</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem', color: 'blue' }}>Dr. Tratante</th>
                    </tr>
                </thead>
                <tbody>
                    {tratamientos.map((trat, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{trat.hora_trat || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{trat.medicamento || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{trat.dosis || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{trat.via || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{trat.doctor_tratante || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

const VehiculosTable = ({ vehiculos }: { vehiculos: any[] }) => {
    if (!vehiculos || vehiculos.length === 0) return null;
    
    return (
        <Box sx={{ overflowX: 'auto', mt: 2 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f5f5f5' }}>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem' }}>Tipo y marca</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', fontSize: '0.875rem' }}>Placas</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map((vehiculo, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{vehiculo.tipo_marca || '-'}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{vehiculo.placas || '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
};

export const MedicFormShow = () => {
    const { permissions } = usePermissions();
    const { record } = useShowController();

    if (permissions !== "paramedico" && permissions !== "admin" && permissions !== "jefe") {
        return <p>No tienes permiso para acceder a este reporte.</p>;
    }

    if (!record) return null;

    return (
        <Show>
            <Box sx={{ p: 3 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h4" sx={{ mb: 3 }}>
                        Reporte Médico - Folio: {record.folio}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <InfoRow label="Folio" value={record.folio} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <InfoRow label="Turno" value={record.turno} />
                        </Grid>
                    </Grid>
                </Paper>

                <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
                    Información Principal
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">I. Datos del Servicio</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                                    Cronometría
                                </Typography>
                                <InfoRow label="Fecha" value={record.fecha} />
                                <InfoRow label="Hora de Llamada" value={record.hora_llamada} />
                                <InfoRow label="Hora de Traslado" value={record.hora_traslado} />
                                <InfoRow label="Hora de Salida" value={record.hora_salida} />
                                <InfoRow label="Hora de Hospital" value={record.hora_hospital} />
                                <InfoRow label="Hora de Llegada" value={record.hora_llegada} />
                                
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
                                    Ubicación
                                </Typography>
                                <InfoRow label="Calle" value={record.calle} />
                                <InfoRow label="Entre" value={record.entre} />
                                <InfoRow label="Colonia (Servicio)" value={record.colonia_servicio} />
                                <InfoRow label="Alcaldía (Servicio)" value={record.alcaldia_servicio} />
                                <InfoRow label="Lugar de ocurrencia" value={record.lugar} />
                                <InfoRow label="Especifique otro lugar" value={record.lugar_otro} />
                                
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>
                                    Tipo de Servicio
                                </Typography>
                                <InfoRow label="Ginecobstetricia" value={record.ginecobstetricia} />
                                <InfoRow label="Traumatismo" value={record.traumatismo} />
                                <InfoRow label="Enfermedad" value={record.enfermedad} />
                            </AccordionDetails>
                        </Accordion>

                        <PartoSection record={record} />
                        <TraumatismoSection record={record} />
                        <EnfermedadSection record={record} />
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">II. Control</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Número de Ambulancia" value={record.num_ambulancia} />
                                <InfoRow label="Operador" value={record.operador} />
                                <InfoRow label="T.U.M." value={record.tum} />
                                <InfoRow label="Socorrista" value={record.socorrista} />
                                <InfoRow label="Matrícula de Helicóptero" value={record.helicoptero} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">III. Paciente</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Nombre del Paciente" value={record.paciente_nombre} />
                                <InfoRow label="Sexo de Paciente" value={record.sexo_paciente} />
                                <InfoRow label="Años" value={record.años} />
                                <InfoRow label="Meses" value={record.meses} />
                                <InfoRow label="Domicilio" value={record.domicilio} />
                                <InfoRow label="Colonia (Paciente)" value={record.colonia_paciente} />
                                <InfoRow label="Alcaldía (Paciente)" value={record.alcaldia_paciente} />
                                <InfoRow label="Derechohabiente a" value={record.derechohabiencia} />
                                <InfoRow label="Teléfono" value={record.telefono} />
                                <InfoRow label="Ocupación" value={record.ocupacion} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
                    Evaluación Médica
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">VII. Evaluación Inicial</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Nivel de consciencia" value={record.nivel_consciencia} />
                                <InfoRow label="Deglución" value={record.deglucion} />
                                <InfoRow label="Vía aérea" value={record.via_aerea} />
                                <InfoRow label="Ventilación" value={record.ventilacion} />
                                <InfoRow label="Auscultación" value={record.auscultacion} />
                                <InfoRow label="Hemitórax" value={record.hemitorax} />
                                <InfoRow label="Sitio" value={record.sitio} />
                                <InfoRow label="Pulsos" value={record.pulsos} />
                                <InfoRow label="Piel" value={record.piel} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">VIII. Evaluación Secundaria</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Exploración física" value={record.exploracion_fisica} />
                                <InfoRow label="Pupilas" value={record.pupilas} />
                                
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                                    Signos Vitales
                                </Typography>
                                <SignosVitalesTable signos={record.signos_vitales} />
                                
                                <Box sx={{ mt: 3 }}>
                                    <InfoRow label="Glasgow Total" value={record.glasgow} />
                                    <InfoRow label="Alergias" value={record.alergias} />
                                    <InfoRow label="Medicamentos en ingesta" value={record.medicamentos} />
                                    <InfoRow label="Padecimientos/cirugías" value={record.padecimientos} />
                                    <InfoRow label="Última comida" value={record.ultima_comida} />
                                    <InfoRow label="Eventos previos" value={record.eventos_previos} />
                                    <InfoRow label="Condición" value={record.condicion} />
                                    <InfoRow label="Prioridad" value={record.prioridad} />
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">IX. Traslado</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Institución de traslado" value={record.institucion} />
                                <InfoRow label="Hospital" value={record.hospital} />
                                <InfoRow label="Doctor" value={record.doctor_traslado} />
                                <InfoRow label="Folio CRU" value={record.folio_cru} />
                                <InfoRow label="¿Se negó?" value={record.seNego} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
                    Tratamiento y Observaciones
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">X. Tratamiento</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Vía aérea" value={record.via_aerea_trat} />
                                <InfoRow label="Control cervical" value={record.control_cervical} />
                                
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                                    Tratamientos
                                </Typography>
                                <TratamientosTable tratamientos={record.tratamientos} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">XI. Observaciones</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Pertenencias" value={record.pertenencias} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                <Typography variant="h5" sx={{ mb: 3, mt: 4 }}>
                    Información Legal
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">XII. Ministerio Público</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Notificado?" value={record.mp_notificado} />
                                <InfoRow label="Responsable" value={record.mp_responsable} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Accordion defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6">XIII. Datos Legales</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <InfoRow label="Dependencia" value={record.dependencia} />
                                <InfoRow label="Número de unidad" value={record.unidad} />
                                <InfoRow label="Número de oficiales" value={record.oficiales} />
                                
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
                                    Vehículos
                                </Typography>
                                <VehiculosTable vehiculos={record.vehiculos} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                </Grid>

                {record.fotos && record.fotos.length > 0 && (
                    <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Fotografías Adjuntas
                        </Typography>
                        <Grid container spacing={2}>
                            {record.fotos.map((foto: any, index: number) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <img 
                                        src={foto.src} 
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                )}
            </Box>
        </Show>
    );
};

const MedicFormFilters = [
    <TextInput
        key="q"
        label="Buscar por folio o paciente"
        source="q"
        alwaysOn
        sx={{ minWidth: 220 }}
    />,
    <SelectInput
        key="operador"
        label="Operador"
        source="operador"
        alwaysOn
        choices={[
            { id: "Juan Pérez", name: "Juan Pérez" },
            { id: "Sofía Hernández", name: "Sofía Hernández" },
            { id: "Roberto García", name: "Roberto García" },
            { id: "Pedro Chávez", name: "Pedro Chávez" },
            { id: "Jesús Ochoa", name: "Jesús Ochoa" },
        ]}
        sx={{ minWidth: 180 }}
    />,
    <SelectInput
        key="socorrista"
        label="Paramédico"
        source="socorrista"
        alwaysOn
        choices={[
            { id: "María López", name: "María López" },
            { id: "Carlos Ruiz", name: "Carlos Ruiz" },
            { id: "Laura Montes", name: "Laura Montes" },
            { id: "Ana Torres", name: "Ana Torres" },
            { id: "Mónica Gil", name: "Mónica Gil" },
        ]}
        sx={{ minWidth: 180 }}
    />,
    <SelectInput
        key="condicion"
        label="Condición"
        source="condicion"
        alwaysOn
        choices={[
            { id: "critico", name: "Crítico" },
            { id: "no_critico", name: "No Crítico" },
            { id: "estable", name: "Estable" },
            { id: "inestable", name: "Inestable" },
        ]}
        sx={{ minWidth: 160 }}
    />,
    <SelectInput
        key="prioridad"
        label="Prioridad"
        source="prioridad"
        alwaysOn
        choices={[
            { id: "rojo", name: "Rojo" },
            { id: "amarillo", name: "Amarillo" },
            { id: "verde", name: "Verde" },
            { id: "negro", name: "Negro" },
        ]}
        sx={{ minWidth: 160 }}
    />,
    <DateInput
        key="fecha"
        label="Fecha del servicio"
        source="fecha"
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

export const MedicFormList = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const { permissions, isLoading } = usePermissions();
    
    if (isLoading) return <p>Cargando permisos...</p>;
    
    return (
        <List
            title="Reportes de Emergencia Médica - Atención Prehospitalaria"
            filters={MedicFormFilters}
            actions={<ListActions />}
            exporter={defaultExporter}
            perPage={25}
            sort={{ field: "fecha", order: "DESC" }}
            sx={{
                "& .RaList-main": {
                    width: "100%",
                },
            }}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.folio}
                    secondaryText={(record) => formatDateYMD(record.fecha)}
                    tertiaryText={(record) => record.paciente_nombre}
                />
            ) : (
                <DataTable
                    sx={{
                        width: "100%",
                        "& .RaDataTable-table": {
                            tableLayout: "fixed",
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
                    <DataTable.Col label="Fecha">
                        <FunctionField render={(record: any) => formatDateYMD(record.fecha)} />
                    </DataTable.Col>
                    <DataTable.Col source="turno" label="Turno" />
                    <DataTable.Col source="operador" label="Operador" />
                    <DataTable.Col source="socorrista" label="Paramédico" />
                    <DataTable.Col source="paciente_nombre" label="Paciente" />
                    <DataTable.Col source="hospital" label="Hospital" />
                    <DataTable.Col label="Acciones">
                        <ShowButton
                            label="Ver"
                            icon={<VisibilityIcon sx={{ mr: 0.5 }} />}
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
    );
};