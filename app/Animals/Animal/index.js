import React from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import CropCategory from '../../Components/Crops/CropCategory';
import PostCard from '../../Components/Crops/CropsPostCard';

const crops = [
  { id: '1', name: 'Buffalo', image: require('../../../assets/animal/buffalo.jpg') },
  { id: '2', name: 'Cow', image: require('../../../assets/animal/cow.jpg') },
  { id: '3', name: 'Goat', image: require('../../../assets/animal/goat.jpg') },
  { id: '4', name: 'Sheep', image: require('../../../assets/animal/sheep.jpg') },
  { id: '5', name: 'Hen', image: require('../../../assets/animal/chicken.jpg') },
  { id: '6', name: 'Bull', image: require('../../../assets/animal/farmer.jpg') },
];

const posts = [
  {
    id: 1,
    category: 'Buffalo',
    distance: 3.2,
    datePosted: '2024-08-20',
    image: require('../../../assets/animal/buffalo.jpg'),
    userName: 'Farmer John',
    phoneNumber: '6309065662',
  },
  {
    id: 2,
    category: 'Cow',
    distance: 10.5,
    datePosted: '2024-08-18',
    image: require('../../../assets/animal/cow.jpg'),
    userName: 'Farmer Emma',
    phoneNumber: '5559876543',
  },
  {
    id: 3,
    category: 'Goat',
    distance: 7.8,
    datePosted: '2024-08-22',
    image:require('../../../assets/animal/goat.jpg'),
    userName: 'Farmer Raj',
    phoneNumber: '5553456789',
  },
  {
    id: 4,
    category: 'Sheep',
    distance: 12.4,
    datePosted: '2024-08-21',
    image:require('../../../assets/animal/sheep.jpg'),
    userName: 'Farmer Lisa',
    phoneNumber: '5551237890',
  },
  {
    id: 5,
    category: 'Hen',
    distance: 5.0,
    datePosted: '2024-08-19',
    image: require('../../../assets/animal/chicken.jpg') ,
    userName: 'Farmer Ahmed',
    phoneNumber: '5552345678',
  },
  {
    id: 6,
    category: 'Bull',
    distance: 7.0,
    datePosted: '2024-08-19',
    image: require('../../../assets/animal/farmer.jpg') ,
    userName: 'Farmer Koti',
    phoneNumber: '55523456477',
  },
];

// Render function for PostCard
const renderItem = ({ item }) => (
  <PostCard
    category={item.category}
    distance={item.distance}
    datePosted={item.datePosted}
    image={item.image}
    userName={item.userName}
    onCallPress={() => handleCallPress(item.phoneNumber)}
  />
);

// Handle Call Button Press
const handleCallPress = (phoneNumber) => {
  Alert.alert('Calling', phoneNumber);
};

// Render function for Categories
const renderCategoryList = () => (
  <View style={styles.categoryContainer}>
    <FlatList
      data={crops}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CropCategory image={item.image} title={item.name} />
      )}
    />
  </View>
);

const Index = () => {
  return (
    <View style={styles.mainContainer}>
      {/* Combined Category and Post List */}
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderCategoryList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.postContainer}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  postContainer: {
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
});

export default Index;
