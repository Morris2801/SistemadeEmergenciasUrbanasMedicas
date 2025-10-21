// src/App.tsx
import {
    Admin,
    Resource,
    CustomRoutes,
} from 'react-admin';
import { Route } from 'react-router-dom';

import customLayout from './Layout';

import { dataProvider } from './dataProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import mensajesEspanol from './traduccion';

import authProvider  from './authProvider';
import { lightTheme, darkTheme} from './theme';
import CustomLogin from './Login';

// Recursos
import { Dashboard } from './dashboard';
import { Estadisticas } from './estadisticas';
import { MedicFormCreate, MedicFormEdit, MedicFormShow, MedicFormList } from './testForm';
import { UserList, UserEdit, UserShow, UserCreate } from './users';
import { UrbanFormCreate, UrbanFormShow, UrbanFormList, UrbanFormEdit} from './urbanForm';
import Selector from './selector';
import ManualUsuario from './ManualUsuario';
// Iconos
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';

import Registrarse from './registrarse';

const proveedorIdioma = polyglotI18nProvider(() => mensajesEspanol, 'es');

export const App = () => (
    <Admin
        layout={customLayout}
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={CustomLogin}
        theme={lightTheme }
        darkTheme={darkTheme}
        i18nProvider={proveedorIdioma}
    >
        <CustomRoutes>
            <Route path="/selector" element={<Selector />} />
            <Route path="/registrarse" element={<Registrarse />} />
            <Route path="/manual" element={<ManualUsuario />} /> 
        </CustomRoutes>
        
        <Resource name="dashboard" list={Dashboard} icon={DashboardIcon} />
        <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} create={UserCreate} icon={PeopleIcon}/>
        <Resource name="estadisticas" list={Estadisticas} icon={BarChartIcon} />
        
        <Resource name="selector" list={Selector} icon={MedicalInformationIcon} />
        <Resource name="medicForm" list={MedicFormList} create={MedicFormCreate} edit={MedicFormEdit} show={MedicFormShow} icon={MedicalInformationIcon} />
        <Resource name="urbanForm" list={UrbanFormList} create={UrbanFormCreate} edit={UrbanFormEdit} show={UrbanFormShow} icon={EngineeringIcon} />
    </Admin>
);
