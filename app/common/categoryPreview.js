import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, ActivityIndicator, Text, RefreshControl, Image } from 'react-native';
import { FlashList } from "@shopify/flash-list";

import axios from 'axios';

import {router, useLocalSearchParams} from 'expo-router'

import PostCard from '../Components/Crops/CropsPostCard';

// Render function for PostCard
const renderItem = ({ item }) => {
  const createdAt = item.createdAt?.$date?.$numberLong || Date.now(); // Fallback to current time if undefined
  const imageUrl = item.images?.[0] || 'https://via.placeholder.com/200'; // Fallback image if not available
  const phoneNumber = item.phone.toString() || 'phone number not available'; // Fallback if phone is not available

  return (
    <PostCard
      category={item.animalType || 'Unknown'}
      price={item.price}
      distance={item.distance || 'N/A'} // Handle distance gracefully
      datePosted={item.createdAt} // Convert timestamp to a readable format
      image={imageUrl}
      userName={item.user || 'Anonymous'}
      description={item.description}
      breed={item.breed}
      onCallPress={() => handleCallPress(phoneNumber)}
      onPostPressed={() => handlePostPress(item)}
    />
  );
};

const handlePostPress = (item) => {
  console.log("pressed on post",item)
  router.push({pathname:`common/animalPostDetails`,params:item})
};

// Handle Call Button Press
const handleCallPress = (phone) => {
  Alert.alert('Calling', phone);
};

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [isRefreshing, setIsRefreshing] = useState(false); // Refreshing state for pull-to-refresh
  const item=useLocalSearchParams();
  const category=item.value;
    console.log(category,"catgeory")
    

  // Fetch data function (handles both initial fetch and pagination)
  const fetchAnimalPostsData = async (pageNumber = 1, isRefreshing = false) => {
    const animalType = 'cow';  // Example value for animalType
    const kind = 'AnimalPost';  // Example value for kind

    if (loading && !isRefreshing) return; // Prevent multiple calls at once unless it's a refresh

    setLoading(true);
    try {
      console.log("infinite wala")
      const response = await axios.get(`http://192.168.47.35:5000/api/posts/getCategory?page=${pageNumber}&animalType=${category}&kind=${kind}`);
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
      setLoading(false);
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

  if (loading && page === 1) return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator only for initial load
  if (error) return <Text>Error: {error.message}</Text>;


  return (
    <View style={styles.mainContainer}>
      { data.length>0?<FlashList
        data={data}
        estimatedItemSize={386}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Fallback key if _id is missing
        contentContainerStyle={styles.postContainer}
        onEndReached={loadMorePosts} // Pagination
        onEndReachedThreshold={0.7} // Trigger when the list is 70% from the bottom
        ListFooterComponent={renderFooter} // Show loading spinner at the bottom when loading more
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshPosts} /> // Pull-to-refresh
        }
      />:
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Image
      source={{ uri: 'https://media.giphy.com/media/11qwfyd5mTJvDa/giphy.gif' }}
      style={styles.no_posts_video}
    />
      <Text style={styles.emptyText}>No saved posts.</Text>
      </View>
      }
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  no_posts_video:{
    height:300,
    width:300
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  languagePicker: {
    width:150, // Adjust the width to your preference
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent:'center',
  },
  locationContainer: {
    flexDirection: 'row',
    marginLeft:12
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 5,
  },
  backAndLocationContainer:{
    flexDirection:"row"
  }
});

export default Index;
