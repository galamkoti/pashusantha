import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity,Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '../../context/LanguageContext';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import HorizontalLine from "./../common/HorizontalLine"
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-3660460140096409/9035435301';

const PostCard = ({ category, breed, datePosted, image,price, onPostPressed }) => {
  const {translations} = useLanguage();
const day= new Date(datePosted).getDate();
const month= new Date(datePosted).getMonth()+1;
const year= new Date(datePosted).getFullYear();
console.log(day,month,year)
const formattedDate = day+'-'+month+'-'+year;  // Convert datePosted to readable format
  
  const bannerRef = useRef(null);

  return (
    <>
    <Pressable style={styles.card} onPress={onPostPressed}>
      {/* Category and Distance */}
      <View style={styles.header}>
        <View style={styles.headerRowContainer}>
        <Text style={styles.userName}>{translations[category] || category} {translations.for_sale} - {translations[breed] || breed} {translations.belongs_to_breed}</Text>
        </View>
        {/* <Text style={styles.distance}>
          2.{translations.km}
        </Text> */}
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
      <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
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
    marginBottom: 15,
    marginTop:15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 15,
  },
  priceText:{
    fontSize:24,
    fontWeight:"bold"
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  datePosted: {
    fontSize: 15,
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

export default PostCard;
