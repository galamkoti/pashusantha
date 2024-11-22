import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Pressable, Alert } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import {MaterialIcons} from '@expo/vector-icons';
import axios from 'axios';
import { BannerAd, BannerAdSize, TestIds, useInterstitialAd } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7503444463934319/9600641589';

const MyPostCard = ({ category, breed, price, post_id,datePosted, image, userName, description, onCallPress ,confirmDeletePost, onPostPressed }) => {
  const {translations} = useLanguage();
  const bannerRef = useRef(null);

  const day= new Date(datePosted).getDate();
  const month= new Date(datePosted).getMonth()+1;
  const year= new Date(datePosted).getFullYear();
  const formattedDate = day+'-'+month+'-'+year; 

  const handleDeleteMyOwnPost=()=>{
    Alert.alert(translations.delete_post||"Delete Post",translations.are_you_sure_to_delete_post+'?'||"Are you sure want to delete post?",
      [
        {
          text:translations.cancel||"CANCEL",
          onPress:()=>console.log("Delete cancel pressed"),
          style:'cancel'
        },
        {
          text:translations.delete||'DELETE',
          onPress:()=>confirmDeletePost(),
          style:'default'
        }
    ])
  }
  return (
    <>
    <Pressable style={styles.card} onPress={onPostPressed}>
      {/* Category and Distance */}
      <View style={styles.header}>
        <View style={styles.headerRowContainer}>
        <Text style={styles.userName}>{translations[category] || category}  - {translations[breed] || breed}</Text>
        </View>
        <Pressable onPress={()=>handleDeleteMyOwnPost()}>
        <MaterialIcons name="delete" size={24} color="black" />
        </Pressable>
      </View>

      {/* Single Image Display */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* User Details and Call Option */}
      <View style={styles.footer}>
        <View>
        <Text style={styles.datePosted}>{translations.posted_date||"Posted on"} {formattedDate}</Text>
        </View>
        <View style={styles.callHeartContainer}>
          <FontAwesome5 name="rupee-sign" size={22} color="black" />
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>
    </Pressable>
    <View style={{justifyContent:"center",alignItems:"center"}}>
      <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.BANNER} />
    </View>
    {/* Interstitial ad */}
    
    </>
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
  priceText:{
    fontSize:24,
    fontWeight:"bold"
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
    height: 300,
    width:350,
    resizeMode:'stretch'
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
    fontSize: 18,
    fontWeight:"500",
    color: 'black',
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
    justifyContent:"center",
    alignItems:"center"
  },
  headerRowContainer:{
    justifyContent:"space-around",
    flexDirection:"row"
  }
});

export default MyPostCard;
