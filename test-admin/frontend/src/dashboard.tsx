import React, { useEffect, useState } from "react";
import { usePermissions, useDataProvider } from "react-admin";
import { Radar } from 'react-chartjs-2';
import { RadarController, RadialLinearScale } from 'chart.js';
import {useMediaQuery, Theme} from '@mui/material'

ChartJS.register(RadarController, RadialLinearScale);

import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    CircularProgress,
    Alert,
} from "@mui/material";
import {
    LocalHospital,
    EmergencyShare,
    People,
    Assessment,
    Warning,
} from "@mui/icons-material";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    RadarController,
    RadialLinearScale
);

interface DashboardStats {
    totalMedicForms: number;
    totalUrbanForms: number;
    totalUsers: number;
    recentMedicForms: any[];
    recentUrbanForms: any[];
    todayForms: number;
    criticalCases: number;
}

const countBySex = (forms: any[]) => {
  const counts = {
    masculino: 0,
    femenino: 0,
    otro: 0,
  };

  forms.forEach((form) => {
    const sexo = (form.sexo_paciente || '').toLowerCase();

    if (sexo === 'masculino') counts.masculino++;
    else if (sexo === 'femenino') counts.femenino++;
    else counts.otro++;
  });

  return counts;
};

const formatDateTime = (date?: string | Date) => {
  if (!date) return 'Sin fecha';
  const d = new Date(date);
  const isValid = !isNaN(d.getTime());
  if (!isValid) return 'Fecha inválida';

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
};

const countByTurno = (forms: any[]) => {
  const counts: Record<string, number> = {};
  forms.forEach((form) => {
    const rawTurno = form.turno || "Desconocido";
    counts[rawTurno] = (counts[rawTurno] || 0) + 1;
  });
  return counts;
};


const countByPriority = (forms: any[]) => {
    const counts: Record<string, number> = { rojo: 0, amarillo: 0, verde: 0, negro: 0, unknown: 0 };
    forms.forEach((form) => {
        const p = form.prioridad?.toLowerCase();
        if (p && counts[p] !== undefined) counts[p]++;
        else counts.unknown++;
    });
    return counts;
};

const countCriticalConditions = (forms: any[]) => {
    let critical = 0;
    let nonCritical = 0;
    forms.forEach((form) => {
        if (form.condicion?.toLowerCase() === "critico") critical++;
        else nonCritical++;
    });
    return { critical, nonCritical };
};

export const Dashboard: React.FC = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const { permissions } = usePermissions();
    const dataProvider = useDataProvider();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                const promises: Promise<any>[] = [];
                
                promises.push(
                    dataProvider.getList('medicForm', { pagination: { page: 1, perPage: 1000 }, sort: { field: 'fecha', order: 'DESC' }, filter: {} }),
                    dataProvider.getList('urbanForm', { pagination: { page: 1, perPage: 1000 }, sort: { field: 'fecha', order: 'DESC' }, filter: {} }),
                    dataProvider.getList('users', { pagination: { page: 1, perPage: 10 }, sort: { field: 'username', order: 'ASC' }, filter: {} })
                );

                const [medicForms, urbanForms, users] = await Promise.all(promises);

                const isToday = (inputDate: any) => {
                    if (!inputDate) return false;

                    const date = new Date(inputDate); 
                    if (isNaN(date.getTime())) return false;

                    const now = new Date();

                    return (
                        date.getFullYear() === now.getFullYear() &&
                        date.getMonth() === now.getMonth() &&
                        date.getDate() === now.getDate()
                    );
                };

                const todayMedicForms = medicForms.data.filter((form: any) =>
                    isToday(form.fecha)
                ).length;

                const todayUrbanForms = urbanForms.data.filter((form: any) =>
                    isToday(form.fecha_hora) || isToday(form.fecha_atencion)
                ).length;

                const criticalCases = medicForms.data.filter((form: any) => 
                    form.prioridad === 'rojo' || form.condicion === 'critico'
                ).length;

                setStats({
                    totalMedicForms: medicForms.total || 0,
                    totalUrbanForms: urbanForms.total || 0,
                    totalUsers: users.total || 0,
                    recentMedicForms: medicForms.data || [],
                    recentUrbanForms: urbanForms.data || [],
                    todayForms: todayMedicForms + todayUrbanForms,
                    criticalCases
                });

            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Error loading dashboard data');
            } finally {
                setLoading(false);
            }
        };

        if (permissions === "admin") {
            fetchDashboardData();
        } else if (permissions) {
            // If permissions are loaded but user is not admin, stop loading
            setLoading(false);
        }
    }, [permissions, dataProvider]);

    // Check if user is admin, if not show unauthorized message
    if (permissions && permissions !== "admin") {
        return (
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    <Typography variant="h6" component="div">
                        Acceso No Autorizado
                    </Typography>
                    <Typography variant="body1">
                        No tienes permiso para acceder a este panel. Solo los administradores pueden ver esta página.
                    </Typography>
                </Alert>
            </Box>
        );
    }

    if (loading || !permissions) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

