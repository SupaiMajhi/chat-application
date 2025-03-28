import { create } from "zustand";
import useChatStore from "./useChatStore.js";

const useUserStore = create((set) => ({
    selectedUser: null,
    receiverId: '',

    getSelectedUserInfo: async (id) => {
        try 
            {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/${id}`,{
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                });
                const data = await res.json();
                set({ selectedUser: data });
                set({ receiverId: data.selectedUser._id });
            } 
        catch (error) {
            console.log("error in getSelectedUserInfo ", error.message);
        }

    }
  }));

export default useUserStore;