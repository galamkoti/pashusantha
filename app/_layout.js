import { Stack } from 'expo-router';
import { LanguageProvider } from './context/LanguageContext'
import { LocationProvider } from './context/LocationContext';
import { UserProvider } from './context/UserContext';
import { SavePostProvider } from './context/SavePostContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const StackLayout = () => {
    return (
        <BottomSheetModalProvider>
        <GestureHandlerRootView>
        <UserProvider>
        <LanguageProvider>
            <LocationProvider>
                <SavePostProvider>
                <Stack>
                    <Stack.Screen name='Animals' options={{ headerShown: false }} />
                    <Stack.Screen name='Crops' options={{ headerShown: false }} />
                    <Stack.Screen name='forms' options={{ headerShown: false }} />
                    <Stack.Screen name='auth' options={{headerShown:false}} />
                    <Stack.Screen name='common' options={{headerShown:false}} />
                </Stack>
                </SavePostProvider>
            </LocationProvider>
        </LanguageProvider>
        </UserProvider>
        </GestureHandlerRootView>
        </BottomSheetModalProvider>
    );
}

export default StackLayout;