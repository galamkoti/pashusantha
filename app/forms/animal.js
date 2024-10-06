import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUserData } from '../context/UserContext';
import axios from 'axios';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';
import * as ImagePicker from 'expo-image-picker'; 

const AnimalForm = () => {
  const [category, setCategory] = useState('');
  const [breed, setBreed] = useState('');
  const [milkCapacity, setMilkCapacity] = useState('');
  const [price, setPrice] = useState('');
  const [pregnancyStatus, setPregnancyStatus] = useState('');
  const [hasChild, setHasChild] = useState('');
  const [age, setAge] = useState('');
  const [lactationPeriod, setLactationPeriod] = useState('');
  const [isBargainable, setIsBargainable] = useState(false);
  const {user}=useUserData();
  const {location}=useLocation();
  const {translations}=useLanguage();
  const [images, setImages] = useState(null);
  const [videos, setVideos] = useState([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status != 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to proceed.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log(result);

    if (!result.canceled) {
      // Append the selected image to the list of images
      setImages(result.assets[0].uri);  // Adjusted to work with single selection
    }
  };

      // Function to pick multiple videos
  const pickVideos = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permissions to proceed.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true,  // For multiple selection
      quality: 1,
    });

    if (!result.canceled) {
      setVideos([...videos, ...result.selected]);  // Append new videos to existing state
    }
  };

  const animalCategories = [
    { label: translations.cows|| 'Cow', value: 'cow' },
    { label: translations.buffalo||'Buffalo', value: 'buffalo' },
    { label: 'Sheep', value: 'sheep' },
    { label: 'Goat', value: 'goat' }
  ];
  
  const breedOptions = {
    cow: ['Holstein', 'Jersey', 'Guernsey'],
    buffalo: ['Murrah', 'Nili-Ravi', 'Bhadawari'],
    sheep: ['Dorset', 'Hampshire', 'Suffolk'],
    goat: ['Nubian', 'Alpine', 'Saanen']
  };



  // Function to submit the form
  const submitForm = async () => {
    const formData = {
      user_id:user._id,
      description:"New Animal into the market",
      images:"https://media.istockphoto.com/id/1404182584/photo/cows-in-a-meadow-with-fresh-green-grass-and-buttercup-wildflowers.jpg?s=1024x1024&w=is&k=20&c=SavkZAlXFRqBBupKz0Lf5KBeW1En7xc62eZxsOTQWWA=",
      phone:user.phone,
      price,
      locationName:"Hyderabad",
      latitude:location.latitude,
      longitude:location.longitude,
      category,
      breed,
      age,
      lactationPeriod,
      hasChild,
      milkCapacity,
      pregnancyStatus,
      isBargainable,
    };
    console.log("formData",formData);

    try {
      const response = await axios.post('https://pashupanta-backend-production.up.railway.app/api/animal/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("response ",response)
      if (response.data.message=="Animal Post Created!!") {
        Alert.alert('Success', 'Animal details submitted successfully!');
      } else {
        // console.log("res",response)
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Animal Details</Text>

      {/* Animal Category */}
      <Text style={styles.label}>{translations.category}:</Text>
      <View style={styles.picker}>
      <Picker
        selectedValue={category}
        style={styles.picker}
        onValueChange={(itemValue) => {
          setCategory(itemValue);
          setBreed(''); // Reset breed when category changes
        }}
      >
        <Picker.Item label="Select Category" value="" />
        {animalCategories.map((cat) => (
          <Picker.Item key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Picker>
      </View>
      
        

      {/* Breed */}
      <Text style={styles.label}>{translations.breed}:</Text>
      <View style={styles.picker}>
      <Picker
        selectedValue={breed}
        style={styles.picker}
        enabled={category !== ''}
        onValueChange={(itemValue) => setBreed(itemValue)}
      >
        <Picker.Item label="Select Breed" value="" />
        {breedOptions[category]?.map((br) => (
          <Picker.Item key={br} label={br} value={br} />
        ))}
      </Picker>
      </View>

      {/* Milk Capacity */}
      <Text style={styles.label}>{translations.milk_capacity} ({translations.litres}):</Text>
      <TextInput
        style={styles.input}
        placeholder="Milk Capacity (Liters)"
        keyboardType="numeric"
        value={milkCapacity}
        onChangeText={(text) => setMilkCapacity(text)}
      />

      {/* Price */}
      <Text style={styles.label}>{translations.select_price}:</Text>
      <TextInput
        style={styles.input}
        placeholder="Price (in $)"
        keyboardType="numeric"
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      {/* Pregnancy Status */}
      <Text style={styles.label}>{translations.pregnacy_status}:</Text>
      <View style={styles.picker}>
      <Picker
        selectedValue={pregnancyStatus}
        style={styles.picker}
        onValueChange={(itemValue) => setPregnancyStatus(itemValue)}
      >
        <Picker.Item label="Select Status" value="" />
        <Picker.Item label="Pregnant" value="Pregnant" />
        <Picker.Item label="Not Pregnant" value="Not Pregnant" />
      </Picker>
      </View>

      {/* Has Child */}
      <Text style={styles.label}>{translations.child_status}:</Text>
      <View style={styles.picker}>
      <Picker
        selectedValue={hasChild}
        style={styles.picker}
        onValueChange={(itemValue) => setHasChild(itemValue)}
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Yes" value="Yes" />
        <Picker.Item label="No" value="No" />
      </Picker>
      </View>

      {/* Age */}
      <Text style={styles.label}>{translations.pashu_age} (Years):</Text>
      <TextInput
        style={styles.input}
        placeholder="Age (Years)"
        keyboardType="numeric"
        value={age}
        onChangeText={(text) => setAge(text)}
      />

      {/* Lactation Period */}
      <Text style={styles.label}>{translations.lactation_period} (Months):</Text>
      <TextInput
        style={styles.input}
        placeholder="Lactation Period (Months)"
        keyboardType="numeric"
        value={lactationPeriod}
        onChangeText={(text) => setLactationPeriod(text)}
      />

      {/* Is Bargainable */}
      <Text style={styles.label}>{translations.can_bargain}:</Text>
      <View style={styles.picker}>
      <Picker
        selectedValue={isBargainable ? 'Yes' : 'No'}
        style={styles.picker}
        onValueChange={(itemValue) => setIsBargainable(itemValue === 'Yes')}
      >
        <Picker.Item label="Select" value="" />
        <Picker.Item label="Yes" value="Yes" />
        <Picker.Item label="No" value="No" />
      </Picker>
      </View>
      
      <Button title="Pick Images" onPress={pickImage} />
      <Button title="Pick Videos" onPress={pickVideos} />

      {/* Display selected images */}
      {images && <Image source={{ uri: images }} style={styles.image} />}
      {/* {images.length > 0 && (
        <View>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
          ))}
        </View>
      )} */}
      {/* Submit Button */}
      <Button title="Submit" onPress={submitForm} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 5,
    marginBottom:4
  },
  fileInfo: {
    marginTop: 5,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});

export default AnimalForm;
