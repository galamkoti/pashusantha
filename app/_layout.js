import {Stack} from 'expo-router';
import {LanguageProvider} from './context/LanguageContext'

const StackLayout= () =>{
    return (
        <LanguageProvider>
        <Stack>
            <Stack.Screen name='Animals' options={{headerShown : false}}/>
            <Stack.Screen name='Crops' options={{headerShown : false}}/>
            <Stack.Screen name='forms' options={{headerShown: false}} />
        </Stack>
        </LanguageProvider>
    );
}

export default StackLayout;