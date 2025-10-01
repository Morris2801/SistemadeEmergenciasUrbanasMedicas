import React from "react";
import { usePermissions } from "react-admin";
import { Card, CardHeader, CardContent } from "@mui/material";

export const Listado: React.FC = () => {
  const { permissions } = usePermissions();

  if (permissions !== "jefe") {
    return <p>No tienes permiso para acceder a este formulario.</p>;
  }

  return (
    <Card>
      <CardHeader title="Listado" />
      <CardContent>
        <p>Esta es la página de listado. Puedes imaginar aquí tablas o listas de datos.</p>
        <p>Elemento random: {Math.random().toString(36).substring(2, 8)}</p>
      </CardContent>
    </Card>
  );
};