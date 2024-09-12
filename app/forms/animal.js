import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as ImagePicker from 'expo-image-picker';
import * as VideoPicker from 'expo-image-picker';

const AnimalForm = () => {
  const [animalCategory, setAnimalCategory] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [age, setAge] = useState('');
  const [milk, setMilk] = useState('');
  const [hasChild, setHasChild] = useState(false);
  const [pregnancy, setPregnancy] = useState('');
  const [price, setPrice] = useState('');
  const [priceNegotiable, setPriceNegotiable] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [breedOpen, setBreedOpen] = useState(false);

  const animalCategories = [
    { label: 'Cow', value: 'cow' },
    { label: 'Buffalo', value: 'buffalo' },
    { label: 'Sheep', value: 'sheep' },
    { label: 'Goat', value: 'goat' }
  ];

  const breedOptions = {
    cow: ['Holstein', 'Jersey', 'Guernsey'],
    buffalo: ['Murrah', 'Nili-Ravi', 'Bhadawari'],
    sheep: ['Dorset', 'Hampshire', 'Suffolk'],
    goat: ['Nubian', 'Alpine', 'Saanen']
  };

  useEffect(() => {
    if (animalCategory) {
      setBreeds(breedOptions[animalCategory] || []);
    }
  }, [animalCategory]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true
    });

    if (!result.canceled) {
      setImages(result.selected);
    }
  };

  const handlePickVideo = async () => {
    const result = await VideoPicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsMultipleSelection: true
    });

    if (!result.canceled) {
      setVideos(result.selected);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Animal Details Form</Text>

      <DropDownPicker
        open={categoryOpen}
        value={animalCategory}
        items={animalCategories}
        setOpen={setCategoryOpen}
        setValue={setAnimalCategory}
        // setItems={setAnimalCategories}
        placeholder="Select Animal Category"
        style={styles.picker}
        dropDownStyle={styles.dropDown}
      />

      {animalCategory && (
        <>
          <DropDownPicker
            open={breedOpen}
            value={selectedBreed}
            items={breeds.map(breed => ({ label: breed, value: breed }))}
            setOpen={setBreedOpen}
            setValue={setSelectedBreed}
            setItems={setBreeds}
            placeholder="Select Breed"
            style={styles.picker}
            dropDownStyle={styles.dropDown}
          />

          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            style={styles.input}
          />
          <TextInput
            placeholder="Milk Production (liters per day)"
            value={milk}
            onChangeText={setMilk}
            style={styles.input}
          />
          <TextInput
            placeholder="Is there any child? (yes/no)"
            value={hasChild ? 'yes' : 'no'}
            onChangeText={text => setHasChild(text.toLowerCase() === 'yes')}
            style={styles.input}
          />
          <TextInput
            placeholder="Pregnancy status (weeks)"
            value={pregnancy}
            onChangeText={setPregnancy}
            style={styles.input}
          />
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
          />
          <TextInput
            placeholder="Is the price negotiable? (yes/no)"
            value={priceNegotiable ? 'yes' : 'no'}
            onChangeText={text => setPriceNegotiable(text.toLowerCase() === 'yes')}
            style={styles.input}
          />

          <TouchableOpacity onPress={handlePickImage} style={styles.button}>
            <Text style={styles.buttonText}>Pick Images</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePickVideo} style={styles.button}>
            <Text style={styles.buttonText}>Pick Videos</Text>
          </TouchableOpacity>

          <View style={styles.mediaContainer}>
            {images.map((image, index) => (
              <Image key={index} source={{ uri: image.uri }} style={styles.media} />
            ))}
            {videos.map((video, index) => (
              <Video key={index} source={{ uri: video.uri }} style={styles.media} />
            ))}
          </View>
        </>
      )}

      <Button title="Submit" onPress={() => alert('Details submitted!')} style={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#fff',
  },
  dropDown: {
    backgroundColor: '#fafafa',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  media: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default AnimalForm;