const StatCard = ({ title, value, icon, color = "primary" }: any) => (
    <Card>
        <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                        {title}
                    </Typography>
                    <Typography variant="h4" component="div">
                        {value}
                    </Typography>
                </Box>
                <Box sx={{ color: `${color}.main` }}>
                    {icon}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'rojo': return 'error';
            case 'amarillo': return 'warning';
            case 'verde': return 'success';
            case 'negro': return 'default';
            default: return 'default';
        }
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Panel de Control - Administrador
            </Typography>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Formularios Hoy"
                        value={stats?.todayForms || 0}
                        icon={<Assessment sx={{ fontSize: 40 }} />}
                        color="primary"
                    />
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Casos Críticos"
                        value={stats?.criticalCases || 0}
                        icon={<Warning sx={{ fontSize: 40 }} />}
                        color="error"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Reportes Médicos"
                        value={stats?.totalMedicForms || 0}
                        icon={<LocalHospital sx={{ fontSize: 40 }} />}
                        color="success"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Emergencias Urbanas"
                        value={stats?.totalUrbanForms || 0}
                        icon={<EmergencyShare sx={{ fontSize: 40 }} />}
                        color="warning"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Usuarios Registrados"
                        value={stats?.totalUsers || 0}
                        icon={<People sx={{ fontSize: 40 }} />}
                        color="info"
                    />
                </Grid>
            </Grid>

            <Typography variant="h4" gutterBottom>
                Gestionamiento
            </Typography>
 {/* Quick Actions */}
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Acciones Rápidas" />
                        <CardContent>
                            <Box display="flex" gap={2} flexWrap="wrap" box = '80%' alignItems={'center'}>
                                <Chip 
                                    label="Nuevo Reporte Médico" 
                                    color="primary" 
                                    onClick={() => window.location.href = '/#/medicForm/create'}
                                    clickable
                                />
                                <Chip 
                                    label="Nueva Emergencia Urbana" 
                                    color="secondary" 
                                    onClick={() => window.location.href = '/#/urbanForm/create'}
                                    clickable
                                />
                                <Chip 
                                    label="Gestionar Usuarios" 
                                    color="info" 
                                    onClick={() => window.location.href = '/#/users'}
                                    clickable
                                />
                                <Chip 
                                    label="Ver Estadísticas" 
                                    color="success" 
                                    onClick={() => window.location.href = '/#/estadisticas'}
                                    clickable
                                />
                            </Box>
                            
                        </CardContent>
                    </Card>
                </Grid>
                
            <Typography variant="h4" gutterBottom>
                Panel de Control - Atención Prehospitalaria
            </Typography>

            {/* Recent Activity */}
            <Grid container spacing={3}>
                {/* Recent Medical Forms */}
                {stats?.recentMedicForms && stats.recentMedicForms.length > 0 && (
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardHeader title="Reportes Médicos Recientes" />
                            <CardContent>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Folio</TableCell>
                                                <TableCell>Paciente</TableCell>
                                                <TableCell>Prioridad</TableCell>
                                                <TableCell>Fecha y Hora</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {stats.recentMedicForms.slice(0, 5).map((form) => (
                                                <TableRow key={form.id}>
                                                    <TableCell>{form.folio}</TableCell>
                                                    <TableCell>{form.paciente_nombrePaciente || form.paciente_nombre || 'N/A'}</TableCell>
                                                    <TableCell>
                                                        <Chip 
                                                            label={form.prioridad || 'N/A'} 
                                                            color={getPriorityColor(form.prioridad) as any}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                   <TableCell>{formatDateTime(form.fecha)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

                    <Grid item xs={12} md={6}>
        <Card>
            <CardHeader title="Tendencia de Reportes Médicos" />
            <CardContent>
              <Box sx={{ width: 400, height: 225 }}>
                <Line
                    data={{
                        labels: stats?.recentMedicForms.map((form) =>
                           formatDateTime(form.fechaCronometria || form.fecha || '')
                        ) || [],
                        datasets: [
                            {
                                label: 'Reportes por Día',
                                data: stats?.recentMedicForms.map((_, i) => i + 1) || [],
                                fill: false,
                                borderColor: 'rgba(53, 162, 235, 0.8)',
                                tension: 0.3,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            title: {
                                display: true,
                                text: 'Reportes Médicos Recientes (Simulado)',
                            },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1 },
                            },
                        },
                    }}
                />
                </Box>
            </CardContent>
        </Card>
    </Grid>
      {/* 3. Pie Chart: Priority Distribution */}
    <Grid item xs={12} md={6}>
        <Card>
            <CardHeader title="Distribución de Prioridades en Reportes Médicos" />
            <CardContent>
              <Box sx={{ width: 500, height: 500 }}>
                <Pie
                    data={{
                        labels: ["Rojo", "Amarillo", "Verde", "Desconocido"],
                        datasets: [
                            {
                                label: "Prioridad",
                                data: Object.values(countByPriority(stats?.recentMedicForms || [])),
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.7)",
                                    "rgba(255, 206, 86, 0.7)",
                                    "rgba(75, 192, 192, 0.7)",
                                    "rgba(201, 203, 207, 0.7)",
                                ],
                                borderColor: "rgba(255,255,255,1)",
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: "right" },
                            title: { display: true, text: "Prioridades en reportes médicos" },
                        },
                    }}
                />          
                </Box>  
                </CardContent>
        </Card>
    </Grid>

<Grid item xs={12} md={6}>
  <Card>
    <CardHeader title="Reportes Médicos por Sexo del Paciente" />
    <CardContent>
      <Box sx={{ width: '100%', height: 500, display: 'flex', alignItems: 'center', alignContent: 'center' }}>
        <Bar
          data={{
            labels: ['Masculino', 'Femenino', 'Otro / No Especificado'],
            datasets: [
              {
                label: 'Cantidad',
                data: Object.values(countBySex(stats?.recentMedicForms || [])),
                backgroundColor: [
                  'rgba(54, 162, 235, 0.7)',    
                  'rgba(255, 99, 132, 0.7)',   
                  'rgba(201, 203, 207, 0.7)',   
                ],
                borderColor: [
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(201, 203, 207, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              title: { display: true, text: 'Reportes por Sexo del Paciente' },
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } },
            },
          }}
        />
      </Box>
    </CardContent>
  </Card>
</Grid>

<Grid item xs={12} md={4}>
        <Card>
            <CardHeader title="Casos Críticos vs No Críticos en Reportes Médicos" />
            <CardContent>
                <Bar
                    data={{
                        labels: ["Críticos", "No Críticos"],
                        datasets: [
                            {
                                label: "Cantidad",
                                data: Object.values(countCriticalConditions(stats?.recentMedicForms || [])),
                                backgroundColor: [
                                    "rgba(255, 99, 132, 0.7)",
                                    "rgba(75, 192, 192, 0.7)",
                                ],
                                borderColor: [
                                    "rgba(255, 99, 132, 1)",
                                    "rgba(75, 192, 192, 1)",
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        indexAxis: "y",
                        responsive: true,
                        plugins: {
                            legend: { display: false },
                            title: { display: true, text: "Casos Críticos vs No Críticos" },
                        },
                        scales: {
                            x: { beginAtZero: true, ticks: { stepSize: 1 } },
                        },
                    }}
                />
                </CardContent>
        </Card>
    </Grid>

<Grid item xs={12} md={6}>
    <Card>
        <CardHeader title="Distribución de Turnos en Reportes Médicos (Radar)" />
        <CardContent>
            <Box sx={{ width: '100%', height: 300 }}>
                <Radar
                    data={{
                        labels: Object.keys(countByTurno(stats?.recentMedicForms || [])),
                        datasets: [
                            {
                                label: 'Ocurrencias',
                                data: Object.values(countByTurno(stats?.recentMedicForms || [])),
                                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                borderColor: 'rgba(255, 159, 64, 1)',
                                pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Turnos con Más Ocurrencias (Radar)',
                            },
                        },
                    }}
                />
            </Box>
        </CardContent>
    </Card>
</Grid>
          <Typography variant="h4" gutterBottom>
                Panel de Control - Emergencia Urbana
            </Typography>

                {/* Recent Urban Forms */}
                {stats?.recentUrbanForms && stats.recentUrbanForms.length > 0 && (
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader title="Emergencias Urbanas Recientes" />
                            <CardContent>
                                <TableContainer>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Folio</TableCell>
                                                <TableCell>Tipo</TableCell>
                                                <TableCell>Turno</TableCell>
                                                <TableCell>Fecha y Hora</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {stats.recentUrbanForms.slice(0, 5).map((form) => (
                                                <TableRow key={form.id}>
                                                    <TableCell>{form.folio}</TableCell>
                                                    <TableCell>{form.tipo_servicio || 'N/A'}</TableCell>
                                                    <TableCell>{form.turno || 'N/A'}</TableCell>
                                                    <TableCell>{formatDateTime(form.fecha_hora)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                )}

            <Grid container spacing={3} sx={{ mt: 3 }}>
    <Grid item xs={12} md={6}>
        <Card>
            <CardHeader title="Comparativa de Formularios" />
            <CardContent>
              <Box sx={{ width: 400, height: 300 }}>
                <Bar
                    data={{
                        labels: ['Reportes Médicos', 'Emergencias Urbanas'],
                        datasets: [
                            {
                                label: 'Cantidad Total',
                                data: [
                                    stats?.totalMedicForms || 0,
                                    stats?.totalUrbanForms || 0,
                                ],
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(255, 99, 132, 0.6)',
                                ],
                                borderColor: [
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(255, 99, 132, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { position: 'top' },
                            title: { display: true, text: 'Total de Formularios por Tipo' },
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: { stepSize: 1 },
                            },
                        },
                    }}
                />
                </Box>
            </CardContent>
        </Card>
    </Grid>

    

<Grid item xs={12} md={6}>
    <Card>
        <CardHeader title="Distribución de Turnos en Emergencias Urbanas (Radar)" />
        <CardContent>
            <Box sx={{ width: '100%', height: 300 }}>
                <Radar
                    data={{
                        labels: Object.keys(countByTurno(stats?.recentUrbanForms || [])),
                        datasets: [
                            {
                                label: 'Ocurrencias',
                                data: Object.values(countByTurno(stats?.recentUrbanForms || [])),
                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                borderColor: 'rgba(153, 102, 255, 1)',
                                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                            },
                        ],
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            r: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: 'Turnos con Más Ocurrencias (Radar)',
                            },
                        },
                    }}
                />
            </Box>
        </CardContent>
    </Card>
</Grid>

            </Grid>

</Grid>
        </Box>
    );
};
