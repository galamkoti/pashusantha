import {Stack} from 'expo-router';


const StackLayout= () =>{
    return (
        <Stack>
            <Stack.Screen name='Animals' options={{headerShown : false}}/>
            <Stack.Screen name='Crops' options={{headerShown : false}}/>
            <Stack.Screen name='forms' options={{headerShown: false}} />
        </Stack>
    );
}

export default StackLayout;