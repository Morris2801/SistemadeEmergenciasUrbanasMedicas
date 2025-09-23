import React, { useState } from 'react';
import { TextInput, DateInput, TimeInput, required, SelectInput, BooleanInput, FormWithRedirect, SaveButton, Toolbar, }
    from 'react-admin';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MedicForm = (props) => {
    const [motivo, setMotivo] = useState("");
    const [causa,setCausa] = useState("");

    return (
        <FormWithRedirect 
        {...props}
        render = {({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
            {/*Folio*/}
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon = {<ExpandMoreIcon />}>
                    Folio
                </AccordionSummary>
                <AccordionDetails>
                    <TextInput source="folio"/>
                </AccordionDetails>
            </Accordion>

            {/*I. DatosServicio*/}
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon = {<ExpandMoreIcon />}>
                    I. Datos del Servicio
                </AccordionSummary> 
                <AccordionDetails>
                    <DateInput source="fecha" validate={required()}/>
                    <TimeInput source="hora_llamada" validate={required()}/>
                    <TimeInput source="hora_traslado"/>
                    <TimeInput source="hora_salida" />
                    <TimeInput source="hora_hospital" />
                    <TimeInput source="hora_llegada" validate={required()}/>
                    <SelectInput source="motivo" label="Motivo de atención" validate={required()}
                        choices={[
                            { id: 'enfermedad', name: 'Enfermedad' },
                            { id: 'traumatismo', name: 'Traumatismo' },
                            { id: "ginecobstetricia", name: "Ginecobstetricia" },
                        ]}
                        onChange={(e) => setMotivo(e.target.value)}
                    />
                </AccordionDetails>
            
            </Accordion>






                
            </form>
        )}
    )
}