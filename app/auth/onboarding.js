import { View, Text, Image, StyleSheet, Button } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const Done=({...props})=>(
    <TouchableOpacity style={styles.ContinueButton} {...props}>
        <Text style={styles.continueText}>Continue</Text>
    </TouchableOpacity>
)
const Skip=({...props})=>(
    <TouchableOpacity style={styles.ContinueButton} {...props}>
        <Text style={styles.continueText}>Skip</Text>
    </TouchableOpacity>
)
const Next=({...props})=>(
    <TouchableOpacity style={styles.ContinueButton} {...props}>
        <Text style={styles.continueText}>Next</Text>
    </TouchableOpacity>
)
const onboarding = () => {
  return (
    <View style={styles.container}>
      <Onboarding
      onDone={()=>router.replace("auth/languageScreen")}
      onSkip={()=>router.replace("auth/languageScreen")}
      DoneButtonComponent={Done}
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
        pages={[
            {
            backgroundColor: '#fff',
            image: <Image source={require('./../../assets/farm-animals-amico.png')} style={styles.image} />,
            title: 'Buy and Sell Your Cattle',
            subtitle: 'Connect with people around you for the best cattle',
            },
            {
            backgroundColor: '#fff',
            image: <Image source={require('./../../assets/farm-animals-bro.png')} style={styles.image} />,
            title: 'Santha In Your Finger Tips',
            subtitle: 'Buy and Sell Cattle with just few clicks',
            },
        ]}
/>
    </View>
  )
}

export default onboarding

const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    image:{
        height:400,
        width:400
    },
    ContinueButton:{
        backgroundColor:'black',
        borderRadius:5,
        margin:5,
        padding:10
    },
    continueText:{
        color:'white'
    }
})