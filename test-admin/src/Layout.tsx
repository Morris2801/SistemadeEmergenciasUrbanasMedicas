import * as React from "react";
import CustomMenu from "./CustomMenu";
import CustomAppBar from "./CustomAppBar";
import { Layout as RALayout } from "react-admin";

const customLayout = (props) => (
  <RALayout {...props} menu={CustomMenu} appBar={CustomAppBar} />
);

export default customLayout;

