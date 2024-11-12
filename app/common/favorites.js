import { View, Text, Image, StyleSheet, TouchableOpacity,FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useSavePost } from '../context/SavePostContext';
import { router } from 'expo-router';
import { useLanguage } from '../context/LanguageContext';

const FavoritesScreen = () => {
    const { savedPosts } = useSavePost();
    const {translations}=useLanguage();

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
                <Text style={styles.postTitle}>{translations[item.animalType] || item.animalType}  - {translations[item.breed] || item.breed}</Text>
                    <Text style={styles.postTitle}>{translations.price||"Price"}: {item.price} </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
        {savedPosts.length > 0 ? (
        <View style={styles.container}>
            
                <FlatList
                    data={savedPosts}
                    renderItem={renderPostItem}
                    keyExtractor={(item) => item._id}
                />
                </View>
            ) : (
                <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#fff"}}>
                {/* <Image
                source={{ uri: 'https://media.giphy.com/media/11qwfyd5mTJvDa/giphy.gif' }}
                style={styles.no_posts_video}
              /> */}
              <Image source={{uri:"https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414590/sad_cow_rtvxow.png"}}
                    style={{ height:200,width:"90%" }}/>
                <Text style={styles.emptyText}>{translations.no_saved_posts||"No saved posts."}</Text>
                </View>
            )}
      </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f2f2f2',
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,
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
        marginTop: 50,
        fontSize:24,
        fontWeight:"bold"
    },
    no_posts_video:{
        height:300,
        width:300
      }
});

export default FavoritesScreen;
