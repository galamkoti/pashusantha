import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';

const MyPostCard = ({ category, breed, distance, datePosted, image, userName, description, onCallPress , onPostPressed }) => {
  const {translations} = useLanguage();

  const formattedDate = new Date(datePosted).toLocaleDateString(); // Convert datePosted to readable format

  return (
    <Pressable style={styles.card} onPress={onPostPressed}>
      {/* Category and Distance */}
      <View style={styles.header}>
        <View style={styles.headerRowContainer}>
          <Text style={styles.category}>{category=='cow'?translations.cows:
                                      category=='buffalo'?translations.buffalo:
                                      category=='goat'?translations.goats:
                                      category=='sheep'?translations.sheeps:
                                      category=='hen'?translations.hens:category}</Text>
          <Text style={styles.category}>  ({breed})</Text>
        </View>
      </View>

      {/* Single Image Display */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* User Details and Call Option */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.datePosted}>Posted on {formattedDate}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '50%',
    padding: 10,
    marginBottom: 10,
    marginRight:5
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
    height: 150,
    resizeMode: 'cover',
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
  callHeartContainer: {
    flexDirection: 'row',
  },
  headerRowContainer:{
    justifyContent:"space-around",
    flexDirection:"row"
  }
});

export default MyPostCard;
