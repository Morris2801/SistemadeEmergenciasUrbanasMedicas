// src/App.tsx
import { Admin, Resource, ListGuesser, ShowGuesser, CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";

import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import myTheme from "./theme";
import CustomLogin from './Login';

// Recursos de react-admin
import { Dashboard } from './dashboard';
import { Listado } from './listado';
import { Estadisticas } from './estadisticas';
import { MedicFormCreate } from './testForm'; // Formulario de react-admin (para Resource)

// Rutas personalizadas
import Selector from './selector';
import UrbanForm from './urbanForm';

export const App = () => (
  <Admin
    layout={Layout}
    dataProvider={dataProvider}
    authProvider={authProvider}
    loginPage={CustomLogin}
    theme={myTheme}
  >
    <CustomRoutes>
      <Route path="/selector" element={<Selector />} />
      <Route path="/urban-form" element={<UrbanForm />} />
    </CustomRoutes>

    <Resource name="dashboard" list={Dashboard} />
    <Resource name="estadisticas" list={Estadisticas} />
    <Resource name="listado" list={Listado} />
    <Resource name="medicForm" list={ListGuesser} create={MedicFormCreate} show={ShowGuesser} />
  </Admin>
);
