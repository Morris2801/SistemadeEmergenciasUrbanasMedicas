import * as React from "react";
import { Login, LoginProps } from "react-admin";
import { Box, Paper, Typography, Divider, Avatar } from "@mui/material";

const CustomLogin = (props: LoginProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f4f6f8",
      }}
    >
      {/* Banner superior con imagen institucional y logo */}
      <Box
        sx={{
          width: "100%",
          height: { xs: 180, md: 240 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Imagen de fondo solo parte derecha */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("https://mediaim.expedia.com/destination/9/9532ab1fa7d668bdabb3c05739b00305.jpg")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right center", // Mostrar solo parte derecha
            filter: "brightness(0.6)", // Oscurece ligeramente
            zIndex: 0,
          }}
        />

        {/* Contenido encima del fondo */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            alignItems: "center",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Logo institucional a la izquierda */}
          <Avatar
            alt="Logo Cuajimalpa"
            src="https://pbs.twimg.com/profile_images/1230210290337189888/XrPQPq_z_400x400.jpg"
            variant="square"
            sx={{
              width: { xs: 80, md: 120 },
              height: { xs: 80, md: 120 },
              border: "2px solid white",
              mr: 2,
              boxShadow: 3,
            }}
          />
          <Typography
            variant="h4"
            sx={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: { xs: "1.8rem", md: "2.4rem" },
            }}
          >
            Delegación Cuajimalpa
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#dddddd" }} />

      {/* Zona principal para el login */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          px: 2,
          pt: 4,
          pb: 8,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            width: "100%",
            maxWidth: 440,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          }}
        >
          {/* Título azul institucional */}
          <Box
            sx={{
              backgroundColor: "#1e3a60",
              color: "#fff",
              py: 3,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Portal Administrativo
            </Typography>
          </Box>

          {/* Contenido del formulario */}
          <Box sx={{ p: { xs: 3, md: 4 }, backgroundColor: "#fff" }}>
            <Typography
              variant="subtitle1"
              align="center"
              sx={{ mb: 3, color: "#444444" }}
            >
              Inicia sesión para continuar
            </Typography>
            <Login {...props} />
          </Box>
        </Paper>
      </Box>

      {/* Pie de página institucional */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          backgroundColor: "#1e3a60",
          color: "#fff",
          textAlign: "center",
          px: 2,
          py: { xs: 2, md: 3 },
          fontSize: { xs: 13, md: 15 },
          lineHeight: 1.5,
        }}
      >
        <Typography variant="body2">
          Gobierno Humano, Cercano y de Resultados
        </Typography>
        <Typography variant="body2">
          Av. Juárez S/N, Cuajimalpa de Morelos, 05000 CDMX, México
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomLogin;
