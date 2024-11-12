import {Stack} from 'expo-router'
import { useLanguage } from '../context/LanguageContext';

const AuthRouter =() =>{
    const {translations} = useLanguage();
    return (
        <Stack>
            <Stack.Screen name='onboarding' options={{headerShown:false}} />
            <Stack.Screen name='languageScreen' options={{headerTitle:'Select Your Language'}}/>
            <Stack.Screen name='index' options={{headerTitle:"Login Page"}}/>
            <Stack.Screen name='login' options={{headerTitle:'Login With Phone Number'}} />
            <Stack.Screen name='emailpassword' options={{headerTitle:'Login With Email & Password'}}/>
            <Stack.Screen name='phonelogin' options={{headerTitle:translations.login_with_mobile||'Login With Phone Number'}}/>
        </Stack>
    );
}

export default AuthRouter;