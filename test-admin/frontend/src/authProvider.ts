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
        console.log(import.meta.env.VITE_BACKEND)
        const request=new Request(import.meta.env.VITE_BACKEND+"/login",{
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: new Headers({ "Content-Type": "application/json" }),
        });

        const res = await fetch(request);
        if (!res.ok) throw new Error("Login failed");

        const auth = await res.json();

        sessionStorage.setItem("auth", auth.token);
        sessionStorage.setItem(
            "identity",
            JSON.stringify({ id: auth.id, fullName: auth.nombre, tipo: auth.tipo })
        );
    },

    logout: () => {
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("identity");
        return Promise.resolve();
    },

    checkAuth: () =>
        sessionStorage.getItem("auth") ? Promise.resolve() : Promise.reject(),

    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
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