import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

const MainContext = ({children}) => {
    const [currentuser, setCurrentuser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(()=> {
        localStorage.getItem('uchat')
        setCurrentuser(JSON.parse(localStorage.getItem('uchat')))
        setLoading(false);
    }, [])
    const info = {
        currentuser,
        loading, 
        setLoading
    }
    return (
    <AuthContext.Provider value = { info } >
        {children}
    </AuthContext.Provider > 
    );
};

export default MainContext;