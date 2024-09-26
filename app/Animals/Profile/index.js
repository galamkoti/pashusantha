import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import {router} from 'expo-router'
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useUserData } from '../../context/UserContext'

// Mocked data for useful links or options like favorites, etc.
const usefulLinks = [
    { id: '1', title: 'Favorites', icon: require('../../../assets/sell/crops.png') },
    { id: '2', title: 'My Posts', icon: require('../../../assets/sell/crops.png') },
    { id: '3', title: 'Settings', icon: require('../../../assets/sell/crops.png') },
];

const index = () => {
    // const [userInfo,setUserInfo]=useState({});
    const {user,logoutUser}=useUserData();
    console.log("userInfo in profile",user)
    
    return (
        <View style={styles.container}>
            {/* Animated Farmer Picture */}
          
            {/* <View style={styles.animationContainer}>
                <LottieView 
                    source={require('../../../assets/animations/farmer.json')} 
                    autoPlay 
                    loop
                    style={styles.animation}
                />
            </View> */}

            {/* Farmer's Basic Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.nameOfUser}>{user.name}</Text>
                <Text style={styles.detail}>Farmer</Text>
                <Text style={styles.detail}>{user.email}</Text>
                <Text style={styles.detail}>{user.phone}</Text>
            </View>
            {/* Useful Links or Options */}
            <FlatList
                data={usefulLinks}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.linkItem}>
                        <Image source={item.icon} style={styles.linkIcon} />
                        <Text style={styles.linkText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={styles.linksContainer}
            />
            <TouchableOpacity style={styles.logOutButton} onPress={logoutUser}>
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        alignItems: 'center',
    },
    animationContainer: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    animation: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    nameOfUser: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    detail: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    languageButton: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    languageButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    linksContainer: {
        marginTop: 30,
        width: '100%',
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 2,
    },
    linkIcon: {
        width: 30,
        height: 30,
        marginRight: 20,
    },
    linkText: {
        fontSize: 18,
        color: '#333',
    },
    logOutButton:{
        width:"90%",
        backgroundColor:"orange",
        marginBottom:40,
        padding:10,
        justifyContent:"center",
        alignItems:"center"
    }
});
