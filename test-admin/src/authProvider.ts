import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
    
    async login({ username, password }) {
        if (username === "mock" && password === "lol1234!LOL") {
            localStorage.setItem("username", username);
            return; 
        }
        throw new Error("Invalid credentials, please try again");
    },

    async logout() {
        localStorage.removeItem("username");
    },

   
    async checkError({ status }: { status: number }) {
        if (status === 401 || status === 403) {
            localStorage.removeItem("username");
            throw new Error("Session expired");
        }
    },

   
    async checkAuth() {
        if (!localStorage.getItem("username")) {
            throw new Error("Authentication required");
        }
    },
};
