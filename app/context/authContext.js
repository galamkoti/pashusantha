import { createContext,useContext,useEffect,useState } from "react";

export const AuthContextProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(undefined);

    useEffect(()=>{
        // onAuthStateChanged();
    },[])

    const login=async (email,password)=>{
        try {
            
        } catch (error) {
            
        }
    }
    const logout = async () =>{
        try {
            
        } catch (error) {
            
        }
    }
    const register = async (email,password,phone,name)=>{
        try {
            
        } catch (error) {
            
        }
    }
    return <AuthContext.Provider value={{user,isAuthenticated,login,register,logout}}>
        {children}
    </AuthContext.Provider>
}

export const AuthContext= createContext();

export const useAuth = ()=>{
    return useContext(AuthContext);
}