import { router } from 'expo-router';
import React, { useRef } from 'react';
import {Text, Image, StyleSheet, FlatList, Dimensions, Pressable, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-7503444463934319/9600641589';


const onPressCategory = async (item) => {
  router.push({ pathname: 'common/categoryPreview', params: item });
};

const AllCategories = () => {
  const {translations}=useLanguage();
  const bannerRef = useRef(null);

  const categories = [
    { name: translations.cows||'Cows', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/cow_e68rwm.jpg" ,value: 'cow' }, 
    { name: translations.buffalos ||'Buffalos', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/buffalo_tfzv9a.jpg",value: 'buffalo' },
    { name: translations.goats||'Goats', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/goat_ez70sj.jpg" ,value: 'goat'},
    { name:  translations.sheeps||'Sheeps', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/sheep_ihtcbi.jpg" ,value: 'sheep'}
  ];
  const renderItem = ({ item }) => (
    <Pressable style={styles.categoryItem} onPress={() => onPressCategory(item)}>
      <Image source={{uri:item.image}} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <>
    <FlatList
      data={categories}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
    <View style={{justifyContent:"center",alignItems:"center"}}>
      <BannerAd ref={bannerRef} unitId={adUnitId} size={BannerAdSize.MEDIUM_RECTANGLE} />
    </View>
    </>
  );
};

// Get the screen width for responsiveness
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  categoryItem: {
    width: screenWidth * 0.9, // Take 90% of the screen width
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'row', // Align items side by side
    alignItems: 'center', // Vertically center the image and text
    padding: screenWidth * 0.03, // Padding relative to screen size
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // Android shadow
  },
  categoryImage: {
    width: screenWidth * 0.2, // Image width is 20% of screen width
    height: screenWidth * 0.2, // Image height matches width for a square
    resizeMode: 'cover', // Cover the image in the space provided
    borderRadius: 10, // Rounded corners for the image
    marginRight: screenWidth * 0.05, // Space between image and text
  },
  categoryName: {
    fontSize: screenWidth * 0.05, // Font size relative to screen size (5% of width)
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1, // Ensure text doesn't overflow
  },
});

export default AllCategories;
