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
import { usePosts } from '../../context/postsContext';


// Render function for PostCard
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



const handlePostPress = (item) => {
  console.log("pressed on post",item)
  router.push({pathname:`common/animalPostDetails`,params:item})
};


const Index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false); // Refreshing state for pull-to-refresh
  const { language, translations, languageLoading, changeLanguage } = useLanguage();
  const { location, locationName, fetchLocation } = useLocation();
  const [selectedLanguage, setSelectedLanguage] = useState(null); // Keep track of selected language
  const [isLocationModalVisible, setLocationModalVisible] = useState(false);
  const { posts, loading, error, fetchPosts, page, totalPages } = usePosts();

  const toggleLocationModal = () => {
    setLocationModalVisible(!isLocationModalVisible);
  }

  const handleLanguageChange=(selectedLang)=>{
    setSelectedLanguage(selectedLang);
    changeLanguage(selectedLang);
  }

  // Fetch initial data on component mount
  useEffect(() => {
    fetchPosts(); // Fetch posts on component mount
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

  if (loading && page === 1) return 
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <ActivityIndicator size="large" color="#0000ff" />;
  </View>
  if (error) return (
  <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
    <Text>Please Check your Internet</Text>
    </View>);

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
        posts.length>0 ?     
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
