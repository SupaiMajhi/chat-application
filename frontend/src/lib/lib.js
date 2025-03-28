
export const handleSignup = async (email, username, password) => {

}


export const getUsers = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/user/users`, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}



export const sendMessage = async (userId, text) => {
}


