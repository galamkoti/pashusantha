import { View, Text, Image, StyleSheet, Button, ScrollView, TouchableOpacity, Alert, Linking, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useLanguage } from '../context/LanguageContext';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const AnimalPostDetails = () => {
    const {translations}=useLanguage();
    const item = useLocalSearchParams(); 
    const { phone, price, locationName, description, animalType, breed, age, images, _id } = item;
    console.log("images in details page",images)

    const [isSaved, setIsSaved] = useState(false); // State to check if the post is saved

    useEffect(() => {
        checkIfSaved(); // Check if the post is already saved
    }, []);

    // Function to check if the post is already in AsyncStorage
    const checkIfSaved = async () => {
        try {
            const savedPosts = await AsyncStorage.getItem('savedPosts');
            const savedPostsArray = savedPosts ? JSON.parse(savedPosts) : [];
            const isAlreadySaved = savedPostsArray.some(post => post._id === _id);
            setIsSaved(isAlreadySaved);
        } catch (error) {
            console.log(error);
        }
    };

    // Function to save or unsave the post
    const toggleSavePost = async () => {
        try {
            const savedPosts = await AsyncStorage.getItem('savedPosts');
            let savedPostsArray = savedPosts ? JSON.parse(savedPosts) : [];

            if (isSaved) {
                // Remove post from saved posts
                savedPostsArray = savedPostsArray.filter(post => post._id !== _id);
                setIsSaved(false);
                Alert.alert('Removed from Favorites');
            } else {
                // Add post to saved posts
                savedPostsArray.push(item);
                setIsSaved(true);
                Alert.alert('Added to Favorites');
            }

            await AsyncStorage.setItem('savedPosts', JSON.stringify(savedPostsArray));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Main Image */}
            <Image source={{ uri: images }} style={styles.mainImage} />

            {/* Animal Info */}
            <Text style={styles.title}>Cow for Sale - {breed} Breed</Text>

            {/* Animal Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.label}>{translations.category || "Category"}:</Text>
                <Text style={styles.value}>{animalType}</Text>

                <Text style={styles.label}>Breed:</Text>
                <Text style={styles.value}>{breed}</Text>

                <Text style={styles.label}>Age:</Text>
                <Text style={styles.value}>{age} years old</Text>

                <Text style={styles.label}>{translations.price}</Text>
                <Text style={styles.value}>${price}</Text>

                <Text style={styles.label}>{translations.location}:</Text>
                <Text style={styles.value}>{locationName}</Text>

                <Text style={styles.label}>Description:</Text>
                <Text style={styles.value}>{description}</Text>
            </View>

            {/* Call to Action Button */}
            <Button title="Call Seller" onPress={() => Linking.openURL(`tel:${phone}`)} color="black" />

            {/* Save Post Button */}
            <TouchableOpacity style={styles.saveButton} onPress={toggleSavePost}>
                <FontAwesome name={isSaved ? "bookmark" : "bookmark-o"} size={24} color={isSaved ? "black" : "#000"} />
                <Text style={styles.saveText}>{isSaved ? 'Saved to Favorites' : 'Save Post'}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    mainImage: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    detailsContainer: {
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 5,
    },
    value: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginTop: 20,
    },
    saveText: {
        marginLeft: 10,
        fontSize: 16,
    },
});

export default AnimalPostDetails;
