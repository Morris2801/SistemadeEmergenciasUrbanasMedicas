import { Admin, Resource, ListGuesser, ShowGuesser} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { MedicFormCreate, } from "./testForm";
import myTheme from "./theme";
import CustomLogin from './Login';
import { Dashboard } from './dashboard';
import { Listado } from './listado';
import { Estadisticas } from './estadisticas';

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} authProvider={authProvider} loginPage={CustomLogin} theme={myTheme} >
       
    
    <Resource name="dashboard" list={Dashboard} />
    <Resource name="estadisticas" list={Estadisticas} />
    <Resource name="listado" list={Listado} />

    <Resource name="medicForm" list={ListGuesser} create={MedicFormCreate} show={ShowGuesser}/>
  </Admin>
);
