import React from "react";
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Alert, useTheme
} from "@mui/material";
import { usePermissions } from "react-admin";
import {useMediaQuery, Theme} from '@mui/material'

const ManualUsuario: React.FC = () => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
  const { permissions, isLoading } = usePermissions();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Cargando permisos...</Typography>
      </Box>
    );
  }

  if (
    permissions !== "paramedico" &&
    permissions !== "admin" &&
    permissions !== "jefe"
  ) {
    return <p>No tienes permiso para acceder a este formulario.</p>;
  }

  return (
    <Box
      sx={{
        maxWidth: 1000,
        mx: "auto",
        p: 4,
        fontFamily: "Roboto, sans-serif",
        color: theme.palette.text.primary,
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{color: theme.palette.text.primary}}>
        Manual de Usuario del Sistema de Atención Prehospitalaria y Emergencias Urbanas
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom  sx={{color: theme.palette.text.primary}}>
        Índice
      </Typography>
      <List dense  sx={{color: theme.palette.text.primary}}>
        {[
          "Introducción",
          "Roles de Usuario",
          "Accesos por Rol",
          "Instrucciones de Acceso",
          "Guía de Uso por Rol",
          "Explicación de la Interfaz",
          "Gestión de Datos",
          "Errores Comunes y Soluciones",
          "Módulo: Atención Prehospitalaria",
          "Módulo: Emergencias Urbanas",
          "Módulo: Administración",
          "Formulario Médico - Detalle del Reporte",
          "Soporte Técnico",
        ].map((item, i) => (
          <ListItem key={i} sx={{ py: 0 }}>
            <ListItemText primary={`${i + 1}. ${item}`} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 3 }} />

      {/* Introducción */}
      <Typography variant="h5" gutterBottom  sx={{color: theme.palette.text.primary}}>
        Introducción
      </Typography>
      <Typography sx={{color: theme.palette.text.primary}} paragraph>
        Este sistema permite registrar, consultar y administrar información relacionada con
        <strong> emergencias urbanas </strong> y <strong> atención prehospitalaria </strong> para la
        <strong> Alcaldía de Cuajimalpa</strong>. Cada usuario tiene funciones específicas definidas
        por su rol dentro del sistema.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Roles */}
      <Typography variant="h5" gutterBottom  sx={{color: theme.palette.text.primary}}>
        Roles de Usuario
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Rol</strong></TableCell>
            <TableCell><strong>Descripción</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Paramédico</TableCell>
            <TableCell>Puede crear y consultar reportes de emergencias.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jefe de Turno</TableCell>
            <TableCell>Visualiza todos los reportes registrados, sin editar.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Administrador</TableCell>
            <TableCell>Acceso total a reportes, estadísticas y gestión de usuarios.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Operador</TableCell>
            <TableCell>Responsable del ingreso inicial de datos.</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider sx={{ my: 3 }} />

      {/* Accesos por rol */}
      <Typography variant="h5" gutterBottom>
        Accesos por Rol
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Funcionalidad</strong></TableCell>
            <TableCell>Administrador</TableCell>
            <TableCell>Paramédico</TableCell>
            <TableCell>Jefe de Turno</TableCell>
            <TableCell>Operador</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Ver Dashboard</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>❌</TableCell>
            <TableCell>❌</TableCell>
            <TableCell>❌</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ver estadísticas</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>❌</TableCell>
            <TableCell>❌</TableCell>
            <TableCell>❌</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Crear / Editar / Eliminar reportes</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>❌</TableCell>
            <TableCell>❌</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Ver reportes</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>❌</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Crear usuarios nuevos</TableCell>
            <TableCell>✅</TableCell>
            <TableCell>❌</TableCell>
            <TableCell>❌</TableCell>
            <TableCell>❌</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider sx={{ my: 3 }} />

      {/* Instrucciones */}
      <Typography variant="h5" gutterBottom>
        Instrucciones de Acceso
      </Typography>
      <Typography paragraph>
        El sistema está disponible en el navegador web en: <strong>http://127.0.0.1:5173/</strong>.
        También puede ejecutarse localmente desde el entorno de desarrollo (React + Vite).
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold">
        Requisitos técnicos:
      </Typography>
      <List>
        <ListItem>Navegador recomendado: Google Chrome (v110+) o Microsoft Edge</ListItem>
        <ListItem>Conexión estable a Internet o red local</ListItem>
        <ListItem>Cuenta de usuario proporcionada por el Administrador</ListItem>
      </List>
      <Typography variant="subtitle1" fontWeight="bold">
        Proceso de inicio de sesión:
      </Typography>
      <List>
        <ListItem>1. Ingrese a la URL del sistema</ListItem>
        <ListItem>2. Escriba su usuario y contraseña</ListItem>
        <ListItem>3. Presione "Iniciar sesión"</ListItem>
        <ListItem>4. Si las credenciales son correctas, accederá al panel principal</ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      {/* Guía de uso por rol */}
      <Typography variant="h5" gutterBottom>
        Guía de Uso por Rol
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold">Paramédico</Typography>
      <Typography paragraph>
        Desde el panel principal, seleccione "Emergencia Médica", cree un nuevo reporte, complete los datos del paciente, servicio y tratamientos, y presione "Guardar".
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold">Administrador</Typography>
      <Typography paragraph>
        Puede gestionar usuarios, revisar estadísticas, acceder a formularios médicos o urbanos y exportar reportes en formato CSV.
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold">Operador</Typography>
      <Typography paragraph>
        Registra los datos iniciales del evento, como folio, turno, dirección y tipo de servicio.
      </Typography>

      <Typography variant="subtitle1" fontWeight="bold">Jefe de Turno</Typography>
      <Typography paragraph>
        Visualiza todos los reportes registrados, aplica filtros por fecha o prioridad y exporta los resultados en formato CSV.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Explicación de interfaz */}
      <Typography variant="h5" gutterBottom>
        Explicación de la Interfaz
      </Typography>
      <Typography paragraph>
        El menú principal incluye las secciones: Inicio, Emergencia Médica, Emergencia Urbana, Usuarios y Salir.
        Los botones azules representan acciones principales como guardar, ver o exportar.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Gestión de datos */}
      <Typography variant="h5" gutterBottom>
        Gestión de Datos
      </Typography>
      <Typography paragraph>
        Los reportes se guardan al presionar "Guardar". Si se cierra sesión sin guardar, los cambios se pierden.
        Los datos pueden exportarse mediante el botón "Exportar CSV".
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Errores comunes */}
      <Typography variant="h5" gutterBottom>
        Errores Comunes y Soluciones
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Problema</strong></TableCell>
            <TableCell><strong>Causa</strong></TableCell>
            <TableCell><strong>Solución</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>No se guarda un reporte</TableCell>
            <TableCell>Campos obligatorios vacíos</TableCell>
            <TableCell>Verificar los campos marcados con *</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Error 401 Unauthorized</TableCell>
            <TableCell>Sesión expirada o token inválido</TableCell>
            <TableCell>Cerrar sesión y volver a iniciar</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Error de conexión</TableCell>
            <TableCell>Internet inestable o backend caído</TableCell>
            <TableCell>Revisar conexión o reiniciar servidor</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Divider sx={{ my: 3 }} />

      {/* Módulos */}
      <Typography variant="h5" gutterBottom>
        Módulo: Atención Prehospitalaria
      </Typography>
      <Typography paragraph>
        Permite registrar y gestionar la atención médica, incluyendo datos de servicio, paciente, causas clínicas o traumáticas, evaluación, traslado, tratamiento y observaciones.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Módulo: Emergencias Urbanas
      </Typography>
      <Typography paragraph>
        Gestiona eventos como incendios, colapsos o explosiones. Incluye campos como folio, fecha, hora, ubicación, tipo de emergencia, tiempo de atención, dictamen, fotografías y dependencias participantes.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Módulo: Administración
      </Typography>
      <Typography paragraph>
        Permite gestionar usuarios y roles, consultar estadísticas generales y acceder a reportes médicos o urbanos.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Formulario Médico - Detalle del Reporte
      </Typography>
      <Typography paragraph>
        Contiene todos los campos clínicos y operativos necesarios para registrar la atención prehospitalaria.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Soporte */}
      <Typography variant="h5" gutterBottom>
        Soporte Técnico
      </Typography>
      <Typography paragraph>
        Para incidencias técnicas, errores o recuperación de acceso, comuníquese con el Administrador del sistema o el equipo de soporte técnico de la alcaldía.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" color="text.secondary" align="center">
        Desarrollado para: Alcaldía de Cuajimalpa — Tecnologías: React, Node.js, MongoDB
      </Typography>
    </Box>
  );
};

export default ManualUsuario;
