import { Menu, MenuItemLink, usePermissions } from 'react-admin';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmergencyIcon from '@mui/icons-material/Emergency';

const CustomMenu = (props) => {
    const { permissions } = usePermissions(); 

    return (
        <Box sx={{ backgroundColor: '#bfbfbfff', rounded: 2, height: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '22px'}}>
            <Box sx={{ textAlign: 'center', p: 2, justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src='../../src/frontend/logo.jpg'
                    alt="LogoCuaji"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '30px', marginTop: '30px'}}
                />
            </Box>
            <Menu {...props}>
            {permissions === 'admin' && (
                <Box>
                <MenuItemLink
                    to="/dashboard"
                    primaryText="Panel de Control"
                    leftIcon={<DashboardIcon />}
                />
                <MenuItemLink
                    to="/users"
                    primaryText="Usuarios"
                    leftIcon={<PeopleIcon />}
                />
                <MenuItemLink
                    to="/medicForm"
                    primaryText="Reportes Médicos"
                    leftIcon={<LocalHospitalIcon />}
                />
                <MenuItemLink
                    to="/urbanForm"
                    primaryText="Emergencias Urbanas"
                    leftIcon={<EmergencyIcon />}
                />
                </Box>
            )}
            {(permissions === 'admin' || permissions === 'manager') && (
                <Box>
                <MenuItemLink
                    to="/estadisticas"
                    primaryText="Estadísticas"
                    leftIcon={<BarChartIcon />}
                />
                </Box>
            )}
            </Menu>
        </Box>
    );
};

export default CustomMenu;