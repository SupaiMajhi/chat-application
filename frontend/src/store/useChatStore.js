import { create } from "zustand";

const useChatStore = create((set) => ({
    messages: [],

    addMessage: (msg) => {
        set((state) => ({ messages: [...state.messages, msg]}));
    },

    fetchMessage: async (id) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/message/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
        });
        const data = await res.json();
        set({ messages: data.message });
    },

    sendMessage: async (userId, text) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/message/send/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    "content": text,
                })
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log("error in userChat store", error.message);
            return;
        }
    
    }
}));

export default useChatStore;