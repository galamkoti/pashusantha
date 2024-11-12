import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, ActivityIndicator, Text, RefreshControl, Image, Pressable, ScrollView } from 'react-native';
import PostCard from '../../Components/Crops/CropsPostCard';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from '../../context/LocationContext';
import {router} from 'expo-router'
import {Entypo,FontAwesome6} from '@expo/vector-icons';
import LocationModal from '../../Components/Location/locationModal';
import CategoriesList from '../../Components/Animal/CategoriesList';
import { FlashList } from "@shopify/flash-list";
import { CustomBottomSheetModal } from '../../Components/Animal/CustomBottomSheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


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
      price={item.price}
      userName={item.user || 'Anonymous'}
      description={item.description}
      breed={item.breed}
      onCallPress={() => handleCallPress(phoneNumber)}
      onPostPressed={() => handlePostPress(item)}
    />
  );
};

const languages=[
  {label:"English",value:"en"},
  {label:"తెలుగు",value:"te"},
  {label:"हिन्दी",value:"hi"},
  {label:"தமிழ்",value:"ta"},
  {label:"ಕನ್ನಡ",value:"kn"},
  {label:"മലയാളം",value:"ml"},
  {label:"ਪੰਜਾਬੀ",value:"pn"},
];



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
  const { language, translations, languageLoading, changeLanguage } = useLanguage();
  const { location, locationName, fetchLocation } = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Keep track of selected language
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const [posts,setPosts]=useState([]);
  const lat = 78.3906107;    // Replace with user's latitude
  const lon = 17.5269614;    // Replace with user's longitude
  const radius = 100; 

  const toggleLocationModal = () => {
    setLocationModalVisible(!isLocationModalVisible);
  }

  const handleLanguageChange=(selectedLang)=>{
    setSelectedLanguage(selectedLang);
    changeLanguage(selectedLang);
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
      changeLanguage(language);
    }
  }, [language, languageLoading]);

  // Render footer loading indicator for pagination
  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator size="large" color="#0000ff" />;
  };

  if (loading && page === 1) return 
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator size="large" color="#0000ff" />;
  </View>
  if (error) return <Text>Error: {error.message}</Text>;

  console.log("addres", locationName)

  return (
    <GestureHandlerRootView>
    <BottomSheetModalProvider>
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.topContainer}>
      <View style={styles.backAndLocationContainer}>
      {/* <FontAwesome6 name="arrow-left" size={24} color="black" onPress={()=> router.replace("/")} /> */}
          <Pressable style={styles.locationContainer} onPress={toggleLocationModal}>
            <Entypo name="location" size={24} color="black" />
            {locationName ?
              <Text style={styles.locationTitle}>{locationName}</Text>
              : <Text>Location is not given</Text>
            }
          </Pressable>
      </View>
          <CustomBottomSheetModal
                data={languages}
                modalTitle="Pick Language"
                selectedValue={selectedLanguage}  // Pass the selected value to change the label dynamically
                onValueSelected={handleLanguageChange}
              />
      </View>

      {
        data.length>0 ?       
        <FlashList
        data={data}
        estimatedItemSize={386}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id} // Fallback key if _id is missing
        contentContainerStyle={styles.postContainer}
        onEndReached={loadMorePosts} // Pagination
        onEndReachedThreshold={0.7} // Trigger when the list is 90% from the bottom
        ListFooterComponent={renderFooter} // Show loading spinner at the bottom when loading more
        ListHeaderComponent={
          <View>
            <CategoriesList />
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshPosts} /> // Pull-to-refresh
        }
      />:
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
  <Image source={{uri:"https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414590/sad_cow_rtvxow.png"}}
        style={{ height:200,width:"90%" }}/>
      <Text style={{fontSize:24,fontWeight:"bold"}}>No Posts to Show Currently</Text>
    </View>
      }


      <LocationModal 
      visible={isLocationModalVisible}
      onClose={toggleLocationModal}
      />
    </SafeAreaView>
    
    </BottomSheetModalProvider>
    </GestureHandlerRootView>
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
  },
  no_posts_video:{
    height:300,
    width:300,
  }
});

export default Index;
