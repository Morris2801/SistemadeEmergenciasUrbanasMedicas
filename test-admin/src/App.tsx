import { Admin, Resource, ListGuesser, ShowGuesser} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { MedicFormCreate, } from "./testForm";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider} authProvider={authProvider}>
    
    <Resource name="medicForm" list={ListGuesser} create={MedicFormCreate} show={ShowGuesser}/>
  </Admin>
);
