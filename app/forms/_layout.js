import {router, Stack} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

const FormsLayout =() =>{
    return (
        <Stack >
            <Stack.Screen name='animal' options={{headerTitle : 'Animal Form' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='crops' options={{headerTitle : 'Crops Form' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
        </Stack>
    );
}
export default FormsLayout;