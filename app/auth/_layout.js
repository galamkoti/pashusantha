import {Stack} from 'expo-router'

const AuthRouter =() =>{
    return (
        <Stack>
            <Stack.Screen name='login' options={{headerShown:false}} />
            <Stack.Screen name='otpverify' options={{headerShown:false}}/>
        </Stack>
    );
}

export default AuthRouter;