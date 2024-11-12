import { View, Text, ScrollView, Image, TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';



  const onPressCategory = (item) => {
    router.push({ pathname: 'common/categoryPreview', params: item });
  };

const CategoriesList = () => {
  const {translations}=useLanguage();
  const categories = [
    { name: translations.cows||'Cows', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/cow_e68rwm.jpg" ,value: 'cow' }, 
    { name: translations.buffalos ||'Buffalos', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/buffalo_tfzv9a.jpg",value: 'buffalo' },
    { name: translations.goats||'Goats', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/goat_ez70sj.jpg" ,value: 'goat'},
    { name:  translations.sheeps||'Sheeps', image: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414620/sheep_ihtcbi.jpg" ,value: 'sheep'}
  ];
  return (
    <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => onPressCategory(category)}>
          <Image source={{uri:category.image}} style={styles.image} />
          <Text style={styles.text}>{translations[category.name]||category.name}</Text>
        </TouchableOpacity>
      ))}
      {/* Ellipsis (3 dots) Button to redirect to more categories */}
      <TouchableOpacity style={styles.dotsContainer} onPress={() => router.push('common/allCategories')}>
        <Text style={styles.dots}>...</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
  )
}

export default CategoriesList

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      marginBottom:20
    },
    categoryItem: {
      alignItems: 'center',
      marginRight: 20,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    text: {
      marginTop: 5,
      fontSize: 18,
      textAlign: 'center',
      fontWeight:"bold"
    },
    dotsContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor:'#fff',
      width: 80,
      height: 80,
      borderRadius: 40,
    },
    dots: {
      fontSize: 40,
      fontWeight: 'bold',
    },
    moreContainer: {
      padding: 20,
      alignItems: 'center',
    },
    moreText: {
      fontSize: 20,
      marginBottom: 10,
    },
    categoryRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
  });