// src/urbanForm.tsx
import React from 'react';
import {
  Create,
  List,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  ShowButton,
  Show,
  SimpleShowLayout,
  TextInput,
  DateInput,
  TimeInput,
  NumberInput,
  SelectInput,
  ArrayField,
  NumberField,
  ImageField,
  Edit,
  ArrayInput,
  SimpleFormIterator,
  SimpleForm
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';
import { UrbanFormImproved } from './UrbanFormImproved';

export const UrbanFormCreate = () => {
  return (
    <Create resource="urbanForm">
      <UrbanFormImproved />
    </Create>
  );
};

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

    </SimpleForm>
  </Edit>
);
