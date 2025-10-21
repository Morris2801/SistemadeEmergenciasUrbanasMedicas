import React, { useEffect, useState } from "react";
import { usePermissions, useDataProvider } from "react-admin";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

interface Stats {
  tiempoRespuestaPromedio: number; 
  totalTicketsMedic: number;
  totalTicketsUrban: number;
  tiposAccidenteRanked: string[];
  casosPorPrioridad: Record<string, number>;
  casosCriticos: number;
  kmRecorridosTotales: number;
  serviciosPorGravedad: Record<string, number>;
  operadoresPorTurno: Record<string, number>; 
}

export const Estadisticas: React.FC = () => {
  const { permissions } = usePermissions();
  const dataProvider = useDataProvider();

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [medicRes, urbanRes] = await Promise.all([
          dataProvider.getList("medicForm", {
            pagination: { page: 1, perPage: 100 },
            sort: { field: "fecha", order: "DESC" },
            filter: {},
          }),
          dataProvider.getList("urbanForm", {
            pagination: { page: 1, perPage: 100 },
            sort: { field: "fecha", order: "DESC" },
            filter: {},
          }),
        ]);

        const medic = medicRes.data;
        const urban = urbanRes.data;

     const operadoresPorTurnoSet: Record<string, Set<string>> = {};

    urban.forEach((m: any) => {
      const turno = m.turno;
      const operador = m.operador || "Desconocido";

      if (!turno) return;

      if (!operadoresPorTurnoSet[turno]) {
        operadoresPorTurnoSet[turno] = new Set();
      }

      operadoresPorTurnoSet[turno].add(operador);
    });

    const operadoresPorTurnoCount: Record<string, number> = {};

Object.entries(operadoresPorTurnoSet).forEach(([turno, set]) => {
  operadoresPorTurnoCount[turno] = set.size;
});
        const tiempos: number[] = medic
          .map((m: any) => {
            if (m.hora_llamada && m.hora_llegada) {
              const call = new Date(`1970-01-01T${m.hora_llamada}:00`);
              const arr = new Date(`1970-01-01T${m.hora_llegada}:00`);
              const diff = (arr.getTime() - call.getTime()) / 60000;
              return diff >= 0 ? diff : null;
            }
            return null;
          })
          .filter((v): v is number => v !== null);
        const tiempoRespuestaPromedio =
          tiempos.length > 0
            ? tiempos.reduce((a, b) => a + b, 0) / tiempos.length
            : 0;

        const totalTicketsMedic = medicRes.total || 0;
        const totalTicketsUrban = urbanRes.total || 0;

        const tipoCount: Record<string, number> = {};
        medic.forEach((m: any) => {
          const tipo = m.agente_causal || m.agente_causal_otro || "Desconocido";
          tipoCount[tipo] = (tipoCount[tipo] || 0) + 1;
        });
        const tiposAccidenteRanked = Object.entries(tipoCount)
          .sort((a, b) => b[1] - a[1])
          .map(([tipo, cnt]) => `${tipo} (${cnt})`);

        const casosPorPrioridad: Record<string, number> = {};
        medic.forEach((m: any) => {
          const p = m.prioridad || "N/A";
          casosPorPrioridad[p] = (casosPorPrioridad[p] || 0) + 1;
        });
        
        const casosCriticos = medic.filter(
          (m: any) =>
            m.condicion?.toLowerCase() === "critico" ||
            m.prioridad?.toLowerCase() === "rojo"
        ).length;

        const kmRecorridosTotales = urban.reduce(
          (acc: number, cur: any) => acc + (cur.km_recorridos || 0),
          0
        );

        const serviciosPorGravedad: Record<string, number> = {};
        urban.forEach((u: any) => {
          const gravedad = u.gravedad || "N/A";
          serviciosPorGravedad[gravedad] = (serviciosPorGravedad[gravedad] || 0) + 1;
        });

        setStats({
          operadoresPorTurno: operadoresPorTurnoCount,
          tiempoRespuestaPromedio,
          totalTicketsMedic,
          totalTicketsUrban,
          tiposAccidenteRanked,
          casosPorPrioridad,
          casosCriticos,
          kmRecorridosTotales,
          serviciosPorGravedad,
        });
      } catch (err) {
        console.error("Error in Estadisticas:", err);
        setError("Error al cargar estadísticas");
      } finally {
        setLoading(false);
      }
    };

    if (permissions === "admin" || permissions === "jefe") {
      load();
    } else if (permissions) {
      setLoading(false);
    }
  }, [permissions, dataProvider]);

  if (permissions && permissions !== "admin" && permissions !== "jefe") {
    return <Alert severity="error">No tienes acceso a estadísticas.</Alert>;
  }
  if (loading || !permissions) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  if (!stats) {
    return null;
  }

  return (
  <Card>
    <CardHeader
      title="Estadísticas Avanzadas"
      titleTypographyProps={{ fontWeight: 'bold' }}
    />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        Información Prehospitalaria
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="Tickets Atención"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={stats.totalTicketsMedic}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Tiempo de respuesta promedio"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={`${stats.tiempoRespuestaPromedio.toFixed(1)} minutos`}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Casos por prioridad"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={
              <Box>
                {Object.entries(stats.casosPorPrioridad).map(([p, cnt]) => (
                  <Chip
                    key={p}
                    label={`${p}: ${cnt}`}
                    size="small"
                    color="secondary"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Casos críticos / rojos"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={stats.casosCriticos}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Tipos de accidentes más comunes"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={
              <List dense disablePadding>
                {stats.tiposAccidenteRanked.map((s, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <Typography variant="body2">{s}</Typography>
                  </ListItem>
                ))}
              </List>
            }
          />
        </ListItem>
      </List>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h6" gutterBottom>
        Información Urbana
      </Typography>
      <List dense>
        <ListItem>
          <ListItemText
            primary="Tickets Urbanos"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={stats.totalTicketsUrban}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Kilómetros recorridos totales"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={`${stats.kmRecorridosTotales.toFixed(1)} km`}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Servicios por gravedad"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={
              <Box>
                {Object.entries(stats.serviciosPorGravedad).map(([g, cnt]) => (
                  <Chip
                    key={g}
                    label={`${g}: ${cnt}`}
                    size="small"
                    color="success"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            }
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary="Operadores por turno"
            primaryTypographyProps={{ fontWeight: 'bold' }}
            secondary={
              <Box>
                {Object.entries(stats.operadoresPorTurno).map(([turno, count]) => (
                  <Chip
                    key={turno}
                    label={`${turno}: ${count} operador${count !== 1 ? "es" : ""}`}
                    size="small"
                    color="primary"
                    sx={{ mr: 1, mb: 0.5 }}
                  />
                ))}
              </Box>
            }
          />
        </ListItem>
      </List>
    </CardContent>
  </Card>
);
};