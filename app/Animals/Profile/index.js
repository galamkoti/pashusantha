import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable,ScrollView, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useUserData } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import {MaterialIcons,Entypo} from '@expo/vector-icons';
import { router } from 'expo-router';


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

    const handleLogout=()=>{
        Alert.alert("Logging Out", "Are You Sure to Logout?", [
            {
                text: "CANCEL",
                onPress: () => console.log("Logout Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "LOGOUT",
                onPress: () => logoutUser(),
                style: "default"
            }
        ])
    }

    return (
        <ScrollView  contentContainerStyle={styles.container}>
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

            <View style={styles.lineStyling} ></View>

            {/* Top Tabs for My Posts and Favorites */}

            <View style={styles.tabsContainer}>
                {/* <ProfileTabs /> */}
                <Pressable style={styles.containerRow} onPress={()=>router.push("common/MyPosts")}>
                <Entypo name="images" size={24} color="black" style={styles.iconStyle}/>
                    <Text style={styles.detail}>{  translations.my_posts||"My Posts"}</Text>
                </Pressable>
                <Pressable style={styles.containerRow}  onPress={()=>router.push("common/favorites")}>
                    <MaterialIcons name="favorite" size={24} color="black" style={styles.iconStyle} />
                    <Text>{translations.saved_posts || "Saved Posts" }</Text>
                </Pressable>
                <Pressable style={styles.containerRow} onPress={()=>router.push("common/notifications")}>
                <MaterialIcons name="notifications-on" size={24} color="black"  style={styles.iconStyle}/>
                    <Text>{translations.notifications|| "Notifications" }</Text>
                </Pressable>
                <Pressable style={styles.containerRow} onPress={()=>router.push("common/settings")}>
                <MaterialIcons name="settings" size={24} color="black"  style={styles.iconStyle}/>
                    <Text>{translations.settings|| "Settings" }</Text>
                </Pressable>
            </View>
            <TouchableOpacity style={styles.logOutButton} onPress={()=>handleLogout()}>
                <Text style={styles.logoutText}>{translations.logout|| "Logout"}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 5,
        alignItems:"center"
    },
    lineStyling:{
        width : "90%",
        height:1,
        borderWidth:0.5,
        borderColor:"gray",
        margin:10
    },
    iconStyle:{
        marginRight:40
    },
    containerRow:{
        flexDirection:"row",
        width:"90%",
        margin:15
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
        marginBottom: 50,
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
        flex:1,
        marginTop: 0,
        width:"90%",
        alignItems:"center"
    },
    tabContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});
