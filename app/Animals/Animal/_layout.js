import {Stack} from 'expo-router'
import { Image, View } from 'react-native';

const MenuLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='index' options={{
                headerShown:false
                }}/>
        </Stack>
    );
}
export default MenuLayout;