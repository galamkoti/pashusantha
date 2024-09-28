import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, ActivityIndicator, Text, RefreshControl, Button, Pressable } from 'react-native';
import PostCard from '../../Components/Crops/CropsPostCard';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from '../../context/LocationContext';
import { Picker } from '@react-native-picker/picker';
import {router} from 'expo-router'
import Entypo from '@expo/vector-icons/Entypo';
import LocationModal from '../../Components/Location/locationModal';

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
      onPostPressed={() => handlePostPress(item)}
    />
  );
};

const handlePostPress = (item) => {
  console.log("pressed on post",item)
  router.push({pathname:`forms/animalPostDetails`,params:item})
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
  const { language, translations, languageLoading, changeLanguage } = useLanguage();
  const { location, locationName, fetchLocation } = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Keep track of selected language
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);

  const toggleLocationModal = () => {
    setLocationModalVisible(!isLocationModalVisible);
  }

  // Fetch data function (handles both initial fetch and pagination)
  const fetchAnimalPostsData = async (pageNumber = 1, isRefreshing = false) => {
    if (loading && !isRefreshing) return; // Prevent multiple calls at once unless it's a refresh
    setLoading(true);
    const animalKind = 'AnimalPost';
    try {
      const response = await axios.get(`https://pashupanta-backend-production.up.railway.app/api/posts?page=${pageNumber}&kind=${animalKind}`);
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

  // Sync selectedLanguage with the language from context after it's loaded
  useEffect(() => {
    if (!languageLoading && selectedLanguage !== language) {
      setSelectedLanguage(language); // Only set selected language when language loading is done and it's different
    }
  }, [language, languageLoading]);

  // Render footer loading indicator for pagination
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  if (loading && page === 1) return <ActivityIndicator size="large" color="#0000ff" />; // Show loading indicator only for initial load
  if (error) return <Text>Error: {error.message}</Text>;

  console.log("addres", locationName)

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Pressable style={styles.locationContainer} onPress={toggleLocationModal}>
          <Entypo name="location" size={24} color="black" />
          {locationName ?
            <Text style={styles.locationTitle}>{locationName}</Text>
            : <Text>Location is not given</Text>
          }
        </Pressable>
        {/* Show Picker only after language has been loaded */}
        {!languageLoading && (
          <View style={styles.languagePicker}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => {
                setSelectedLanguage(itemValue); // Update selected language
                changeLanguage(itemValue); // Call changeLanguage to update the language in context
              }}
            >
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Telugu (తెలుగు)" value="te" />
              <Picker.Item label="Tamil (தமிழ்)" value="ta" />
              <Picker.Item label="Kannada (ಕನ್ನಡ)" value="kn" />
              <Picker.Item label="Hindi (हिन्दी)" value="hi" />
              <Picker.Item label="Malayalam(മലയാളം)" value="ml" />
              <Picker.Item label="Punjabi (ਪੰਜਾਬੀ)" value="pa" />
            </Picker>
          </View>
        )}
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
      <LocationModal 
      visible={isLocationModalVisible}
      onClose={toggleLocationModal}
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
  },
  locationContainer: {
    flexDirection: 'row',
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 5,
  },
});

export default Index;
