import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useUserData } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import MyPosts from "./MyPosts";
import favorites from "./favorites";

const Tab = createMaterialTopTabNavigator();

const ProfileTabs = () => {
    const { translations } = useLanguage();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: '#f5f5f5' },
                tabBarIndicatorStyle: { backgroundColor: 'black' },
            }}>
            <Tab.Screen name="MyPosts" component={MyPosts} options={{
                title: translations.my_posts|| 'My Posts'}}
                />
            <Tab.Screen name="favorites" component={favorites}  options={{
                title: translations.saved_posts|| 'Favorites'}}/>
        </Tab.Navigator>
    );
};

const ProfileScreen = () => {
    const { translations } = useLanguage();
    const { user, logoutUser } = useUserData();

    return (
        <View style={styles.container}>
            <View style={styles.userDataContainer}>
                {/* Profile Picture */}
                <Image style={styles.profilePicture}
                    source={{ uri: "https://media.istockphoto.com/id/1330214182/photo/happy-smiling-indian-farmer-counting-currency-notes-inside-the-greenhouse-or-polyhouse.jpg?s=1024x1024&w=is&k=20&c=22iXxp6H-_uD7p1Cgjusk65k26ndUlz6bV2okbA1Lkg=" }} />
                {/* Farmer's Basic Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.nameOfUser}>{user.name}</Text>
                    <Text style={styles.detail}>Farmer</Text>
                    <Text style={styles.detail}>{user.email}</Text>
                    <Text style={styles.detail}>{user.phone}</Text>
                </View>
            </View>

            {/* Top Tabs for My Posts and Favorites */}
            <TouchableOpacity style={styles.logOutButton} onPress={logoutUser}>
                <Text style={styles.logoutText}>{translations.logout|| "Logout"}</Text>
            </TouchableOpacity>
            <View style={styles.tabsContainer}>
                <ProfileTabs />
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 5,
        alignItems: 'center',
    },
    userDataContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
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
    logOutButton: {
        width: "90%",
        backgroundColor: "black",
        marginBottom: 20,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    logoutText:{
        color:'white'
    },  
    profilePicture: {
        borderRadius: 50,
        height: 100,
        width: 100,
        marginRight:50
    },
    tabsContainer: {
        flex: 1,
        width: '100%',
        marginTop: 0,
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
