import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, ActivityIndicator, Text, RefreshControl, Button } from 'react-native';
import PostCard from '../../Components/Crops/CropsPostCard';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useLanguage,LanguageProvider} from '../../context/LanguageContext';

// Render function for PostCard
const renderItem = ({ item }) => {
  const createdAt = item.createdAt?.$date?.$numberLong || Date.now(); // Fallback to current time if undefined
  const imageUrl = item.images?.[0] || 'https://via.placeholder.com/200'; // Fallback image if not available
  const phoneNumber = item.phone.toString() || 'phone number not available'; // Fallback if phone is not available

  return (
    <PostCard
      category={item.animalType || 'Unknown'}
      distance={item.distance || 'N/A'} // Handle distance gracefully
      datePosted={item.createdAt} // Convert timestamp to a readable format
      image={imageUrl}
      userName={item.user || 'Anonymous'}
      description={item.description}
      breed={item.breed}
      onCallPress={() => handleCallPress(phoneNumber)}
      onPostPressed={()=> handlePostPress()}
    />
  );
};
const handlePostPress =()=>{
  Alert.alert("Clicked On Post")
}
// Handle Call Button Press
const handleCallPress = (phone) => {
  Alert.alert('Calling', phone);
};

const Index = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);   // Current page number
  const [totalPages, setTotalPages] = useState(1);  // Total number of pages
  const [isRefreshing, setIsRefreshing] = useState(false);  // Refreshing state for pull-to-refresh
  const { language, translations, languageLoading, changeLanguage } = useLanguage();

  // Fetch data function (handles both initial fetch and pagination)
  const fetchAnimalPostsData = async (pageNumber = 1, isRefreshing = false) => {
    if (loading && !isRefreshing) return; // Prevent multiple calls at once unless it's a refresh
    setLoading(true);
    const animalKind="AnimalPost";
    try {
      const response = await axios.get(`http://192.168.0.110:5000/api/posts?page=${pageNumber}&kind=${animalKind}`);
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

  if (loading && page === 1) return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator only for initial load
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Text>Kphb,Hyderabad</Text>
        <Button title="Telugu" onPress={() => changeLanguage('te')} />
        <Button title="Tamil" onPress={() => changeLanguage('ta')} />
        <Text style={styles.text}>{translations.buy || 'Buy'}</Text>
      <Text style={styles.text}>{translations.sell || 'Sell'}</Text>
      <Text style={styles.text}>{translations.animals || 'Animals'}</Text>
      <Text style={styles.text}>{translations.crops || 'Crops'}</Text>
      </View>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id?.$oid || item.id} // Fallback key if _id is missing
        contentContainerStyle={styles.postContainer}
        onEndReached={loadMorePosts} // Pagination
        onEndReachedThreshold={0.9} // Trigger when the list is 90% from the bottom
        ListFooterComponent={renderFooter} // Show loading spinner at the bottom when loading more
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshPosts} /> // Pull-to-refresh
        }
      />
    </SafeAreaView>
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
    backgroundColor: '#f2f2f2',
  },
  topContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
});

export default Index;
