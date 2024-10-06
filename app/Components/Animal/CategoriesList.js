import { View, Text, ScrollView, Image, TouchableOpacity ,StyleSheet} from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { useLanguage } from '../../context/LanguageContext';

const categories = [
    { name: 'Cow', image: require('../../../assets/animal/cow.jpg') ,value: 'cow' }, 
    { name: 'Buffalo', image: require('../../../assets/animal/buffalo.jpg'),value: 'buffalo' },
    { name: 'Goat', image: require('../../../assets/animal/goat.jpg') ,value: 'goat'},
    { name: 'Sheep', image: require('../../../assets/animal/sheep.jpg') ,value: 'sheep'},
    { name: 'Hen', image: require('../../../assets/animal/chicken.jpg'),value: 'hen' },
    { name: 'Cow', image: require('../../../assets/animal/cow.jpg') ,value: 'cow'}, 
    { name: 'Buffalo', image: require('../../../assets/animal/buffalo.jpg'),value: 'buffalo' },
    { name: 'Goat', image: require('../../../assets/animal/goat.jpg') ,value: 'goat'},
    { name: 'Sheep', image: require('../../../assets/animal/sheep.jpg'),value: 'sheep' },
    { name: 'Hen', image: require('../../../assets/animal/chicken.jpg'),value: 'hen' },
  ];

  const onPressCategory = (item) => {
    router.push({ pathname: 'common/categoryPreview', params: item });
  };

const CategoriesList = () => {
  const {translations}=useLanguage();
  return (
    <View style={styles.container}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category, index) => (
        <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => onPressCategory(category)}>
          <Image source={category.image} style={styles.image} />
          <Text style={styles.text}>{category.value=='cow'?translations.cows:
                                      category.value=='buffalo'?translations.buffalo:
                                      category.value=='goat'?translations.goats:
                                      category.value=='sheep'?translations.sheeps:
                                      category.value=='hen'?translations.hens:category.name}</Text>
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
      fontSize: 16,
      textAlign: 'center',
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