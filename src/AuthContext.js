import React, {createContext} from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    username: '',
    accountId: null,
    sessionId: null,
});

export const AuthProvider = ({children, auth}) => {
    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
};