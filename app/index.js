import { StyleSheet, ActivityIndicator, View,Text } from 'react-native';
import { useUserData } from './context/UserContext';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index = () => {
    const { user,userLoading } = useUserData();
    const [isFirstLaunch,setIsFirstLaunch]=useState(null);  

    useEffect(()=>{
        AsyncStorage.getItem('alreadyLaunchedVikrai').then(value=>{
            if(value==null){
                AsyncStorage.setItem('alreadyLaunchedVikrai','true');
                setIsFirstLaunch(true);
            }
            else{
                setIsFirstLaunch(false);
            }
        })
    },[]);

    if(userLoading){
        return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="black"/>
        </View>
        );
    }
    
    if(isFirstLaunch==null){
        return null;
    }
    else if(isFirstLaunch==true){
        return <Redirect href="/auth/onboarding" />
    }
    else if(isFirstLaunch==false)
    {
        return <Redirect href="/Animals/Animal" />
    }
    // else if(isFirstLaunch==false && user==null)
    // {
    //     return <Redirect href="/auth" />
    // }

    // SplashScreen.preventAutoHideAsync();
    // useEffect(()=>{
    //     setTimeout(SplashScreen.hideAsync, 2000);
    // },[]);




    // return (
    //     <View style={styles.container}>
    //         <Text style={styles.infoText}>
    //             {user ? 'Redirecting to Animals...' : 'Redirecting to Onboarding...'}
    //         </Text>
    //     </View>
    // );
};

export default Index;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  infoText: {
      fontSize: 16,
      color: '#333',
  },
});
