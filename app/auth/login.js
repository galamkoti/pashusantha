import React, { useState } from 'react';
import { View, TextInput, Text, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useUserData } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext'

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [message, setMessage] = useState('');
  const { loginUser } = useUserData();
  const { translations } = useLanguage();

  // Send OTP to the user's phone number
  const sendOTP = async () => {
    try {
      const response = await axios.post('https://pashupanta-backend.onrender.com/sms/send-otp', {
        phoneNumber: `+91${phoneNumber}` // Assuming Indian users, so prefix with +91
      });
      if (response.data.success) {
        setVerificationSent(true);
        setMessage('OTP sent! Please check your phone.');
      } else {
        setMessage('Failed to send OTP');
      }
    } catch (error) {
      setMessage('Error sending OTP');
      console.log(error);
    }
  };
  // Verify the OTP entered by the user
  const verifyOTP = async () => {
    try {
      const response = await axios.post('https://pashupanta-backend.onrender.com/sms/verify-otp', {
        phoneNumber: `${phoneNumber}`, // Assuming Indian numbers
        code: code
      });

      if (response.data.success) {
        const { user } = response.data;
        // Store user login info in AsyncStorage
        await loginUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setMessage('Phone number verified! User logged in.');
        router.replace("/")
      } else {
        setMessage('Invalid OTP');
      }
    } catch (error) {
      setMessage('Error verifying OTP');
      console.log(error);
    }
  };

  // To logout or clear user data from AsyncStorage:
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('isLoggedIn');
    Alert.alert("Logged out");
  };

  return (
    <View style={{ padding: 20, flex:1, justifyContent: 'center', backgroundColor: "#fff" }}>
      {!verificationSent ? (
        <>
          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: 20 }}>{translations.login_with_mobile || "Login With Phone Number"}</Text>
            <TextInput
              placeholder={translations.enter_mobile_number ||"Enter phone number"}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              style={{
                borderWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,
                width: "90%"
              }}
            />
            <TouchableOpacity onPress={sendOTP} style={{ width: "90%", 
                backgroundColor: "black", 
                justifyContent: "center",
                alignItems: "center", 
                borderWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,}}>
              <Text style={{ color: "white" }}>{translations.get_otp||"Send Otp"}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
        <Text style={{ fontSize: 26, fontWeight: "bold", margin: 40 }}>{translations.please_verify_your_otp||"Please Verify Your OTP"}</Text>
          <TextInput
            placeholder="Enter OTP"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            style={{
              borderWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,
                width: "90%"
            }}
          />
          <TouchableOpacity onPress={verifyOTP} style={{ width: "90%", 
                backgroundColor: "black", 
                justifyContent: "center",
                alignItems: "center", 
                borderWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,}}>
              <Text style={{ color: "white" }}>{translations.verify_otp||"Verify OTP"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>[]} style={{ width: "90%", 
                backgroundColor: "black", 
                justifyContent: "center",
                alignItems: "center", 
                borderWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,}}>
              <Text style={{ color: "white" }}>{translations.send_otp_again||"Send OTP Again"}</Text>
            </TouchableOpacity>
        </>
      )}

      {message ? <Text style={{ marginTop: 20, color: 'green' }}>{message}</Text> : null}
    </View>
  );
};

export default PhoneAuthScreen;

const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 300,
    borderRadius: 50,
    justifyContent: "center",

  }
})
