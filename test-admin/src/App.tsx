import { Admin, Resource, ListGuesser, ShowGuesser} from "react-admin";
import { Layout } from "./Layout";
import { dataProvider } from "./dataProvider";
import { MedicFormCreate, } from "./testForm";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource name="medicForm" list={ListGuesser} create={MedicFormCreate} show={ShowGuesser}/>
  </Admin>
);
