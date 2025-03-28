import { create } from "zustand";
import { toast } from "react-toastify";

const useAuthStore = create((set) => ({
    isAuthenticated: null,
    isAuthChecking: false,
    isloggedOut: true,
    loggedIn: null,

    checkingAuth: async () => {
        try {
            set({ isAuthChecking: true });
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/check-auth`, {
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await res.json();
            set({ isAuthenticated: data });
            set({ isAuthChecking: false });
        } catch (error) {
            console.log(error.message);
            set({ isAuthenticated: null });
        }    
    },

    handleLogin: async (username, password) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            });
            const data = await res.json();
            if(data.error) {
               toast.error(data.error, {
                 position: "top-right",
               });
               set({ loggedIn: null });
             }
            else {
              toast.success(data.message, {
                position: "top-right",
              })
            }
            set({ loggedIn: data });
            set({ isloggedOut: false });
        } catch (error) {
            console.log("error in handleLogin", error.message);
            set({ loggedIn: null})
        }
    },

    handleLogout: async () => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
          const data = await res.json();
          if(data.message) {
            set({ isloggedOut: true });
            set({ loggedIn: null });
            toast.success(data.message, {
              position: "top-right",
            });
          }
          else {
            set({ isloggedOut: false });
            toast.error(data.message, {
              position: "top-right",
            });
          }
    },

    handleSignup: async (email, username, password) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "email": email,
                    "username": username,
                    "password": password
                })
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error.message);
            return null;
        }
    }
}));

export default useAuthStore;