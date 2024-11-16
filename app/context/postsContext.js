import axios from "axios";
import { createContext,useContext,useEffect,useState } from "react";

const PostsContext= createContext();

export const PostsContextProvider=({children})=>{
    const [posts,setPosts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);
    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);

    const addPost = (newPost) =>{
        setPosts((prevPosts)=>[newPost,...prevPosts]);
    }

    const fetchPosts = async (pageNumber = 1, isRefreshing = false) => {
        if (loading && !isRefreshing) return; // Prevent duplicate calls
        setLoading(true);
        const animalKind = 'AnimalPost';
    
        try {
          const response = await axios.get(
            `https://pashupanta-backend-production.up.railway.app/api/posts?page=${pageNumber}&kind=${animalKind}`
          );
          const { data: fetchedData, totalPages: serverTotalPages } = response.data;
    
          if (pageNumber === 1 || isRefreshing) {
            setPosts(fetchedData); // Replace posts if it's the first page or refresh
          } else {
            setPosts((prevPosts) => [...prevPosts, ...fetchedData]); // Append new posts otherwise
          }
    
          setTotalPages(serverTotalPages);
          setPage(pageNumber);
        } catch (fetchError) {
          setError(fetchError);
        } finally {
          setLoading(false);
        }
      };

      const contextValue = {posts,loading,error,fetchPosts,totalPages,page,setPage,setPosts,addPost};
    return <PostsContext.Provider value={contextValue}>
        {children}
    </PostsContext.Provider>
}


export const usePosts = ()=>{
    return useContext(PostsContext);
}