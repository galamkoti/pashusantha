import {Stack} from 'expo-router'

const CropsLayout =() =>{
    return (
        <Stack>
            <Stack.Screen name='index' options={{headerTitle : 'Crops' ,headerShown:false}}/>
        </Stack>
    );
}
export default CropsLayout;