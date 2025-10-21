import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Edit, SimpleForm, TextField, TextInput, EditButton, Show, Create, required, SelectInput, SimpleShowLayout, SelectField } from "react-admin";

const turnoChoices = [
    { id: 'Lunes a Viernes - 8am a 3pm', name: 'Lunes a Viernes - 8am a 3pm' },
    { id: 'Lunes a Viernes - 3pm a 9pm', name: 'Lunes a Viernes - 3pm a 9pm' },
    { id: 'Lunes, Miércoles y Viernes - 9pm a 8am', name: 'Lunes, Miércoles y Viernes - 9pm a 8am' },
    { id: 'Martes, Jueves y Domingo - 9pm a 8am' , name: 'Martes, Jueves y Domingo - 9pm a 8am' },
    { id: 'Sábado, Domingo y festivos - 8am a 8pm', name: 'Sábado, Domingo y festivos - 8am a 8pm' },
    { id: 'Sábado, Domingo y festivos - 8pm a 8am', name: 'Sábado, Domingo y festivos - 8pm a 8am' },
];

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.down("sm")
    );
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.username}
                    secondaryText={(record) => record.name}
                    tertiaryText={(record) => record.tipo}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="username" label="Usuario" />
                    <DataTable.Col source="name" label="Nombre" />
                    <DataTable.Col source="tipo" label="Tipo" />
                    <DataTable.Col source="turno" label="Turno" />
                    <DataTable.Col source="phone" label="Teléfono" />
                    <DataTable.Col label="Acciones">
                        <EditButton label="Editar" />
                    </DataTable.Col>
                </DataTable>
            )}
        </List>
    );
};

export const UserEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" label="ID" />
            <TextInput required source="name" label="Nombre" />
            <TextInput required source="username" label="Usuario" />
            <TextInput source="password" label="Contraseña" type="password" helperText="Dejar vacío para no cambiar" />
            <SelectInput source="tipo" label="Tipo" validate={required()}
                choices={[
                    { id: "admin", name: 'Administrador' },
                    { id: "jefe", name: "Jefe de Turno" },
                    { id: "paramedico", name: "Paramédico" },
                    { id: "operador", name: "Operador" },
                ]}
            />
            <TextInput required source="turno" label="Turno" />
            <TextInput required source="phone" label="Teléfono" />
        </SimpleForm>
    </Edit>
);

export const UserShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Nombre" />
            <TextField source="username" label="Usuario" />

            <SelectField 
                source="tipo" 
                label="Tipo"
                choices={[
                    { id: "admin", name: 'Administrador' },
                    { id: "jefe", name: "Jefe de Turno" },
                    { id: "paramedico", name: "Paramédico" },
                    { id: "operador", name: "Operador" },
                ]}
            />

            <SelectField
                source="turno"
                label="Turno"
                choices={turnoChoices}
            />

            <TextField source="phone" label="Teléfono" />
        </SimpleShowLayout>
    </Show>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput disabled source="id" label="ID" />
            <TextInput required source="name" label="Nombre" />
            <TextInput required source="username" label="Usuario" />
            <TextInput required source="password" label="Contraseña" type="password" />
            <SelectInput
                source="turno"
                label="Turno"
                choices={turnoChoices}
                validate={required()}
                fullWidth
              />
            <TextInput required source="phone" label="Teléfono" />
            <SelectInput source="tipo" label="Tipo" validate={required()}
                choices={[
                    { id: "admin", name: 'Administrador' },
                    { id: "jefe", name: "Jefe de Turno" },
                    { id: "paramedico", name: "Paramédico" },
                    { id: "operador", name: "Operador" },
                ]}
            />
        </SimpleForm>
    </Create>
);