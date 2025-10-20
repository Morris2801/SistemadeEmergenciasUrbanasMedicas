import CustomMenu from "./CustomMenu";
import CustomAppBar from "./CustomAppBar";
import { Layout as RALayout } from "react-admin";

const customLayout = (props) => (
  <RALayout
    {...props}
    menu={CustomMenu}
    appBar={CustomAppBar}
    sx={{
      // "& .RaLayout-content": {
      //   marginTop: "64px",
      //  borderRadius: "50px",

      //      marginLeft: "30px",
      //   marginRight: "30px",
      // // Responsive styles for small screens
      //   "@media (max-width:600px)": {
      //     marginLeft: "10px",
      //     marginRight: "10px",
      //     borderRadius: "10px",
      //   },
      // },

      "& .RaLayout-content": {
        marginTop: "64px",
        marginLeft: { xs: "8px", sm: "16px", md: "24px" },
        marginRight: { xs: "8px", sm: "16px", md: "24px" },
        borderRadius: "20px",
        padding: "16px",
        backgroundColor: "background.paper",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
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
