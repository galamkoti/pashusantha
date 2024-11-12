import { View, Text, TouchableOpacity, StyleSheet, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext';
import {CustomBottomSheetModal} from '../Components/Animal/CustomBottomSheetModal'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import { router } from 'expo-router';

const languageScreen = () => {

  const {language, translations, languageLoading, changeLanguage}=useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const languages=[
    {label:"English",value:"en"},
    {label:"తెలుగు",value:"te"},
    {label:"हिन्दी",value:"hi"},
    {label:"தமிழ்",value:"ta"},
    {label:"ಕನ್ನಡ",value:"kn"},
    {label:"മലയാളം",value:"ml"},
    {label:"ਪੰਜਾਬੀ",value:"pn"},
  ];

  const handleLanguageChange=(selectedLang)=>{
    setSelectedLanguage(selectedLang);
    changeLanguage(selectedLang);
    console.log("lang",selectedLang)
  }

  useEffect(() => {
    if (!languageLoading && selectedLanguage !== language) {
      setSelectedLanguage(language); // Only set selected language when language loading is done and it's different
      changeLanguage(language);
    }
  }, [language, languageLoading]);

  const renderItem = ({ item }) => {
    const isSelected = language === item.value;

    return (
      // <ScrollView showsHorizontalScrollIndicator={false}>
      <Pressable style={styles.itemContainer} onPress={() => handleLanguageChange(item.value)}>
        <View style={styles.radioContainer}>
          <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]} />
        </View>
        <Text style={styles.itemTitle}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <>
        <View style={styles.mainContainer}>
          <FlatList
            data={languages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          </View>
        <TouchableOpacity style={styles.buttonBox} onPress={()=>router.push("/auth")}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        </>
  )
}

export default languageScreen

const styles=StyleSheet.create({
  mainContainer:{
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"#fff",
  },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    margin:20,
    borderWidth:1,
    borderColor:'black',
    borderRadius:10
  },
  radioContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButton: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    backgroundColor: 'black',
  },
  languageContainer:{
    flex:1
  },
  // languageLabelView:{
  //   flex:1,
  //   borderRadius:10,
  //   borderWidth:1,
  //   borderColor:"black",
  // },
  logo: {
      height: 200,
      width: 300,
      borderRadius: 50,
      justifyContent: "center",
      marginBottom:40
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
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
})