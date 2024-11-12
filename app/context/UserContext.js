import React,{useState,useEffect, createContext, useContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from "expo-router";

const  userContext=createContext();

export const UserProvider= ({children})=>{
    const [user,setUser]=useState(null);
    const [userLoading,setUserLoading]=useState(true);
    const loginUser=async(userData)=>{
        try{
            await AsyncStorage.setItem("user",JSON.stringify(userData));
            setUser(userData);
        }
        catch(error){
            console.log('Error saving user data to AsyncStorage', error.message);
        }
    }
    const logoutUser=async()=>{
        try {
            router.replace("/auth/phonelogin")
            setUser(null);
            await AsyncStorage.removeItem("user");
            console.log("removed user fromasync")
        } catch (error) {   
            console.log('Error removing user data from AsyncStorage', error.message);
        }
    }
    const checkLoginStatus=async()=>{
        try {
            const userInfo=await AsyncStorage.getItem("user");
            console.log("user in context",userInfo);
            if(userInfo){
                setUser(JSON.parse(userInfo));
            }
        } catch (error) {
            console.log('Error fetching user data from AsyncStorage', error.message);
        }finally{
            setUserLoading(false);
        }
    }
    useEffect(()=>{
        checkLoginStatus();
    },[]);
    return (
        <userContext.Provider value={{loginUser,logoutUser,userLoading,setUserLoading,user,checkLoginStatus}}>
            {children}
        </userContext.Provider>
    );
}
export const useUserData = () => {
    return useContext(userContext);
}