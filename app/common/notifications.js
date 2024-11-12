import { View, Text,  Image } from 'react-native'
import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const settings = () => {
  const {translations}=useLanguage();
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#fff"}}>
  <Image source={{uri:"https://res.cloudinary.com/dxxe5dxub/image/upload/v1731414590/sad_cow_rtvxow.png"}}
        style={{ height:200,width:"90%" }}/>
    <Text style={{fontSize:20,fontWeight:"bold",marginTop:30}}>{translations.notifications_not_found ||"No Notifications"}</Text>
    </View>
  )
}

export default settings