import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    async login({ username, password }) {
        if (username === "amilka" && password === "raspy1234") {
            localStorage.setItem("username", username);
            localStorage.setItem("role", "paramedico");
            return; 
        }
        if (username === "mau" && password === "coca1234") {
            localStorage.setItem("username", username);
            localStorage.setItem("role", "admin");
            return;
        }
        if (username === "diego" && password === "manzanas1234") {
            localStorage.setItem("username", username);
            localStorage.setItem("role", "jefe");
            return;
        }
        throw new Error("Invalid credentials, please try again");
    },

    async logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    },

    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            throw new Error("Session expired");
        }
    },

    async checkAuth() {
        if (!localStorage.getItem("username")) {
            throw new Error("Authentication required");
        }
    },

    async getPermissions() {
        const role = localStorage.getItem("role");
        return role ? role : undefined;
    },
};

