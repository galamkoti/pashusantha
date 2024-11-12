import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, Alert, Linking, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useSavePost } from '../context/SavePostContext'; // Import the save context
import * as Sharing from 'expo-sharing'; // Import expo-sharing
import { useUserData } from '../context/UserContext'; 
import { useLanguage } from '../context/LanguageContext';
import { Video, ResizeMode } from 'expo-av';
import { useInterstitialAd, TestIds, BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { router } from 'expo-router';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const AnimalPostDetails = () => {
    const { isLoaded, isClosed, load, show } = useInterstitialAd(TestIds.INTERSTITIAL);
    const item = useLocalSearchParams(); 
    const {user} = useUserData();
    const {translations} = useLanguage();
    const { phone, price, animalType, breed, age, images, _id, videos, isBargainable, milkCapacity,lactationPeriod,locationName,pregnancyStatus} = item;  // videos added here
    const { savedPosts, addPost, removePost } = useSavePost();  // Get context methods
    const videoRef = useRef(null); // Reference to video player
    const [status, setStatus] = useState({ isPlaying: false });

    const [isSaved, setIsSaved] = useState(false); // State to check if the post is saved

    // Prepare a unified data source combining images and video
    const imageArray = images ? images.split(',') : [];  // Split images into an array
    const mediaArray = [...imageArray]; // Add images to the array first
    if (videos) mediaArray.push({ type: 'video', uri: videos }); // Add video after images if available

    useEffect(() => {
        // Start loading the interstitial straight away
        load();
      }, [load]);
    
      useEffect(() => {
        if (isClosed) {
          // Action after the ad is closed
        //   navigation.navigate('NextScreen');
        router.back();
        }
      }, [isClosed]);

      
    useEffect(() => {
        checkIfSaved(); // Check if the post is already saved
    }, [savedPosts]);  // Re-run this whenever savedPosts changes

    // Function to check if the post is already in savedPosts
    const checkIfSaved = () => {
        const isAlreadySaved = savedPosts.some(post => post._id === _id);
        setIsSaved(isAlreadySaved);
    };

    // Function to save or unsave the post
    const toggleSavePost = () => {
        if(!user){
            Alert.alert(translations.login||"Login",translations.please_login_to_proceed||"Please Login To Proceed",[
              {
                text:translations.cancel||"CANCEL",
                style:"cancel"
              },
              {
                text:translations.login||"LOGIN",
                style:'default',
                onPress: () => {
                  router.push({pathname:"auth/phonelogin"})
                }
              }
            ])
          }
    else{
        if (isSaved) {
            // Remove post from saved posts
            removePost(_id);
            setIsSaved(false);
            Alert.alert(translations.removed_from_saved_posts||'Removed from saved Posts');
        } else {
            // Add post to saved posts
            addPost(item);
            setIsSaved(true);
            Alert.alert(translations.post_got_saved||'Added to saved Posts');
        }
    }
    };

    // Function to share the post details
    // const sharePost = async () => {
    //     try {
    //         const message = `Check out this pashu`;
    //         await Sharing.shareAsync(null, {
    //             dialogTitle: 'Share Animal Post',
    //             mimeType: 'text/plain',
    //             message: message,
    //         });
    //     } catch (error) {
    //         Alert.alert('Error', 'There was a problem sharing the post.');
    //     }
    // };

    const handleCallSeller = () => {
        if(!user){
            Alert.alert(translations.login||"Login",translations.please_login_to_proceed||"Please Login To Proceed",[
              {
                text:translations.cancel||"CANCEL",
                style:"cancel"
              },
              {
                text:translations.login||"LOGIN",
                style:'default',
                onPress: () => {
                  router.push({pathname:"auth/phonelogin"})
                }
              }
            ])
          }
          else{

              Alert.alert(translations.call_seller||"Call Seller", translations.are_you_sure_to_call||"Are You Sure to Call?", [
                  {
                      text: translations.cancel || "CANCEL",
                      onPress: () => console.log("Cancel Pressed"),
                      style: "cancel"
                  },
                  {
                      text: translations.call||"CALL",
                      onPress: () => {
                          console.log(user.phone, "calling", phone),
                          Linking.openURL(`tel:${phone}`)
                      },
                      style: "default"
                  }
              ])
          }
    }

    return (
        <ScrollView contentContainerStyle={styles.container} >
            {/* Media Slider (Images and Video) */}
            <FlatList
                data={mediaArray}
                keyExtractor={(media, index) => index.toString()}  // Unique key for each media item
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    item.type === 'video' ? (
                        <View>
                            <Video
                                ref={videoRef}
                                style={styles.mediaContent} // Make video the same size as images
                                source={{
                                    uri: item.uri,
                                }}
                                useNativeControls={false}
                                resizeMode={ResizeMode.CONTAIN}
                                isLooping
                                onPlaybackStatusUpdate={status => setStatus(() => status)}
                            />
                            <View style={styles.buttons}>
                                <Button
                                  title={status.isPlaying ? 'Pause' : 'Play'}
                                  onPress={() =>
                                    status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()
                                  }
                                />
                            </View>
                        </View>
                    ) : (
                        <Image source={{ uri: item }} style={styles.mediaContent} />  // Display image
                    )
                )}
                style={styles.mediaList}
            />

            {/* Animal Info */}
            <Text style={styles.title}>{translations[animalType] || animalType} {translations.for_sale} - {translations[breed] || breed} {translations.belongs_to_breed}</Text>

            {/* Animal Details */}
            <View style={styles.detailsContainer}>
            <Text style={styles.label}>{translations.category || "Category"}:</Text>
                <Text style={styles.value}>{translations[animalType] || animalType}</Text>

                <Text style={styles.label}>{translations.breed || "Breed"}:</Text>
                <Text style={styles.value}>{translations[breed] || breed}</Text>

                <Text style={styles.label}>{translations.milk_capacity || "Milk Capacity"}:</Text>
                <Text style={styles.value}>{milkCapacity}{translations.litres}</Text>

                <Text style={styles.label}>{translations.age_of_pashu || "Age"}:</Text>
                <Text style={styles.value}>{age} { translations.years_old||"years old"}</Text>

                <Text style={styles.label}>{translations.price || "Price"}:</Text>
                
                <Text style={styles.value}><FontAwesome5 name="rupee-sign" size={20} color="#555" />{price}</Text>


                <Text style={styles.label}>{translations.pregnancy || "Pregnancy Status"}:</Text>
                <Text style={styles.value}>{pregnancyStatus=='yes'?translations.is_present:translations.not_present||pregnancyStatus}</Text>

                <Text style={styles.label}>{translations.is_bargainable || "Bargainable or Not?"}:</Text>
                <Text style={styles.value}>{isBargainable=='yes'?translations.can_play_bargain:translations.cannot_play_bargain||isBargainable}</Text>
                
                <Text style={styles.label}>{translations.location || "Location"}:</Text>
                <Text style={styles.value}>{locationName}</Text>
            </View>

            {/* Call to Action Button */}
            <TouchableOpacity  onPress={() => handleCallSeller()} style={{backgroundColor:"black",justifyContent:"center",alignItems:"center",padding:5,flexDirection:"row"}}>
                <FontAwesome name='phone' size={24} color="white" />
                <Text style={{color:"white",fontSize:20,marginLeft:20}}>{translations.call_seller||"Call Seller"}</Text>
            </TouchableOpacity>

            {/* Save Post Button */}
            <TouchableOpacity style={styles.saveButton} onPress={toggleSavePost}>
                <FontAwesome name={isSaved ? "bookmark" : "bookmark-o"} size={24} color={isSaved ? "black" : "#000"} />
                <Text style={styles.saveText}>{isSaved ? 'Saved to Favorites' : 'Save Post'}</Text>
            </TouchableOpacity>

            {/* Share Post Button */}
            {/* <TouchableOpacity style={styles.shareButton} onPress={sharePost}>
                <FontAwesome name="share" size={24} color="black" />
                <Text style={styles.shareText}>{translations.share_post||"Share Post"}</Text>
            </TouchableOpacity> */}
            {/* <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
                networkExtras: {
                collapsible: 'bottom',
                },
            }}
            />
             <Button
        title="Navigate to next screen"
        onPress={() => {
          if (isLoaded) {
            show();
          } else {
            // No advert ready to show yet
            // navigation.navigate('NextScreen');
            router.back();
          }
        }}
      /> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    mediaList: {
        marginBottom: 20,
    },
    mediaContent: {
        width: 300,
        height: 350,  // Same height and width for both images and videos
        borderRadius: 10,
        marginRight: 10,  // Add some space between items
    },
    buttons: {
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailsContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 5,
    },
    value: {
        fontSize: 20,
        marginBottom: 10,
        color: '#555',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginTop: 20,
    },
    saveText: {
        marginLeft: 10,
        fontSize: 16,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginTop: 20,
    },
    shareText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default AnimalPostDetails;
