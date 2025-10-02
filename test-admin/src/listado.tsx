import { List, DataTable, EditButton, Edit, Show, SimpleForm, TextInput, Create, DateInput, TimeInput, SelectInput, NumberInput, BooleanInput, ShowButton, TextField, DateField, BooleanField, required, usePermissions } from "react-admin";
import { Chip } from "@mui/material";

// Campo personalizado para mostrar prioridad con colores
const PriorityField = ({ record }: any) => {
    const getColor = (priority: string) => {
        switch (priority) {
            case 'rojo': return 'error';
            case 'amarillo': return 'warning';
            case 'verde': return 'success';
            case 'negro': return 'default';
            default: return 'default';
        }
    };

    return <Chip label={record?.prioridad} color={getColor(record?.prioridad)} size="small" />;
};

// Campo personalizado para mostrar condición con colores
const ConditionField = ({ record }: any) => {
    const getColor = (condition: string) => {
        switch (condition) {
            case 'critico': return 'error';
            case 'inestable': return 'warning';
            case 'estable': return 'success';
            case 'no_critico': return 'info';
            default: return 'default';
        }
    };

    return <Chip label={record?.condicion} color={getColor(record?.condicion)} size="small" />;
};

export const EmergencyList = () => {
    const { permissions } = usePermissions();

    if (permissions !== "jefe" && permissions !== "admin") {
        return <p>No tienes permiso para acceder a este listado.</p>;
    }

    return (
        <List title="Listado de Emergencias">
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha">
                    <DateField source="fecha" />
                </DataTable.Col>
                <DataTable.Col source="hora_llamada" label="Hora Llamada" />
                <DataTable.Col source="paciente_nombre" label="Paciente" />
                <DataTable.Col source="alcaldia" label="Alcaldía" />
                <DataTable.Col source="operador" label="Operador" />
                <DataTable.Col source="prioridad" label="Prioridad">
                    <PriorityField />
                </DataTable.Col>
                <DataTable.Col source="condicion" label="Condición">
                    <ConditionField />
                </DataTable.Col>
                <DataTable.Col>
                    <ShowButton />
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export const EmergencyCreate = () => (
    <Create title="Crear Nueva Emergencia">
        <SimpleForm>
            <TextInput source="folio" label="Folio" validate={required()} />
            <DateInput source="fecha" label="Fecha" validate={required()} />
            <TimeInput source="hora_llamada" label="Hora de Llamada" validate={required()} />
            <TimeInput source="hora_llegada" label="Hora de Llegada" validate={required()} />
            <TextInput source="calle" label="Calle" validate={required()} />
            <TextInput source="colonia" label="Colonia" validate={required()} />
            <TextInput source="alcaldia" label="Alcaldía" validate={required()} />
            <TextInput source="operador" label="Operador" validate={required()} />
            <TextInput source="socorrista" label="Socorrista" validate={required()} />
            <TextInput source="paciente_nombre" label="Nombre del Paciente" validate={required()} />
            <SelectInput source="sexo" label="Sexo" validate={required()}
                choices={[
                    { id: "masculino", name: 'Masculino' },
                    { id: "femenino", name: "Femenino" },
                ]}
            />
            <NumberInput source="años" label="Años" validate={required()} />
            <BooleanInput source="enfermedad" label="Enfermedad" />
            <BooleanInput source="traumatismo" label="Traumatismo" />
            <BooleanInput source="ginecobstetricia" label="Ginecobstetricia" />
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
        </SimpleForm>
    </Create>
);

export const EmergencyEdit = () => (
    <Edit title="Editar Emergencia">
        <SimpleForm>
            <TextInput disabled source="id" label="ID" />
            <TextInput source="folio" label="Folio" validate={required()} />
            <DateInput source="fecha" label="Fecha" validate={required()} />
            <TimeInput source="hora_llamada" label="Hora de Llamada" validate={required()} />
            <TimeInput source="hora_llegada" label="Hora de Llegada" validate={required()} />
            <TextInput source="calle" label="Calle" validate={required()} />
            <TextInput source="colonia" label="Colonia" validate={required()} />
            <TextInput source="alcaldia" label="Alcaldía" validate={required()} />
            <TextInput source="operador" label="Operador" validate={required()} />
            <TextInput source="socorrista" label="Socorrista" validate={required()} />
            <TextInput source="paciente_nombre" label="Nombre del Paciente" validate={required()} />
            <SelectInput source="sexo" label="Sexo" validate={required()}
                choices={[
                    { id: "masculino", name: 'Masculino' },
                    { id: "femenino", name: "Femenino" },
                ]}
            />
            <NumberInput source="años" label="Años" validate={required()} />
            <BooleanInput source="enfermedad" label="Enfermedad" />
            <BooleanInput source="traumatismo" label="Traumatismo" />
            <BooleanInput source="ginecobstetricia" label="Ginecobstetricia" />
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
        </SimpleForm>
    </Edit>
);

export const EmergencyShow = () => (
    <Show title="Detalles de Emergencia">
        <SimpleForm>
            <TextField source="id" label="ID" />
            <TextField source="folio" label="Folio" />
            <DateField source="fecha" label="Fecha" />
            <TextField source="hora_llamada" label="Hora de Llamada" />
            <TextField source="hora_llegada" label="Hora de Llegada" />
            <TextField source="calle" label="Calle" />
            <TextField source="colonia" label="Colonia" />
            <TextField source="alcaldia" label="Alcaldía" />
            <TextField source="operador" label="Operador" />
            <TextField source="socorrista" label="Socorrista" />
            <TextField source="paciente_nombre" label="Nombre del Paciente" />
            <TextField source="sexo" label="Sexo" />
            <TextField source="años" label="Años" />
            <BooleanField source="enfermedad" label="Enfermedad" />
            <BooleanField source="traumatismo" label="Traumatismo" />
            <BooleanField source="ginecobstetricia" label="Ginecobstetricia" />
            <TextField source="condicion" label="Condición" />
            <TextField source="prioridad" label="Prioridad" />
        </SimpleForm>
    </Show>
);

// Exportar también el componente principal para compatibilidad
export const Listado = EmergencyList;