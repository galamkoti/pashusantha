import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, Image,StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useUserData } from '../context/UserContext';
import {useLanguage} from '../context/LanguageContext'

const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [message, setMessage] = useState('');
  const {loginUser}=useUserData();
  const {translations}=useLanguage();

  // Send OTP to the user's phone number
  const sendOTP = async () => {
    try {
      const response = await axios.post('https://pashupanta-backend-production.up.railway.app/sms/send-otp', {
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
      const response = await axios.post('https://pashupanta-backend-production.up.railway.app/sms/verify-otp', {
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
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      {!verificationSent ? (
        <>
          <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
          <Text>{ translations.login_with_mobile||'Login With Mobile'}</Text>
          <TextInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
          />
          <Button title="Send OTP" onPress={sendOTP} />
        </>
      ) : (
        <>
          <TextInput
            placeholder="Enter OTP"
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#000',
              marginBottom: 20,
            }}
          />
          <Button title="Verify OTP" onPress={verifyOTP} />
          <Button title="Send OTP Again" onPress={()=>{}} />
        </>
      )}

      {message ? <Text style={{ marginTop: 20, color: 'green' }}>{message}</Text> : null}
    </View>
  );
};

export default PhoneAuthScreen;

const styles=StyleSheet.create({
  logo:{
    height:150,
    width:200,
    borderRadius:50,
    justifyContent:"center",
  }
})
