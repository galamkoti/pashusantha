import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CropCategory = ({ image, title }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CropCategory;
