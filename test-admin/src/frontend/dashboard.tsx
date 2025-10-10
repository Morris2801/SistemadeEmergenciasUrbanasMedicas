import React from "react";
import { usePermissions } from "react-admin";
import { Card, CardHeader, CardContent } from "@mui/material";

export const Dashboard: React.FC = () => {
  const { permissions } = usePermissions();

  if (permissions !== "admin") {
    return <p>No tienes permiso para acceder a este formulario.</p>;
  }

  return (
    <Card>
      <CardHeader title="Dashboard" />
      <CardContent>
        <p>Bienvenido al panel de administración. Aquí puedes ver información general y estadísticas resumidas.</p>
        <p>Contenido random: {Math.floor(Math.random() * 1000)}</p>
      </CardContent>
    </Card>
  );
};