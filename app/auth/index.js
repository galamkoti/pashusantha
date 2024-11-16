import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import {useLanguage} from '../context/LanguageContext'

const index = () => {
  const {translations}= useLanguage();
  return (
    <SafeAreaView style={styles.mainContainer}>
        <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
      {/* <Text style={styles.headerText}>Login Methods</Text> */}
      <TouchableOpacity style={styles.buttonBox} onPress={()=>router.push("auth/phonelogin")}>
        <Text style={styles.buttonText}>{translations.login_with_mobile||"Login With Phone Number"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>router.replace("/Animals/Animal")} style={styles.skipView}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default index

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff"
    },
    skipView:{
      borderRadius:5,
      borderColor:"black",
      borderWidth:1,
      padding:5
    },
    skipText:{
      fontSize:14,
      fontWeight:"300"
    },
    logo: {
        height: 250,
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
    headerText:{
        fontSize:22,
        fontWeight:"bold",
        color:"black"
    }
})