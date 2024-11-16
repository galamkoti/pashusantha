import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, router } from 'expo-router';
import { useUserData } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext'
import Entypo from '@expo/vector-icons/Entypo';

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser,userLoading,setUserLoading } = useUserData();
  const { translations } = useLanguage();


  const LoginUser = async () => {
    setUserLoading(true);
    try {
      const response = await axios.post("https://pashupanta-backend-production.up.railway.app/api/user/create", {
        phone: phoneNumber,
        password: password,
        userName: userName
      })
      const user = response.data.user;
      // Store user login info in AsyncStorage
      if (response.data.message == "User Already Existed" || response.data.message == "created New User") {
        await loginUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        router.replace("/Animals/Animal");
      } else if (response.data.message == "Your Password Is Incorrect") {
        Alert.alert(translations.error||"Error", translations.your_password_is_incorrect||response.data.message);
      }
      setUserLoading(false);
    } catch (error) {
      Alert.alert("InValid PhoneNumber or Password");
      setUserLoading(false);
    }
  }

  const handleLinkPress = async(url) =>{
    const isSupported= await Linking.canOpenURL(url);
    if(isSupported){
      try {
        await Linking.openURL(url);
      } catch (error) {
        console.log(error)
      }
    }
    else{
      Alert.alert("Unable to Open the Link");
    }
  }

  if(userLoading){
    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <ActivityIndicator size="large" color="black"/>
    </View>
  }

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', backgroundColor: "#fff" }}>

      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
        <Text style={{ fontSize: 24, fontWeight: "bold", margin: 20 }}>{translations.login_with_mobile || "Login With Phone Number"}</Text>
        <TextInput
          placeholder={translations.enter_your_name || "Enter Your Name"}
          value={userName}
          onChangeText={setUserName}
          keyboardType="default"
          style={{
            borderWidth: 1,
            borderBottomColor: 'gray',
            marginBottom: 20,
            borderRadius: 10,
            padding: 10,
            width: "90%",
            fontSize:18
          }}
        />
        <TextInput
          placeholder={translations.enter_mobile_number || "Enter phone number"}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={{
            borderWidth: 1,
            borderBottomColor: 'gray',
            marginBottom: 20,
            borderRadius: 10,
            padding: 10,
            width: "90%",
            fontSize:18
          }}
        />
        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', borderWidth: 1, borderRadius: 10, padding: 10, width: "90%", marginBottom: 20 }}>
          <TextInput
            placeholder={translations.enter_password || "Enter Password"}
            value={password}
            onChangeText={setPassword}
            textContentType='password'
            secureTextEntry={!showPassword}
            style={{
              width: "80%",
              fontSize:18
            }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo name={showPassword ? "eye" : "eye-with-line"} size={24} color="black" />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity onPress={LoginUser} style={{
          width: "90%",
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderBottomColor: 'gray',
          marginBottom: 20,
          borderRadius: 10,
          padding: 10,
        }}>
          <Text style={{ color: "white" }}>{translations.login||"Login"}</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"column",alignItems:"center"}}>
          <Text>By Clicking on Login You Agree to</Text>
          <View style={{flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>handleLinkPress("https://galamkoti.github.io/vikrai-privacy/index.html")}>
              <Text style={{textDecorationLine:'underline'}}>Terms and Conditions</Text>
            </TouchableOpacity>
            <Text> and </Text>
            <TouchableOpacity onPress={()=>handleLinkPress("https://galamkoti.github.io/vikrai-privacy/privacy.html")}>
              <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PhoneAuthScreen;

const styles = StyleSheet.create({
  logo: {
    height: 250,
    width: 300,
    borderRadius: 50,
    justifyContent: "center",

  }
})
