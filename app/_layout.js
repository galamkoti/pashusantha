import { Stack } from 'expo-router';
import { LanguageProvider } from './context/LanguageContext'
import { LocationProvider } from './context/LocationContext';
import { UserProvider } from './context/UserContext';
import { SavePostProvider } from './context/SavePostContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthContextProvider } from './context/authContext';

const StackLayout = () => {
    return (
        <BottomSheetModalProvider>
        <GestureHandlerRootView>
        <AuthContextProvider>
        <UserProvider>
        <LanguageProvider>
            <LocationProvider>
                <SavePostProvider>
                <Stack>
                    <Stack.Screen name='auth' options={{headerShown:false}} />
                    <Stack.Screen name='Animals' options={{ headerShown: false }} />
                    <Stack.Screen name='forms' options={{ headerShown: false }} />
                    <Stack.Screen name='common' options={{headerShown:false}} />
                </Stack>
                </SavePostProvider>
            </LocationProvider>
        </LanguageProvider>
        </UserProvider>
        </AuthContextProvider>
        </GestureHandlerRootView>
        </BottomSheetModalProvider>
    );
}

export default StackLayout;