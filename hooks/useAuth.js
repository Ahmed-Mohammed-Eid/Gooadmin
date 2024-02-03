import {useEffect, useState} from "react";
import axios from "axios";

const useAuthenticatedUser = () => {
    const [user, setUser] = useState(null);
    let isAuthenticated = false;

    useEffect(() => {
        const fetchAuthenticatedUser = async () => {
            try {
                // Fetch the authenticated user data from the API route
                const response = await axios.get("/api/auth/verifyToken");

                if (response.status === 200) {
                    // Set the authenticated user data
                    setUser(response.data.user);
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchAuthenticatedUser();
    }, []);

    return [user, (isAuthenticated = user !== null)];
};

export default useAuthenticatedUser;
