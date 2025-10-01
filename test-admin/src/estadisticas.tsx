import React from "react";
import { usePermissions } from "react-admin";
import { Card, CardHeader, CardContent } from "@mui/material";

export const Estadisticas: React.FC = () => {
  const { permissions } = usePermissions();

  if (permissions !== "admin") {
    return <p>No tienes permiso para acceder a este formulario.</p>;
  }

  return (
    <Card>
      <CardHeader title="Estadísticas" />
      <CardContent>
        <p>Aquí podrías mostrar gráficos, métricas o resúmenes.</p>
        <p>Número aleatorio de ejemplo: {Math.floor(Math.random() * 500)}</p>
      </CardContent>
    </Card>
  );
};