import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spin } from 'antd'
// file
import { auth } from '../../firebase/config';

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            // console.log({ user })
            if (user) {
                const { displayName, email, photoURL, uid } = user
                setUser({
                    displayName, email, photoURL, uid
                })
                setLoading(false)
                history.push('/')
            }
            else {
                setLoading(false)
                history.push('/login')
            }
        })

        return () => unsubscribe()

    }, [history]);

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin /> : children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;