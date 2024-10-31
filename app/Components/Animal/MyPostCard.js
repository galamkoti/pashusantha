import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Pressable, Alert } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';

const MyPostCard = ({ category, breed, price, post_id,datePosted, image, userName, description, onCallPress ,confirmDeletePost, onPostPressed }) => {
  const {translations} = useLanguage();

  const formattedDate = new Date(datePosted).toLocaleDateString();

  const handleDeleteMyOwnPost=()=>{
    Alert.alert("Delete Post","Are you sure want to delete post?",
      [
        {
          text:"CANCEL",
          onPress:()=>console.log("Delete cancel pressed"),
          style:'cancel'
        },
        {
          text:'DELETE',
          onPress:()=>confirmDeletePost(),
          style:'default'
        }
    ])
  }
  return (
    <Pressable style={styles.card} onPress={onPostPressed}>
      {/* Category and Distance */}
      <View style={styles.header}>
        <View style={styles.headerRowContainer}>
        <Text style={styles.userName}>{translations[category] || category}  - {translations[breed] || breed}</Text>
        </View>
        <Pressable onPress={()=>handleDeleteMyOwnPost()} style={styles.threedots}>
          <Entypo name="dots-three-vertical" size={22} color="white" />
        </Pressable>
      </View>

      {/* Single Image Display */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* User Details and Call Option */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.datePosted}>Posted on {formattedDate}</Text>
        </View>
        <View style={styles.callHeartContainer}>
          <FontAwesome5 name="rupee-sign" size={24} color="black" />
          <Text style={styles.priceText}>{price}</Text>
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
    width: '100%',
    padding: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  threedots:{
    backgroundColor:"gray",
    borderRadius:50,
    height:30,
    width:30,
    justifyContent:'center',
    alignItems:"center"
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
    height: 250,
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
