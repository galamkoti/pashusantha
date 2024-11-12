import { View, Text,  Image, TouchableOpacity, Linking, Alert, StyleSheet } from 'react-native'
import React from 'react'

const settings = () => {

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

  return (
    <View style={{flex:1,backgroundColor:"#fff",flexDirection:"column",alignItems:"center"}}>
            <TouchableOpacity style={styles.buttonBox} onPress={()=>handleLinkPress("https://galamkoti.github.io/vikrai-privacy/index.html")}>
              <Text style={styles.buttonText}>Terms and Conditions</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBox} onPress={()=>handleLinkPress("https://galamkoti.github.io/vikrai-privacy/privacy.html")}>
              <Text style={styles.buttonText}>Privacy Policy</Text>
            </TouchableOpacity>
    </View>
  )
}

export default settings

const styles=StyleSheet.create({
  buttonBox:{
    padding: 10 , 
    backgroundColor:"white",
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    width:"90%",
    margin:20,
    alignItems:"center",
    justifyContent:"center"
  },
  buttonText:{
    fontSize:20,
    fontWeight:"bold",
    color:"black"
  }
})