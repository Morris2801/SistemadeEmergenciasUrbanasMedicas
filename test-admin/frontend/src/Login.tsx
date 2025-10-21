import * as React from "react";
import { useLogin, useNotify, useRedirect } from "react-admin";
import { Box, Paper, Typography, Button, TextField } from "@mui/material";
import logoHorizontal from "./assets/logo-horizontal-blanco.png";
import {useMediaQuery, Theme} from '@mui/material'


const CustomLogin = () => {
    const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down("sm"));
    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();

    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const validarPassword = (password: string) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{9,}$/;
        return regex.test(password);
    };

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        if (!validarPassword(password)) {
            setLoading(false);
            notify(
                "La contraseña debe tener al menos 9 caracteres, una mayúscula, una minúscula y un número.",
                { type: "warning" }
            );
            return;
        }
        try {
            await login({ username, password });
            const identity = JSON.parse(sessionStorage.getItem("identity") || "{}");
            const permissions = identity.tipo;

            if (permissions === "admin") redirect("/dashboard");
            else if (permissions === "paramedico" || permissions === "operador") redirect("/selector");
            else if (permissions === "jefe") redirect("/medicForm");
            else notify("No tienes permisos");
        } catch (error) {
            setLoading(false);
            notify("Usuario o contraseña inválidos");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `
                    url("https://cuajimalpa.gob.mx/wp-content/uploads/2025/01/wmark.png"),
                    linear-gradient(180deg, #0075c5 0%, #003383 100%)
                `,
                backgroundSize: "contain, cover",
                backgroundRepeat: "repeat, no-repeat",
                backgroundPosition: "center",
            }}
        >
            {/* logo principal */}
            <Box sx={{ textAlign: "center", mb: 3 }}>
                <Box
                    component="img"
                    src={logoHorizontal}
                    alt="Logo Cuajimalpa"
                    sx={{
                        width: "100%",
                        maxWidth: 480,
                        minWidth: 280,
                        height: "auto",
                    }}
                />
            </Box>


            {/* contenedor del login */}
            <Paper
                elevation={8}
                sx={{
                    width: "100%",
                    maxWidth: 420,
                    borderRadius: 3,
                    p: { xs: 3, md: 4 },
                    backgroundColor: "white",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: "#003383",
                        mb: 1,
                    }}
                >
                    Portal Administrativo
                </Typography>

                <Typography
                    variant="subtitle1"
                    sx={{
                        mb: 3,
                        color: "text.secondary",
                    }}
                >
                    Inicia sesión para continuar
                </Typography>

                <form onSubmit={submit}>
                    <TextField
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    disabled={loading}
                    sx={{
                        input: {
                            color: "#1b1b1b",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#1b1b1b", // color del label
                        },
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff", // fondo
                            "& fieldset": {
                                borderColor: "#0078D4", // principal
                            },
                            "&:hover fieldset": {
                                borderColor: "#1B2845", // al pasar el mouse
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#0078D4", // al enfocar
                            },
                        },
                    }}
                />

                <TextField
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    disabled={loading}
                    sx={{
                        input: {
                            color: "#1b1b1b",
                        },
                        "& .MuiInputLabel-root": {
                            color: "#1b1b1b",
                        },
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#ffffff",
                            "& fieldset": {
                                borderColor: "#0078D4",
                            },
                            "&:hover fieldset": {
                                borderColor: "#1B2845",
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "#0078D4",
                            },
                        },
                    }}
                />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{
                            mt: 2,
                            py: 1.2,
                            textTransform: "none",
                            color: "#FFFFFF",
                            fontSize: "1rem",
                            fontWeight: 600,
                            backgroundColor: "#0075c5",
                            "&:hover": {
                                backgroundColor: "#005fa3",
                            },
                        }}
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </Button>
                </form>
            </Paper>

            {/* footer */}
            <Box
                component="footer"
                sx={{
                    mt: 5,
                    textAlign: "center",
                    color: "white",
                    fontSize: { xs: 13, md: 15 },
                    lineHeight: 1.6,
                    px: 2,
                    pb: 2,
                }}
            >
                <Typography variant="body2">
                    Gobierno Humano, Cercano y de Resultados
                </Typography>
                <Typography variant="body2">
                    Av. Juárez S/N, Cuajimalpa de Morelos, 05000 CDMX, México
                </Typography>
            </Box>

            {/* franjita */}
            <Box
                sx={{
                    width: "100%",
                    height: "20px",
                    backgroundColor: "white",
                }}
            />
        </Box>
    );
};

export default CustomLogin;

