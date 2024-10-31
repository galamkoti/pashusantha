import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert, Image, Pressable,Button, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);
  const [selectedImageBox, setSelectedImageBox] = useState(null);
  const [video, setVideo] = useState(null);
  const [loading,setLoading]=useState(null);

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
      { label: translations.holstein_friesian || 'Holstein Friesian', value: 'holstein_friesian' },
      { label: translations.jersey || 'Jersey', value: 'jersey' },
      { label: translations.guernsey || 'Guernsey', value: 'guernsey' },
      { label: translations.brown_swiss || 'Brown Swiss', value: 'brown_swiss' },
      { label: translations.red_dane || 'Red Dane', value: 'red_dane' },
      { label: translations.ayrshire || 'Ayrshire', value: 'ayrshire' },
      { label: translations.jersey_cross || 'Jersey Cross', value: 'jersey_cross' },
      { label: translations.holstein_friesian_cross || 'Holstein Friesian Cross', value: 'holstein_friesian_cross' },
      { label: translations.gir || 'Gir', value: 'gir' },
      { label: translations.sahiwal || 'Sahiwal', value: 'sahiwal' },
      { label: translations.red_sindhi || 'Red Sindhi', value: 'red_sindhi' },
      { label: translations.kankrej || 'Kankrej', value: 'kankrej' },
      { label: translations.hariana || 'Hariana', value: 'hariana' },
      { label: translations.ongole || 'Ongole', value: 'ongole' },
    ],
    
    buffalo: [
      { label: translations.murrah || 'Murrah', value: 'murrah' },
      { label: translations.surti || 'Surti', value: 'surti' },
      { label: translations.jaffrabadi || 'Jaffrabadi', value: 'jaffrabadi' },
      { label: translations.bhadawari || 'Bhadawari', value: 'bhadawari' },
      { label: translations.nili_ravi || 'Nili Ravi', value: 'nili_ravi' },
      { label: translations.mehsana || 'Mehsana', value: 'mehsana' },
      { label: translations.nagpuri || 'Nagpuri', value: 'nagpuri' },
      { label: translations.toda || 'Toda', value: 'toda' },
      { label: translations.banni || 'Banni', value: 'banni' },
      { label: translations.pandharpuri || 'Pandharpuri', value: 'pandharpuri' },
    ],
  
    sheep: [
      { label: translations.madras_red || 'Madras Red', value: 'madras_red' },
      { label: translations.mandya || 'Mandya', value: 'mandya' },
      { label: translations.mecheri || 'Mecheri', value: 'mecheri' },
      { label: translations.bellary || 'Bellary', value: 'bellary' },
      { label: translations.nilgiri || 'Nilgiri', value: 'nilgiri' },
      { label: translations.ramanadhapuram_white || 'Ramanadhapuram White', value: 'ramanadhapuram_white' },
      { label: translations.vembur || 'Vembur', value: 'vembur' },
      { label: translations.deccani || 'Deccani', value: 'deccani' },
      { label: translations.nalgonda || 'Nalgonda', value: 'nalgonda' },
    ],
  
    goat: [
      { label: translations.tellicherry || 'Tellicherry', value: 'tellicherry' },
      { label: translations.osmanabadi || 'Osmanabadi', value: 'osmanabadi' },
      { label: translations.sirohi || 'Sirohi', value: 'sirohi' },
      { label: translations.boer || 'Boer', value: 'boer' },
      { label: translations.kanni_aadu || 'Kanni Aadu', value: 'kanni_aadu' },
      { label: translations.kodi_aadu || 'Kodi Aadu', value: 'kodi_aadu' },
      { label: translations.jamunapari || 'Jamunapari', value: 'jamunapari' },
      { label: translations.black_bengal || 'Black Bengal', value: 'black_bengal' },
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
      aspect: [1,1],
      quality: 0.25,
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
      aspect: [1,1],
      quality: 0.25,
    });
    if (!result.canceled) {
      const newImages = [...images];
      newImages[selectedImageBox] = result.assets[0].uri;
      setImages(newImages);
    }
    closeImagePickerModal();
  };


  const openVideoPicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality:0.1
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
    }
  };
  if(loading){
    return <ActivityIndicator size="large" color="black" />
  }

  const submitForm = async () => {
    setLoading(true);
    const formData = new FormData();
  
    formData.append('user_id', user._id);
    formData.append('description', "New Animal into the market");
    formData.append('phone', user.phone);
    formData.append('price', price);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);
    formData.append('category', category);
    formData.append('breed', breed);
    formData.append('age', age);
    formData.append('lactationPeriod', lactationPeriod);
    formData.append('hasChild', hasChild);
    formData.append('milkCapacity', milkCapacity);
    formData.append('pregnancyStatus', pregnancyStatus);
    formData.append('isBargainable', isBargainable);
  
    // Append images and videos
    images.forEach((image, index) => {
      if (image) {
        formData.append('media', {
          uri: image,
          type: 'image/jpeg',
          name: `image_${index}.jpg`,
        });
      }
    });
  
    if(video){
      formData.append('media', {
        uri: video,
        type: 'video/mp4',
        name: `video_one.mp4`,
      })};
  
  
    try {
      const response = await axios.post('http://192.168.47.35:5000/api/animal/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.message === "Animal Post Created!!") {
        setLoading(false);
        Alert.alert('Success', 'Animal details submitted successfully!');
      } else {
        setLoading(false);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error.message);
      Alert.alert('Error', 'An error occurred while submitting the form.');
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log('Data:', error.response.data);
        console.log('Status:', error.response.status);
        console.log('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error Message:', error.message);
      }
    }
  };

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView>
        <ScrollView style={styles.container} keyboardDismissMode='interactive'>

          {/* Category Modal */}
          <View style={styles.row}>
            <Text style={styles.label}>{translations.select_category|| "Category"}:</Text>
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
              <Text style={styles.label}>{translations.select_breed||"Breed"}:</Text>
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
            <Text style={styles.label}>{translations.select_price||"Price"}:</Text>
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
            <Text style={styles.label}>{translations.milk_capacity||"Milk Capacity"}:</Text>
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
            <Text style={styles.label}>{translations.pashu_age} ({translations.years}):</Text>
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
            <Text style={styles.label}>{translations.pregnacy_status||"Pregnancy"}:</Text>
            <View style={styles.dropdownContainer}>
              <CustomBottomSheetModal
                data={pregnancyOptions}
                modalTitle="IsPregnant"
                selectedValue={pregnancyStatus}  // Dynamically change label after selection
                onValueSelected={(value) => setPregnancyStatus(value)}
              />
            </View>
          </View>

          {/* Has Child Modal */}
          <View style={styles.row}>
            <Text style={styles.label}>{translations.child_status||"Has Child"}:</Text>
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
            <Text style={styles.label}>{translations.lactation_period} ({translations.months}):</Text>
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
            <Text style={styles.label}>{translations.can_bargain||"Bargainable"}:</Text>
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

          <Button title="Pick a Video" onPress={openVideoPicker} />
          {video && <Text>Video Selected</Text>}

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
