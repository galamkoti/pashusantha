import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, ActivityIndicator, Text, RefreshControl, Image } from 'react-native';
import axios from 'axios';
import { useUserData } from '../context/UserContext';
import MyPostCard from '../Components/Animal/MyPostCard';
import { router } from 'expo-router';
import { useLanguage } from '../context/LanguageContext';

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAtDelete, setLoadingAtDelete] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);   // Current page number
  const [totalPages, setTotalPages] = useState(1);  // Total number of pages
  const [isRefreshing, setIsRefreshing] = useState(false);  // Refreshing state for pull-to-refresh
  const {user}=useUserData();
  const {translations}=useLanguage();
  const videoRef=useRef(null);
  console.log("user in myposts",user._id)

  useEffect(()=>{
    if(videoRef.current){
      videoRef.current.playAsync();
    }
  },[])



  // Render function for PostCard
const renderItem = ({ item }) => {
  const createdAt = item.createdAt?.$date?.$numberLong || Date.now(); // Fallback to current time if undefined
  const imageUrl = item.images?.[0] || 'https://via.placeholder.com/200'; // Fallback image if not available
  const phoneNumber = item.phone.toString() || 'phone number not available'; // Fallback if phone is not available

  return (
    <MyPostCard
      category={item.animalType || 'Unknown'}
      post_id={item._id}
      price={item.price}
      distance={item.distance || 'N/A'} // Handle distance gracefully
      datePosted={item.createdAt} // Convert timestamp to a readable format
      image={imageUrl}
      userName={item.user || 'Anonymous'}
      description={item.description}
      breed={item.breed}
      onCallPress={() => handleCallPress(phoneNumber)}
      onPostPressed={()=> handlePostPress(item)}
      confirmDeletePost= { ()=>confirmDeletePost(item._id)}
    />
  );
};

const confirmDeletePost = async(post_id) =>{
  setLoadingAtDelete(true);
  try {
    const result = await axios.delete(`https://pashupanta-backend-production.up.railway.app/api/posts/delete/${post_id}/${user._id}`);
    // const {data}=result.data;
    console.log("data of deletion",result);
    if(result.status==201){
      Alert.alert(translations.post_deleted_successfully||result.data.message);
      const afterDeletedata=data.filter((item)=>item._id!=post_id);
      setData(afterDeletedata);
    }
  } catch (error) {
    console.log("error while deleting post",error);
  }
  setLoadingAtDelete(false);
}
const handlePostPress = (item) => {
  console.log("pressed on post",item)
  router.push({pathname:`common/animalPostDetails`,params:item})
};

  // Fetch data function (handles both initial fetch and pagination)
  const fetchAnimalPostsData = async (pageNumber = 1, isRefreshing = false) => {
    if (loading && !isRefreshing) return; // Prevent multiple calls at once unless it's a refresh
    setLoading(true);

    try {
      const response = await axios.get(`https://pashupanta-backend-production.up.railway.app/api/posts/myposts/user/${user._id}?page=${pageNumber}`);
      const { data: fetchedData, totalPages: serverTotalPages } = response.data;
      if (pageNumber === 1) {
        setData(fetchedData); // If it's the first page or a refresh, replace existing posts
      } else {
        setData((prevData) => [...prevData, ...fetchedData]); // Otherwise, append new posts
      }
      
      setTotalPages(serverTotalPages); // Update total pages from the server
      setPage(pageNumber);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      if (isRefreshing) setIsRefreshing(false); // Reset refreshing state
    }
  };

  // Fetch initial data on component mount
  useEffect(() => {
    fetchAnimalPostsData();
  }, []);

  // Load more data when the user reaches the end of the list
  const loadMorePosts = () => {
    if (page < totalPages && !loading) {
      fetchAnimalPostsData(page + 1);
    }
  };

  // Refresh the data (pull-to-refresh)
  const refreshPosts = async () => {
    setIsRefreshing(true);
    await fetchAnimalPostsData(1, true); // Reset to page 1 and refresh
  };

  // Render footer loading indicator for pagination
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  if(loadingAtDelete){
    return  (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size="large" color="black" />
    </View>);
  }
  if (loading && page === 1) return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator only for initial load
  if (error) return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text style={{fontSize:22,fontWeight:"bold"}}>Please Check your Internet</Text>
      </View>);

  return (
    <View style={styles.mainContainer}>
      {data.length>0?
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Fallback key if _id is missing
        contentContainerStyle={styles.postContainer}
        onEndReached={loadMorePosts} // Pagination
        onEndReachedThreshold={0.9} // Trigger when the list is 90% from the bottom
        ListFooterComponent={renderFooter} // Show loading spinner at the bottom when loading more
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshPosts} /> // Pull-to-refresh
        }
      />:
      <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#fff"}}>
        {/* <Image
        source={{ uri: 'https://media.giphy.com/media/11qwfyd5mTJvDa/giphy.gif' }}
        style={styles.no_posts_video}
      /> */}
       <Image source={{uri:"https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414590/sad_cow_rtvxow.png"}}
         style={{ height:200,width:"90%" }}/>
        <Text style={{fontSize:24,fontWeight:"bold",marginTop:50}}>{translations.did_not_found_posts_from_you||"No Posts From You"}</Text>
      </View>}
      
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  no_posts_video:{
    height:300,
    width:300,
  }
});

export default Index;
