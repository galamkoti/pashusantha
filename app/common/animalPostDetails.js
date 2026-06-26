import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  FlatList,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { useSavePost } from '../context/SavePostContext';
import { useUserData } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { router } from 'expo-router';

// Define ad unit IDs based on environment

const AnimalPostDetails = () => {
  // Fetch search parameters and user data
  const item = useLocalSearchParams();
  const { user } = useUserData();
  const { translations } = useLanguage();

  // Destructure item properties
  const {
    phone,
    price,
    animalType,
    breed,
    age,
    images,
    _id,
    videos,
    isBargainable,
    milkCapacity,
    locationName,
    pregnancyStatus,
  } = item;

  // Fetch saved posts context
  const { savedPosts, addPost, removePost } = useSavePost();

  // Video playback reference
  const videoRef = useRef(null);

  // State management
  const [status, setStatus] = useState({ isPlaying: false }); // Video playback status
  const [isSaved, setIsSaved] = useState(false); // Save post status

  // Check if the current post is already saved
  useEffect(() => {
    const isAlreadySaved = savedPosts.some(post => post._id === _id);
    setIsSaved(isAlreadySaved);
  }, [savedPosts]);

  // Convert images and videos into a media array
  const mediaArray = images ? images.split(',') : [];
  if (videos) mediaArray.push({ type: 'video', uri: videos });

  // Handle save post toggle
  const toggleSavePost = () => {
    if (!user) {
      Alert.alert(
        translations.login || 'Login',
        translations.please_login_to_proceed || 'Please Login To Proceed',
        [
          { text: translations.cancel || 'CANCEL', style: 'cancel' },
          {
            text: translations.login || 'LOGIN',
            style: 'default',
            onPress: () => router.push({ pathname: 'auth/phonelogin' }),
          },
        ]
      );
    } else {
      if (isSaved) {
        removePost(_id);
        setIsSaved(false);
        Alert.alert(translations.removed_from_saved_posts || 'Removed from saved Posts');
      } else {
        addPost(item);
        setIsSaved(true);
        Alert.alert(translations.post_got_saved || 'Added to saved Posts');
      }
    }
  };

  // Handle call seller action
  const handleCallSeller = () => {
    if (!user) {
      Alert.alert(
        translations.login || 'Login',
        translations.please_login_to_proceed || 'Please Login To Proceed',
        [
          { text: translations.cancel || 'CANCEL', style: 'cancel' },
          {
            text: translations.login || 'LOGIN',
            style: 'default',
            onPress: () => router.push({ pathname: 'auth/phonelogin' }),
          },
        ]
      );
    } else {
      Alert.alert(
        translations.call_seller || 'Call Seller',
        translations.are_you_sure_to_call || 'Are You Sure to Call?',
        [
          { text: translations.cancel || 'CANCEL', style: 'cancel' },
          {
            text: translations.call || 'CALL',
            onPress: () => {
              Linking.openURL(`tel:${phone}`); // Directly make the call
            },
          },
        ]
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Display media content */}
      <FlatList
        data={mediaArray}
        keyExtractor={(media, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          item.type === 'video' ? (
            <View>
              <Video
                ref={videoRef}
                style={styles.mediaContent}
                source={{ uri: item.uri }}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
              <View style={styles.buttons}>
                <Button
                  title={status.isPlaying ? 'Pause' : 'Play'}
                  onPress={() =>
                    status.isPlaying
                      ? videoRef.current.pauseAsync()
                      : videoRef.current.playAsync()
                  }
                />
              </View>
            </View>
          ) : (
            <Image source={{ uri: item }} style={styles.mediaContent} />
          )
        }
        style={styles.mediaList}
      />

      {/* Post details */}
      <Text style={styles.title}>
        {translations[animalType] || animalType} {translations.for_sale} - {translations[breed] || breed}{' '}
        {translations.belongs_to_breed}
      </Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>{translations.category || 'Category'}:</Text>
        <Text style={styles.value}>{translations[animalType] || animalType}</Text>

        <Text style={styles.label}>{translations.breed || 'Breed'}:</Text>
        <Text style={styles.value}>{translations[breed] || breed}</Text>

        <Text style={styles.label}>{translations.milk_capacity || 'Milk Capacity'}:</Text>
        <Text style={styles.value}>{milkCapacity} {translations.litres}</Text>

        <Text style={styles.label}>{translations.age_of_pashu || 'Age'}:</Text>
        <Text style={styles.value}>{age} {translations.years_old || 'years old'}</Text>

        <Text style={styles.label}>{translations.price || 'Price'}:</Text>
        <Text style={styles.value}><FontAwesome5 name="rupee-sign" size={20} color="#555" />{price}</Text>

        <Text style={styles.label}>{translations.pregnancy || 'Pregnancy Status'}:</Text>
        <Text style={styles.value}>{pregnancyStatus === 'yes' ? translations.is_present : translations.not_present || pregnancyStatus}</Text>

        <Text style={styles.label}>{translations.is_bargainable || 'Bargainable or Not?'}:</Text>
        <Text style={styles.value}>{isBargainable === 'yes' ? translations.can_play_bargain : translations.cannot_play_bargain || isBargainable}</Text>

        <Text style={styles.label}>{translations.location || 'Location'}:</Text>
        <Text style={styles.value}>{locationName}</Text>
      </View>

      {/* Call Seller Button */}
      <TouchableOpacity
        onPress={handleCallSeller}
        style={{
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          flexDirection: 'row',
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <FontAwesome name="phone" size={24} color="white" />
        <Text style={{ color: 'white', fontSize: 20, marginLeft: 20 }}>
          {translations.call_seller || 'Call Seller'}
        </Text>
      </TouchableOpacity>

      {/* Save Post Button */}
      <TouchableOpacity
        onPress={toggleSavePost}
        style={{
          backgroundColor: isSaved ? '#ffe4c4' : '#f8f8f8',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <FontAwesome
          name={isSaved ? 'bookmark' : 'bookmark-o'}
          size={24}
          color={isSaved ? 'black' : '#000'}
        />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>
          {isSaved ? translations.saved_to_favorites || 'Saved to Favorites' : translations.save_post || 'Save Post'}
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

// Define styles for the component
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
    width: 320,
    height: 350,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'stretch',
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
});

export default AnimalPostDetails;
