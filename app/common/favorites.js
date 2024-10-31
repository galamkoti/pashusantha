import { View, Text, Image, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useSavePost } from '../context/SavePostContext';
import { router } from 'expo-router';

const FavoritesScreen = () => {
    const { savedPosts } = useSavePost();

    useEffect(() => {
        console.log("Saved Posts:", savedPosts); // Debugging savedPosts
    }, [savedPosts]);

    // Function to render each saved post item
    const renderPostItem = ({ item }) => {
        const imageArray = item.images ? item.images.split(',') : [];  // Split the images into an array
        const firstImage = imageArray[0];  // Get the first image

        return (
            <TouchableOpacity 
                style={styles.postItem} 
                onPress={() => router.push({ pathname: `common/animalPostDetails`, params: item })}>
                {firstImage && (
                    <Image source={{ uri: firstImage }} style={styles.postImage} />  // Display the first image
                )}
                <View style={styles.postInfo}>
                    <Text style={styles.postTitle}>{item.breed} - ${item.price}</Text>
                    <Text style={styles.postDetails}>Age: {item.age} years | Location: {item.locationName}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {savedPosts.length > 0 ? (
                <FlatList
                    data={savedPosts}
                    renderItem={renderPostItem}
                    keyExtractor={(item) => item._id}
                />
            ) : (
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Image
                source={{ uri: 'https://media.giphy.com/media/11qwfyd5mTJvDa/giphy.gif' }}
                style={styles.no_posts_video}
              />
                <Text style={styles.emptyText}>No saved posts.</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    postItem: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    postImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,
    },
    postInfo: {
        justifyContent: 'center',
    },
    postTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postDetails: {
        fontSize: 14,
        color: '#555',
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 50,
        color: '#555',
    },
    no_posts_video:{
        height:300,
        width:300
      }
});

export default FavoritesScreen;
