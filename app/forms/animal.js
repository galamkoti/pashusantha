import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Image, Pressable,Button, TouchableOpacity } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useLanguage } from '../context/LanguageContext';
import { CustomBottomSheetModal } from './../Components/Animal/CustomBottomSheetModal';
import { useLocation } from '../context/LocationContext';
import { useUserData } from '../context/UserContext';
import * as ImagePicker from 'expo-image-picker'; 
import ImagePickerModal from '../Components/Animal/ImagePickerModal';
import axios from 'axios';

const App = () => {
  const { translations } = useLanguage();
  const { user } = useUserData();
  const { location } = useLocation();


  // State for each modal option
  const [category, setCategory] = useState(null);
  const [breed, setBreed] = useState(null);
  const [hasChild, setHasChild] = useState(null);
  const [isBargainable, setIsBargainable] = useState(null);
  const [price, setPrice] = useState('');
  const [milkCapacity, setMilkCapacity] = useState('');
  const [age, setAge] = useState('');
  const [lactationPeriod, setLactationPeriod] = useState('');  
  const [pregnancyStatus, setPregnancyStatus] = useState('');
  const [images, setImages] = useState([null, null, null]);
  const [videos, setVideos] = useState([]);
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [selectedImageBox, setSelectedImageBox] = useState(null);

  const openImagePickerModal = (boxIndex) => {
    setSelectedImageBox(boxIndex);
    setImagePickerModalVisible(true);
  };

  const closeImagePickerModal = () => {
    setImagePickerModalVisible(false);
  };

  const animalCategories = [
    { label: translations.cows || 'Cow', value: 'cow' },
    { label: translations.buffalo || 'Buffalo', value: 'buffalo' },
    { label: translations.sheep || 'Sheep', value: 'sheep' },
    { label: translations.goat || 'Goat', value: 'goat' },
  ];

  const breedOptions = {
    cow: [
      { label: 'Holstein', value: 'holstein' },
      { label: 'Jersey', value: 'jersey' },
      { label: 'Guernsey', value: 'guernsey' },
    ],
    buffalo: [
      { label: 'Murrah', value: 'murrah' },
      { label: 'Nili-Ravi', value: 'nili-ravi' },
      { label: 'Bhadawari', value: 'bhadawari' },
    ],
    sheep: [
      { label: 'Dorset', value: 'dorset' },
      { label: 'Hampshire', value: 'hampshire' },
      { label: 'Suffolk', value: 'suffolk' },
    ],
    goat: [
      { label: 'Nubian', value: 'nubian' },
      { label: 'Alpine', value: 'alpine' },
      { label: 'Saanen', value: 'saanen' },
    ],
  };

  const hasChildOptions = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const isBargainableOptions = [
    { label: 'Bargainable', value: 'yes' },
    { label: 'Not Bargainable', value: 'no' },
  ];
  const pregnancyOptions = [
    { label: 'Pregnant', value: 'yes' },
    { label: 'Not Pregnant', value: 'no' },
  ];

  // Handle category change: reset breed when category is changed
  const handleCategoryChange = (value) => {
    setCategory(value);
    setBreed(null); // Reset the breed value when a new category is selected
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      const newImages = [...images];
      newImages[selectedImageBox] = result.assets[0].uri;
      setImages(newImages);
    }
    closeImagePickerModal();
  };

  const pickImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      const newImages = [...images];
      newImages[selectedImageBox] = result.assets[0].uri;
      setImages(newImages);
    }
    closeImagePickerModal();
  };


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
      const response = await axios.post('https://pashupanta-backend-production.up.railway.app/api/animal/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response ",response)
      if (response.data.message=="Animal Post Created!!") {
        Alert.alert('Success', 'Animal details submitted successfully!');
      } else {
        // console.log("res",response)
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log("error",error.message)
      Alert.alert('Error', 'An error occurred while submitting the form.');
    }
  };

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView>
        <ScrollView style={styles.container}>

          {/* Category Modal */}
          <View style={styles.row}>
            <Text style={styles.label}>Category:</Text>
            <View style={styles.dropdownContainer}>
              <CustomBottomSheetModal
                data={animalCategories}
                modalTitle="Select Category"
                selectedValue={category}  // Pass the selected value to change the label dynamically
                onValueSelected={handleCategoryChange}
              />
             
            </View>
          </View>

          {/* Breed Modal - Dependent on selected category */}
          {category && (
            <View style={styles.row}>
              <Text style={styles.label}>Breed:</Text>
              <View style={styles.dropdownContainer}>
                <CustomBottomSheetModal
                  data={breedOptions[category] || []}  // Empty array if no category
                  modalTitle="Select Breed"
                  selectedValue={breed}  // Update the label after breed is selected
                  onValueSelected={(value) => setBreed(value)}
                />
              </View>
            </View>
          )}

          {/* Price */}
          <View style={styles.row}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter Price'
              keyboardType='number-pad'
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>

          {/* Milk Capacity */}
          <View style={styles.row}>
            <Text style={styles.label}>Milk Capacity:</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter Milk Capacity'
              keyboardType='number-pad'
              value={milkCapacity}
              onChangeText={(text) => setMilkCapacity(text)}
            />
          </View>

          {/* Age */}
          <View style={styles.row}>
            <Text style={styles.label}>{translations.pashu_age} (Years):</Text>
            <TextInput
              style={styles.input}
              placeholder="Age (Years)"
              keyboardType="numeric"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </View>

          {/* Pregnancy Modal */}
          <View style={styles.row}>
            <Text style={styles.label}>Pregnancy:</Text>
            <View style={styles.dropdownContainer}>
              <CustomBottomSheetModal
                data={pregnancyOptions}
                modalTitle="IsPregnant"
                selectedValue={isBargainable}  // Dynamically change label after selection
                onValueSelected={(value) => setPregnancyStatus(value)}
              />
            </View>
          </View>

          {/* Has Child Modal */}
          <View style={styles.row}>
            <Text style={styles.label}>Has Child:</Text>
            <View style={styles.dropdownContainer}>
              <CustomBottomSheetModal
                data={hasChildOptions}
                modalTitle="Has Child"
                selectedValue={hasChild}  // Dynamically change label after selection
                onValueSelected={(value) => setHasChild(value)}
              />
            </View>
          </View>

          {/* Lactation Period */}
          <View style={styles.row}>
            <Text style={styles.label}>{translations.lactation_period} (Months):</Text>
            <TextInput
              style={styles.input}
              placeholder="Lactation Period (Months)"
              keyboardType="numeric"
              value={lactationPeriod}
              onChangeText={(text) => setLactationPeriod(text)}
            />
          </View>

          {/* Bargainable Modal */}
          <View style={styles.row}>
            <Text style={styles.label}>Bargainable:</Text>
            <View style={styles.dropdownContainer}>
              <CustomBottomSheetModal
                data={isBargainableOptions}
                modalTitle="Bargainable"
                selectedValue={isBargainable}  // Dynamically change label after selection
                onValueSelected={(value) => setIsBargainable(value)}
              />
            </View>
          </View>
          {/* images */}

          <View style={styles.imageContainer}>
            {images.map((image, index) => (
              <Pressable
                key={index}
                style={styles.imageBox}
                onPress={() => openImagePickerModal(index)}
              >
                {image ? (
                  <Image source={{ uri: image }} style={styles.image} />
                ) : (
                  <Text style={styles.placeholderText}>Upload Image {index + 1}</Text>
                )}
              </Pressable>
            ))}
          </View>
          {/* Image Picker Modal */}
          <ImagePickerModal
            visible={imagePickerModalVisible}
            onClose={closeImagePickerModal}
            onCameraPress={pickImageFromCamera}
            onGalleryPress={pickImageFromGallery}
          />

            <TouchableOpacity onPress={submitForm} style={{backgroundColor:"green",marginBottom:50,padding:10,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  input: {
    flex: 1.5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    flex: 1.5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 0,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});

export default App;
