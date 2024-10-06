import AsyncStorage from '@react-native-async-storage/async-storage';
import {  router} from 'expo-router'
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserData } from './context/UserContext';
import { useLanguage } from './context/LanguageContext';
const index = () => {
    const {user}=useUserData();
    const {translations}=useLanguage();
    console.log("user in app index",user);
  return (
    <View style={styles.container}>
        {user?
        <>
        {/* Animals Box */}
        <TouchableOpacity style={styles.box} onPress={()=>{
                  router.replace('/Animals/Animal')
            }}>
                <Text style={styles.boxText}>{translations.animals}</Text>
            </TouchableOpacity>

            {/* Crops Box */}
            <TouchableOpacity style={styles.box} onPress={()=>{
                  router.replace('/Crops/Crops')
            }}>
                <Text style={styles.boxText}>{translations.crops}</Text>
            </TouchableOpacity>
        </>:
            <TouchableOpacity style={styles.box} onPress={()=>{
                  router.replace('/auth/login')
            }}>
                <Text style={styles.boxText}>Login</Text>
            </TouchableOpacity>
        }
        </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: 20,
  },
  box: {
      width: 150, // Square box
      height: 150, // Square box
      backgroundColor: '#4CAF50', // Green color
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
      borderRadius: 15, // Rounded corners
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
      elevation: 5, // Android shadow
  },
  boxText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff', // White text color
  },
});