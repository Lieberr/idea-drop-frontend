import {createContext, useContext, useState, type ReactNode} from 'react';
import { useEffect } from 'react';
import { refreshAccessToken } from '#/api/auth';
import { setStoredAcessToken } from '#/lib/authToken';


type AuthContextType = {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    user: {
        id: string;
        email: string;
        name: string;
    } | null;
    setUser: (user: AuthContextType['user']) => void
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthContextType['user'] | null>(null);

    useEffect(() => {
        const loadAuth = async () => {
            try {
                const {accessToken: newToken, user} = await refreshAccessToken();
                setAccessToken(newToken);
                setUser(user);
                setStoredAcessToken(newToken);
            } catch (err: any) {
                console.log('Failed to refresh token', err)
            }
        }

        loadAuth();
    }, []);


    useEffect(() => {
        setStoredAcessToken(accessToken);
    }, [accessToken])


    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, user, setUser}} >
            {children}
        </AuthContext.Provider>
    )
}  


export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) throw new Error('Userauth must be used within a provider')
        return context;
}

