import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const SavePostContext = createContext();

export const SavePostProvider = ({ children }) => {
    const [savedPosts, setSavedPosts] = useState([]);

    // Function to fetch saved posts from AsyncStorage
    const fetchSavedPosts = async () => {
        try {
            const savedPosts = await AsyncStorage.getItem('savedPosts');
            const postsArray = savedPosts ? JSON.parse(savedPosts) : [];
            setSavedPosts(postsArray);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to add a post to saved posts
    const addPost = async (post) => {
        try {
            const updatedPosts = [...savedPosts, post];  // Add new post
            await AsyncStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
            setSavedPosts(updatedPosts);  // Update state immediately
        } catch (error) {
            console.log(error);
        }
    };

    // Function to remove a post from saved posts
    const removePost = async (postId) => {
        try {
            const updatedPosts = savedPosts.filter(post => post._id !== postId);  // Filter out the removed post
            await AsyncStorage.setItem('savedPosts', JSON.stringify(updatedPosts));
            setSavedPosts(updatedPosts);  // Update state immediately
        } catch (error) {
            console.log(error);
        }
    };

    // Call fetchSavedPosts only when the component mounts
    useEffect(() => {
        fetchSavedPosts();
    }, []);

    return (
        <SavePostContext.Provider value={{ savedPosts, addPost, removePost }}>
            {children}
        </SavePostContext.Provider>
    );
};

export const useSavePost = () => {
    return useContext(SavePostContext);
};
