import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, FlatList, Alert, ActivityIndicator, Text, RefreshControl, Image, Pressable, ScrollView } from 'react-native';
import PostCard from '../../Components/Crops/CropsPostCard';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from '../../context/LocationContext';
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import LocationModal from '../../Components/Location/locationModal';
import CategoriesList from '../../Components/Animal/CategoriesList';
import { FlashList } from "@shopify/flash-list";
import { CustomBottomSheetModal } from '../../Components/Animal/CustomBottomSheetModal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { usePosts } from '../../context/postsContext';

const Index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false); // Refreshing state for pull-to-refresh
  const [showSplash, setShowSplash] = useState(true); // State for showing the splash screen
  const { language, translations, languageLoading, changeLanguage } = useLanguage();
  const { location, locationName, fetchLocation } = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Keep track of selected language
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const { posts, loading, error, fetchPosts, page, totalPages } = usePosts();


  const renderItem = ({ item }) => {
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
  

  // Toggle location modal visibility
  const toggleLocationModal = () => {
    setLocationModalVisible(!isLocationModalVisible);
  };

  const handlePostPress = (item) => {
    console.log("pressed on post",item)
    router.push({pathname:`common/animalPostDetails`,params:item})
  };

  const handleLanguageChange = (selectedLang) => {
    setSelectedLanguage(selectedLang);
    changeLanguage(selectedLang);
  };

  // Show splash screen for 3 seconds on component mount
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setShowSplash(false); // Hide splash screen after 3 seconds
      fetchPosts(); // Fetch posts once splash screen is hidden
    }, 2000);

    return () => clearTimeout(splashTimeout); // Cleanup the timeout if component unmounts early
  }, []);

  const loadMorePosts = () => {
    if (page < totalPages && !loading) {
      fetchPosts(page + 1); // Load more posts when the end of the list is reached
    }
  };

  const refreshPosts = () => {
    fetchPosts(1, true); // Refresh posts
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

  // Show splash screen if `showSplash` is true
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  if (loading && page === 1)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" , backgroundColor: "#fff"}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  if (error)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Please Check your Internet</Text>
      </View>
    );

  console.log("language",language);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <View style={styles.backAndLocationContainer}>
              <Pressable style={styles.locationContainer} onPress={toggleLocationModal}>
                <Entypo name="location" size={24} color="black" />
                {locationName ? (
                  <Text style={styles.locationTitle}>{locationName}</Text>
                ) : (
                  <Text>Location is not given</Text>
                )}
              </Pressable>
            </View>
            <CustomBottomSheetModal
              data={languages}
              modalTitle="Pick Language"
              selectedValue={selectedLanguage} // Pass the selected value to change the label dynamically
              onValueSelected={handleLanguageChange}
            />
          </View>

          {posts.length > 0 ? (
             <FlashList
        data={posts}
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
        } />
          ) : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{ uri: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414590/sad_cow_rtvxow.png" }}
                style={{ height: 200, width: "90%" }}
              />
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>No Posts to Show Currently</Text>
            </View>
          )}
          <LocationModal visible={isLocationModalVisible} onClose={toggleLocationModal} />
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  postContainer: {
    padding: 10,
    backgroundColor: "#fff",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  locationContainer: {
    flexDirection: "row",
    marginLeft: 12,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: "400",
    marginLeft: 5,
  },
  backAndLocationContainer: {
    flexDirection: "row",
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  splashImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Index;
