import { Menu, MenuItemLink, usePermissions } from 'react-admin';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import UserIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';

const CustomMenu = (props) => {
    const { permissions } = usePermissions();

    return (
        <Box sx={{ backgroundColor: '#bfbfbfff', rounded: 2, height: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '22px'}}>
            <Box sx={{ textAlign: 'center', p: 2, justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src='../src/logo.jpg'
                    alt="LogoCuaji"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '30px', marginTop: '30px'}}
                />
            </Box>
            <Menu {...props}>
                {permissions === 'admin' && (
                    <Box>
                        <Box sx={{ mb: 2, padding: 1, }}>
                            <MenuItemLink
                                to="/dashboard"
                                primaryText="Dashboard"
                                leftIcon={<DashboardIcon sx={{ color: textoBlanco }} />}
                                sx={{
                                    color: textoBlanco,
                                    height: '10%',
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
