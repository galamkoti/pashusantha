import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { translation } from '../Language/translations';
import { getSelectedLangFromAsync } from '../Language/languageStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostCard = ({ category, distance, datePosted, image, userName, onCallPress }) => {
  const [languageIndex, setLanguageIndex] = useState(0); // Default to English

  useEffect(() => {
    fetchLanguageIndex()
  }, []);

  const fetchLanguageIndex = async () => {
    console.log(AsyncStorage.getItem('LANGUAGE_VIKRAI'));
    const index = await getSelectedLangFromAsync();
    if (index !== null) {
      setLanguageIndex(index);
    }
  };

  return (
    <View style={styles.card}>
      {/* Category and Distance */}
      <View style={styles.header}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.distance}>
          {distance} km{' '}
          {languageIndex === 0 ? translation[2].English
            : languageIndex === 1 ? translation[2].Hindi
            : languageIndex === 2 ? translation[2].Telugu
            : languageIndex === 3 ? translation[2].Tamil
            : languageIndex === 4 ? translation[2].Malayalam
            : languageIndex === 5 ? translation[2].Kannada
            : languageIndex === 6 ? translation[2].Punjabi
            : null}
        </Text>
      </View>

      {/* Single Image Display */}
      <Image source={image} style={styles.image} />

      {/* User Details and Call Option */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.datePosted}>Posted on {datePosted}</Text>
        </View>
        <View style={styles.callHeartConatiner}>
          <TouchableOpacity onPress={onCallPress} style={styles.callButton}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert('Clicked Heart');
            }}
            style={styles.heartButton}
          >
            <Ionicons name="heart" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  distance: {
    fontSize: 14,
    color: '#777',
  },
  image: {
    width: '100%',
    height: 250, // Adjust based on how large you want the image
    resizeMode: 'cover', // This ensures the image covers the area nicely
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  datePosted: {
    fontSize: 12,
    color: '#777',
  },
  callButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 50,
    marginRight: 5,
  },
  heartButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 50,
    marginLeft: 5,
  },
  callHeartConatiner: {
    flexDirection: 'row',
  },
});

export default PostCard;
