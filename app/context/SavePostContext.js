import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const SavePostContext=createContext();

export const SavePostProvider=({children})=>{
    const [savedPosts, setSavedPosts] = useState([]);
    const fetchSavedPosts = async () => {
        try {
            const savedPosts = await AsyncStorage.getItem('savedPosts');
            const postsArray = savedPosts ? JSON.parse(savedPosts) : [];
            setSavedPosts(postsArray);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(()=>{
        fetchSavedPosts();
    },[savedPosts]);
    return <SavePostContext.Provider value={{savedPosts}}>
        {children}
    </SavePostContext.Provider>
}

export const useSavePost =()=>{
    return useContext(SavePostContext);
}