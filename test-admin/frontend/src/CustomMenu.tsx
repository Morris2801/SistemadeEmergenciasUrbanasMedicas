import { Menu, MenuItemLink, usePermissions } from 'react-admin';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UserIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';

const CustomMenu = (props) => {
    const { permissions } = usePermissions();

    // colores
    const azulOscuro = '#1B2845';
    const azulClaro = '#0078D4';
    const textoBlanco = '#f2f2f2';

    return (
        <Box sx={{
            backgroundColor: azulOscuro,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '22px',
            borderRadius: 2,
            alignContent: "center",
            justifyContent:"space-evenly",
        }}>
            <Menu {...props}>
                {permissions === 'admin' && (
                    <Box>
                        <Box sx={{ mb: 2, padding: 1}}>
                            <MenuItemLink
                                to="/dashboard"
                                primaryText="Dashboard"
                                leftIcon={<DashboardIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': {
                                            color: textoBlanco,
                                        },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 , padding: 1}}>
                            <MenuItemLink
                                to="/users"
                                primaryText="Usuarios"
                                leftIcon={<UserIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': { color: textoBlanco },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2, padding: 1}}>
                            <MenuItemLink
                                to="/medicForm"
                                primaryText="Em. Prehospitalarias"
                                leftIcon={<MedicalInformationIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': { color: textoBlanco },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2, padding: 1}}>
                            <MenuItemLink
                                to="/urbanForm"
                                primaryText="Em. Urbanas"
                                leftIcon={<EngineeringIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': { color: textoBlanco },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2, padding: 1}}>
                            <MenuItemLink
                                to="/estadisticas"
                                primaryText="Estadísticas"
                                leftIcon={<BarChartIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': { color: textoBlanco },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                )}
                {permissions === 'jefe' && (
                    <Box>
                        <Box sx={{ mb: 2, padding: 1}}>
                            <MenuItemLink
                                to="/estadisticas"
                                primaryText="Estadísticas"
                                leftIcon={<BarChartIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': { color: textoBlanco },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 , padding: 1}}>
                            <MenuItemLink
                                to="/medicForm"
                                primaryText="Em. Prehospitalarias"
                                leftIcon={<MedicalInformationIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': { color: textoBlanco },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 , padding: 1}}>
                            <MenuItemLink
                                to="/urbanForm"
                                primaryText="Em. Urbanas"
                                leftIcon={<EngineeringIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    '&.Mui-selected': {
                                        backgroundColor: azulClaro,
                                        color: textoBlanco,
                                        '& .MuiSvgIcon-root': { color: textoBlanco },
                                    },
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: azulOscuro,
                                        '& .MuiSvgIcon-root': { color: azulOscuro },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                )}
            </Menu>
        </Box>
    );
};

export default CustomMenu;
