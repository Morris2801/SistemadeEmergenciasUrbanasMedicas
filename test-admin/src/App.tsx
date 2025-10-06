// src/App.tsx
import {
    Admin,
    Resource,
    ListGuesser,
    ShowGuesser,
    CustomRoutes,
} from 'react-admin';
import { Route } from 'react-router-dom';

import customLayout from './Layout';
import { dataProvider } from './dataProvider';
import { authProvider } from './authProvider';
import myTheme from './theme';
import CustomLogin from './Login';

// Recursos
import { Dashboard } from './dashboard';
import { Listado } from './listado';
import { Estadisticas } from './estadisticas';
import { MedicFormCreate } from './testForm';
import UrbanFormCreate from './urbanForm';
import Selector from './selector';

// Iconos
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';

export const App = () => (
    <Admin
        layout={customLayout}
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={CustomLogin}
        theme={myTheme}
    >
        <CustomRoutes>
            <Route path="/selector" element={<Selector />} />
        </CustomRoutes>

        <Resource name="dashboard" list={Dashboard} icon={DashboardIcon} />
        <Resource name="estadisticas" list={Estadisticas} icon={BarChartIcon} />
        <Resource name="listado" list={Listado} icon={ListAltIcon} />
        <Resource name="selector" list={Selector} icon={MedicalInformationIcon} />
        <Resource name="medicForm" create={MedicFormCreate} icon={MedicalInformationIcon} />
        <Resource name="urbanForm" create={UrbanFormCreate} icon={EngineeringIcon} />
    </Admin>
);
