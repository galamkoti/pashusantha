import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, ScrollView, Alert, Linking } from 'react-native';
import { useUserData } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';

const ProfileTabs = () => {
  const { translations } = useLanguage();
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: '#f5f5f5' },
        tabBarIndicatorStyle: { backgroundColor: 'black' },
      }}
    >
      <Tabs.Screen
        name="common/MyPosts"
        options={{ title: translations.my_posts || 'My Posts' }}
      />
      <Tabs.Screen
        name="common/favorites"
        options={{ title: translations.saved_posts || 'Favorites' }}
      />
    </Tabs>
  );
};

const ProfileScreen = () => {
  const { translations } = useLanguage();
  const { user, logoutUser } = useUserData();

  const handleLogout = () => {
    Alert.alert(
      translations.logging_out || "Logging Out",
      translations.are_you_sure_to_logout || "Are You Sure to Logout?",
      [
        { text: translations.cancel || "CANCEL", style: "cancel" },
        { text: translations.logout || "LOGOUT", onPress: () => logoutUser() }
      ]
    );
  };

  const handleWhatsApp = () => {
    let url = `whatsapp://send?phone=${917981787912}&text=Hi I want to give feedback`;
    Linking.openURL(url).catch(() => {
      alert('Make sure WhatsApp is installed on your device');
    });
  };

  return (
    <>
      {user != null ? (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.userDataContainer}>
            <Image
              style={styles.profilePicture}
              source={{ uri: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414590/profile_epjfzu.png" }}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.nameOfUser}>{user.name}</Text>
              <Text style={styles.detail}>{translations.farmer || "Farmer"}</Text>
              <Text style={styles.detail}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.lineStyling}></View>

          {/* Tabs for My Posts and Favorites */}
          <View style={styles.tabsContainer}>
            <ProfileTabs />
          </View>

          <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>{translations.logout || "Logout"}</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
          <Image
            source={{ uri: "https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414590/no_profile_mldsij.png" }}
            style={{ height: 300, width: "90%" }}
          />
          <TouchableOpacity onPress={() => router.push("/auth/phonelogin")} style={styles.buttonBox}>
            <Text style={styles.buttonText}>{translations.login_to_view_profile || "Please LogIn To View Profile"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 5,
        alignItems:"center"
    },
    buttonBox:{
        width:"90%",
        height:60,
        borderRadius:10,
        margin:10,
        backgroundColor:"black",
        justifyContent:"center",
        alignItems:"center"
    },
    buttonText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
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
        fontSize: 20,
        fontWeight:"bold"
    },
    logOutButton: {
        width: "90%",
        backgroundColor: "black",
        marginBottom: 60,
        borderRadius:10,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    logoutText:{
        color:'white',
        fontSize:20,
        fontWeight:"bold"
    },  
    profilePicture: {
        borderRadius: 20,
        height: 100,
        width: 100,
        resizeMode: 'contain',
        marginRight:40
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
