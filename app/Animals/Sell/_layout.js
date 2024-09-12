import {Stack} from 'expo-router'

const SellLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}/>
        </Stack>
    );
}
export default SellLayout;