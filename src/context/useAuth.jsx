import { useState, useContext } from "react";
import { createContext } from "react";
export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext)
}


export function AuthProvider({ children }) {
    const [user, setUser] = useState({
        token: localStorage.getItem("token"),
        username: localStorage.getItem("username"),
        rol: localStorage.getItem("user_rol")
    })
    function login(data) {
        localStorage.setItem("token", data.access_token)
        localStorage.setItem("username", data.user_name)
        localStorage.setItem("user_rol", data.user_role)
        setUser({token:data.access_token, username: data.user_name, rol:data.user_role})
    }

    function logout() {
        localStorage.clear()
        setUser({token:null, username: null, rol:null})
    }
    
    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}