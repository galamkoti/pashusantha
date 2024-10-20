import {Stack} from 'expo-router'

const ProfieLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}/>
            <Stack.Screen name='MyPosts' options={{headerShown:false}}/>
            <Stack.Screen name='favorites' options={{headerShown:false}}/>
        </Stack>
    );
}
export default ProfieLayout;