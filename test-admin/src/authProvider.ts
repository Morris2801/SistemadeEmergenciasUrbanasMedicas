/*

-------------- Versión María


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
*/


// -------------- Versión del Profe
import { AuthProvider } from "react-admin";

const authProvider: AuthProvider = {
    login: async ({ username, password }) => {
        const request = new Request("http://127.0.0.1:3000/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        });
        try {
            const res = await fetch(request);
            if (res.status < 200 || res.status >= 300) {
                throw new Error(res.statusText);
            }
            const auth = await res.json();
            sessionStorage.setItem("auth", auth.token);
            sessionStorage.setItem(
                "identity",
                JSON.stringify({ id: auth.id, fullName: auth.nombre, tipo: auth.tipo })
            );
            return Promise.resolve();
        } catch {
            throw new Error("Error en usuario o password");
        }
    },
    logout: () => {
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("identity");
        return Promise.resolve();
    },
    checkAuth: () => {
        return sessionStorage.getItem("auth") ? Promise.resolve() : Promise.reject();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            sessionStorage.removeItem("auth");
            sessionStorage.removeItem("identity");
            return Promise.reject();
        }
        return Promise.resolve();
    },
    getPermissions: () => {
        const identity = sessionStorage.getItem("identity");
        return identity ? Promise.resolve(JSON.parse(identity).tipo) : Promise.reject();
    },
};

export default authProvider;