import {Stack} from 'expo-router'

const SubscriptionLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}/>
        </Stack>
    );
}
export default SubscriptionLayout;