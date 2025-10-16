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

import authProvider  from './authProvider';
import { lightTheme, darkTheme} from './theme';
import CustomLogin from './Login';

// Recursos
import { Dashboard } from './dashboard';
// import { Listado } from './listado';
import { Estadisticas } from './estadisticas';
import { MedicFormCreate, MedicFormEdit, MedicFormShow, MedicFormList } from './testForm';
import { UserList, UserEdit, UserShow, UserCreate } from './users';
import { UrbanFormCreate, UrbanFormShow, UrbanFormList, UrbanFormEdit} from './urbanForm';
import Selector from './selector';
import Registrarse from './registrarse';


// Iconos
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';

import jsonServerProvider from 'ra-data-json-server';
import dummyData from './dummyData.json';

export const App = () => (
    <Admin
        layout={customLayout}
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={CustomLogin}
        theme={lightTheme }
        darkTheme={darkTheme}
    >
        <CustomRoutes>
            <Route path="/selector" element={<Selector />} />
            <Route path="/registrarse" element={<Registrarse />} />
        </CustomRoutes>
        
        <Resource name="dashboard" list={Dashboard} icon={DashboardIcon} />
        <Resource name="users" list={UserList} show={UserShow} edit={UserEdit} create={UserCreate} />
        <Resource name="estadisticas" list={Estadisticas} icon={BarChartIcon} />
        
        {/* <Resource name="listado" list={Listado} icon={ListAltIcon} /> */}
        <Resource name="selector" list={Selector} icon={MedicalInformationIcon} />
        <Resource name="medicForm" list={MedicFormList} create={MedicFormCreate} edit={MedicFormEdit} show={MedicFormShow} icon={MedicalInformationIcon} />
        <Resource name="urbanForm" create={UrbanFormCreate} list={UrbanFormList} edit={UrbanFormEdit} show={UrbanFormShow} icon={EngineeringIcon} />
    </Admin>
);
