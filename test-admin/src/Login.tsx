import * as React from "react";
import { Login, LoginProps } from "react-admin";
import { Box, Paper, Typography } from "@mui/material";

const CustomLogin = (props: LoginProps) => {
  return (
    <Box
      sx={{
        height: "100%",             
        width: "100%",                
        display: "flex",              
        flexDirection: "column",      
        alignItems: "center",          
        justifyContent: "center",      
        backgroundColor: "#f4f6f8",    
        padding: 2,
      }}
    >
      <Box
        component="img"
        src="https://pbs.twimg.com/profile_images/1230210290337189888/XrPQPq_z_400x400.jpg"
        alt="Logo"
        sx={{
          width: 100,
          height: 100,
          borderRadius: "20%",
          objectFit: "cover",
          mb: 3,
          boxShadow: 2,
        }}
      />

      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 360,
          padding: 3,
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Iniciar sesión
        </Typography>
        <Login {...props} />
      </Paper>
    </Box>
  );
};

export default CustomLogin;
