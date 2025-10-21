import CustomMenu from "./CustomMenu";
import CustomAppBar from "./CustomAppBar";
import { Layout as RALayout } from "react-admin";

const customLayout = (props) => (
  <RALayout
    {...props}
    menu={CustomMenu}
    appBar={CustomAppBar}
    sx={{
      "& .RaLayout-content": {
        marginTop: "64px",
        marginLeft: "30px",
        marginRight: "30px",
        borderRadius: "50px",
        width: "100%",

        // Responsive styles for small screens
        "@media (max-width:600px)": {
          marginLeft: "10px",
          marginRight: "10px",
          borderRadius: "10px",
        },
      },
      "& .RaLayout-sidebar": {
        width: "240px",
        top: "64px",
        height: "calc(100vh - 64px)",

        // Responsive sidebar for small screens
        "@media (max-width:600px)": {
          width: "200px",
        },
      },
    }}
  />
);

export default customLayout;
