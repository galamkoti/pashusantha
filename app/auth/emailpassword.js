import React, { useState } from 'react';
import { View, TextInput, Text,  Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserData } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext'
import Entypo from '@expo/vector-icons/Entypo';

const PhoneAuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useUserData();
  const { translations } = useLanguage();


  const LoginUser=()=>{
    
  }

  return (
    <View style={{ padding: 20, flex:1, justifyContent: 'center', backgroundColor: "#fff" }}>

          <View style={{ flexDirection: "column", alignItems: "center" }}>
            <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
            <Text style={{ fontSize: 24, fontWeight: "bold", margin: 20 }}>{"Login With Email"}</Text>
            <TextInput
              placeholder={"Enter Email Address"}
              value={email}
              onChangeText={setEmail}
              keyboardType="default"
              style={{
                borderWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,
                width: "90%"
              }}
            />
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent:"space-between",alignItems: 'center', borderWidth: 1, borderRadius: 10, padding: 10,width:"90%",marginBottom:20 }}>
            <TextInput
              placeholder={translations.enter_password ||"Enter Password"}
              value={password}
              onChangeText={setPassword}
              textContentType='password'
              secureTextEntry={!showPassword}
              style={{
                width: "80%"
              }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Entypo name={showPassword?"eye":"eye-with-line"} size={24} color="black" />
            </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity onPress={LoginUser} style={{ width: "90%", 
                backgroundColor: "black", 
                justifyContent: "center",
                alignItems: "center", 
                borderWidth: 1,
                borderBottomColor: 'gray',
                marginBottom: 20,
                borderRadius: 10,
                padding: 10,}}>
              <Text style={{ color: "white" }}>{"Login"}</Text>
            </TouchableOpacity>
          </View>
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
