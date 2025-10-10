import * as React from "react";
import CustomMenu from "./CustomMenu";
import CustomAppBar from "./CustomAppBar";
import { Layout as RALayout } from "react-admin";

const customLayout = (props) => (
  <RALayout {...props}
    menu={CustomMenu}
    appBar={CustomAppBar}
    sx={{
      "& .RaLayout-content": {
        marginTop: "64px",
        marginLeft: "30px",
        marginRight: "30px",
        borderRadius: "50px",
      },
      "& .RaLayout-sidebar": {
        width: "240px", 
        top: "64px", 
        height: "calc(100vh - 64px)",
      },
    }}
  />
);

export default customLayout;