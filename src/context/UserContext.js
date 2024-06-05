import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`/recommendations/${user.id}`)
                .then(response => setRecommendations(response.data));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, recommendations }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
