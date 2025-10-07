import { useMediaQuery, Theme } from "@mui/material";
import { List, SimpleList, DataTable, Edit, SimpleForm, ReferenceInput, TextInput, EditButton, Show, Create, required, SelectInput,} from "react-admin";

export const UserList = () => {
    const isSmall = useMediaQuery<Theme>((theme) =>
        theme.breakpoints.down("sm")
    );
    return (
        <List>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.name}
                    secondaryText={(record) => record.username}
                    tertiaryText={(record) => record.rol}
                />
            ) : (
                <DataTable>
                    <DataTable.Col source="id" label="ID" />
                    <DataTable.Col source="name" label="Nombre" />
                    <DataTable.Col source="username" label="Usuario" />
                    <DataTable.Col source="password" label="Contraseña" />
                    <DataTable.Col source="turno" label="Turno" />
                    <DataTable.Col source="phone" label="Teléfono" />
                    <DataTable.Col source="rol" label="Rol"/>
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
            <TextInput required source="password" label="Contraseña" type="password" />
            <TextInput required source="turno" label="Turno" />
            <TextInput required source="phone" label="Teléfono" />
            <TextInput required source="rol" label="Rol" />
        </SimpleForm>
    </Edit>
);

export const UserShow = () => (
    <Show>
        <SimpleForm>
            <TextInput disabled source="id" label="ID" />
            <TextInput required source="name" label="Nombre" />
            <TextInput required source="username" label="Usuario" />
            <TextInput required source="password" label="Contraseña" type="password" />
            <TextInput required source="turno" label="Turno" />
            <TextInput required source="phone" label="Teléfono" />
            <TextInput required source="rol" label="Rol" />
        </SimpleForm>
    </Show>
);

export const UserCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput disabled source="id" label="ID" />
            <TextInput required source="name" label="Nombre" />
            <TextInput required source="username" label="Usuario" />
            <TextInput required source="password" label="Contraseña" type="password" />
            <TextInput required source="turno" label="Turno" />
            <TextInput required source="phone" label="Teléfono" />
            <SelectInput source="rol" label="Rol" validate={required()}
                 choices={[
                    { id: "administrador", name: 'Administrador' },
                    { id: "jefe", name: "Jefe de Turno" },
                    { id: "paramedico", name: "Paramédico" },
                    { id: "operador", name: "Operador" },
                ]}
            />
        </SimpleForm>
    </Create>
);