/*
import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);


import fakeRestDataProvider from 'ra-data-fakerest';
import dummyData from './dummyData.json';

export const dataProvider = fakeRestDataProvider(dummyData, { logging: true });



------Profe
*/
import {fetchUtils} from "react-admin"
import jsonServerProvider from "ra-data-json-server";


const fetchJsonUtil=(url:string, options:fetchUtils.Options={})=>{
	if(!options.headers){
		options.headers=new Headers({Accept: "application/json"});
	}
	options.headers.set("Authentication", sessionStorage.getItem("auth"));
	return fetchUtils.fetchJson(url, options);
};

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL, fetchJsonUtil);
