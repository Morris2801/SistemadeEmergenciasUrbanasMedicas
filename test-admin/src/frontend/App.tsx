// src/App.tsx
import {
    Admin,
    Resource,
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
import { Estadisticas } from './estadisticas';
import { MedicFormCreate, MedicFormEdit, MedicFormShow, MedicFormList } from './testForm';
import { UserList, UserEdit, UserShow, UserCreate } from './users';
import { UrbanFormCreate, UrbanFormShow, UrbanFormList, UrbanFormEdit} from './urbanForm';
import Selector from './selector';


// Iconos
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';

import Registrarse from './registrarse';

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
        
        <Resource
        name="dashboard"
        list={Dashboard}
        options={{ label: "Panel de Control" }}
        icon={DashboardIcon}
        />

        <Resource
        name="users"
        list={UserList}
        show={UserShow}
        edit={UserEdit}
        create={UserCreate}
        options={{ label: "Usuarios" }}
        icon={PeopleIcon}
        />

        <Resource
        name="estadisticas"
        list={Estadisticas}
        options={{ label: "Estadísticas" }}
        icon={BarChartIcon}
        />

        <Resource
        name="medicForm"
        list={MedicFormList}
        create={MedicFormCreate}
        edit={MedicFormEdit}
        show={MedicFormShow}
        options={{ label: "Reportes Médicos" }}
        icon={MedicalInformationIcon}
        />

        <Resource
        name="urbanForm"
        list={UrbanFormList}
        create={UrbanFormCreate}
        edit={UrbanFormEdit}
        show={UrbanFormShow}
        options={{ label: "Emergencias Urbanas" }}
        icon={EngineeringIcon}
        />

    </Admin>
);
