import {Stack} from 'expo-router'

const ProfieLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}}/>
        </Stack>
    );
}
export default ProfieLayout;