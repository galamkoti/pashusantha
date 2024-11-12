import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity , SafeAreaView,Modal, Linking, Alert } from 'react-native';
import React from 'react';
import { Link,  Redirect,  router} from 'expo-router';
import {useLanguage} from '../../context/LanguageContext'
import { FontAwesome5 } from '@expo/vector-icons';
import { useUserData } from '../../context/UserContext';

const index = () => {
  const {  translations } = useLanguage();
  const {user}=useUserData();
  const handleWhatsApp = () => {
    // Redirect to WhatsApp with pre-filled message
    let url = `whatsapp://send?phone=${7981787912}&text=${translations.sell_on_whatsapp||"Hello, I want to sell my cattle"}`;
    Linking.openURL(url).catch(() => {
        alert('Make sure WhatsApp is installed on your device');
    });
  };
    const handleSellCattlePress = ()=>{
      
      if(!user){
        Alert.alert(translations.login||"Login",translations.please_login_to_proceed||"Please Login To Proceed",[
          {
            text:translations.cancel||"CANCEL",
            style:"cancel"
          },
          {
            text:translations.login||"LOGIN",
            style:'default',
            onPress: () => {
              router.push({pathname:"auth/phonelogin"})
            }
          }
        ])
      }
      else{
        router.push("forms/animal");
      }
    }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity style={styles.categoryContainer} onPress={()=>handleSellCattlePress()}>
      <Image source={require('../../../assets/sell/animal.jpg')} style={styles.image} />
      <Text style={styles.title}>{translations.sell_animal||'Sell Animals'}</Text>
    </TouchableOpacity>
      {/* <TouchableOpacity style={styles.categoryContainer} onPress={()=>{
      router.push({pathname:`/forms/crops`})
    }}>
      <Image source={require('../../../assets/sell/animal.jpg')} style={styles.image} />
      <Text style={styles.title}>{translations.sell_crop||'Sell crops'}</Text>
    </TouchableOpacity> */}
      <TouchableOpacity style={styles.categoryContainer} onPress={handleWhatsApp}>
                <FontAwesome5 name="whatsapp-square" size={150} color="green" />
                <Text style={styles.title}>{translations.sell_pashu_using_whatsapp}</Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryContainer: {
    height:300,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    resizeMode:'contain'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
