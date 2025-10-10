import * as React from 'react';
import { Menu, MenuItemLink, usePermissions } from 'react-admin';
import { Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';

const CustomMenu = (props) => {
    const { permissions } = usePermissions(); 

    return (
        <Box sx={{ backgroundColor: '#bfbfbfff', rounded: 2, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {/* Logo ALGUIEN CAMBIELO O LA DE FRONTEND AHEM AMILKA HAZLO MEJOR */}
            <Box sx={{ textAlign: 'center', p: 2, justifyContent: 'center', alignItems: 'center' }}>
                <img
                    src='../src/logo.jpg'
                    alt="LogoCuaji"
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '30px' }}
                />
            </Box>
            <Menu {...props}>
                {permissions === 'admin' && (
                    <Box>
                        <MenuItemLink to="/dashboard" primaryText="Dashboard" leftIcon={<DashboardIcon />} />
                        <MenuItemLink to="/users" primaryText="Users" leftIcon={<DashboardIcon />} />
                        <MenuItemLink to="/medicForm" primaryText="MedicForms" leftIcon={<MedicalInformationIcon />} />
                        <MenuItemLink to="/urbanForm" primaryText="UrbanForms" leftIcon={<EngineeringIcon />} />
                    </Box>
                )}
                {(permissions === 'admin' || permissions === 'manager') && (
                    <Box>
                        <MenuItemLink to="/estadisticas" primaryText="Estadísticas" leftIcon={<BarChartIcon />} />
                    </Box>
                )}
                
            </Menu>
        </Box>
    );
};

export default CustomMenu;