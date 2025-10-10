import * as React from "react";
import { useLogin, useNotify, useRedirect, useTheme } from "react-admin";
import { Box, Paper, Typography, Divider, Avatar, Button, TextField } from "@mui/material";

const CustomLogin = () => {
    const login = useLogin();
    const notify = useNotify();
    const redirect = useRedirect();

    const [loading, setLoading] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        try {
            await login({ username, password });
            const identity = JSON.parse(sessionStorage.getItem("identity") || "{}");
            const permissions = identity.tipo;

            if (permissions === "admin") {
                redirect("/dashboard");
            } 
            else if (permissions === "paramedico" || permissions === "urbano") {
                redirect("/selector");
            } 
            else if (permissions === "jefe") {
                redirect("/medicForm"); 
            } 
            else {
                notify("No tienes permisos");
            }
        } 
        catch (error) {
            setLoading(false);
            notify("Invalid username or password");
        }
    };

     return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "background.default", 
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: { xs: 180, md: 240 },
                    position: "relative",
                    overflow: "hidden",
                }}
            >
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
                        backgroundPosition: "right center",
                        filter: "brightness(0.6)",
                        zIndex: 0,
                    }}
                />
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
                            color: "text.primary",
                            fontWeight: 700,
                            fontSize: { xs: "1.8rem", md: "2.4rem" },
                        }}
                    >
                        Delegación Cuajimalpa
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ borderColor: "divider" }} /> {/* Use theme divider color */}

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
                        backgroundColor: "background.paper", // Use theme paper background color
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "primary.main", // Use theme primary color
                            color: "primary.contrastText", // Use theme primary contrast text color
                            py: 3,
                            textAlign: "center",
                        }}
                    >
                        <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            Portal Administrativo
                        </Typography>
                    </Box>

                    <Box sx={{ p: { xs: 3, md: 4 }, backgroundColor: "background.paper" }}>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            sx={{ mb: 3, color: "text.secondary" }} // Use theme secondary text color
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
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "divider", // Use theme divider color
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "primary.main", // Use theme primary color
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
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "divider", // Use theme divider color
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "primary.main", // Use theme primary color
                                        },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                                sx={{
                                    mt: 2,
                                    textTransform: "none", // Consistent button text style
                                    fontSize: "1rem", // Match theme typography
                                }}
                            >
                                {loading ? "Ingresando..." : "Ingresar"}
                            </Button>
                        </form>
                    </Box>
                </Paper>
            </Box>

            <Box
                component="footer"
                sx={{
                    width: "100%",
                    backgroundColor: "primary.main", // Use theme primary color
                    color: "primary.contrastText", // Use theme primary contrast text color
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
