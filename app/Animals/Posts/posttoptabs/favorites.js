import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSavePost } from '../../../context/SavePostContext';
import { router } from 'expo-router';

const FavoritesScreen = () => {
    const {savedPosts}=useSavePost();
    // Function to render each saved post item
    const renderPostItem = ({ item }) => (
        <TouchableOpacity style={styles.postItem} onPress={() => router.push({pathname:`forms/animalPostDetails`,params:item})}>
            <Image source={{ uri: item.images }} style={styles.postImage} />
            <View style={styles.postInfo}>
                <Text style={styles.postTitle}>{item.breed} - ${item.price}</Text>
                <Text style={styles.postDetails}>Age: {item.age} years | Location: {item.locationName}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {savedPosts.length > 0 ? (
                <FlatList
                    data={savedPosts}
                    renderItem={renderPostItem}
                    keyExtractor={(item) => item._id}
                />
            ) : (
                <Text style={styles.emptyText}>No saved posts.</Text>
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
    },
    postInfo: {
        marginLeft: 10,
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
});

export default FavoritesScreen;
