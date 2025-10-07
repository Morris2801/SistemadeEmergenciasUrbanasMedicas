/*import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);
*/

import fakeRestDataProvider from 'ra-data-fakerest';
import dummyData from './dummyData.json';

export const dataProvider = fakeRestDataProvider(dummyData, { logging: true });