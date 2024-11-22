import {router, Stack} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLanguage } from '../context/LanguageContext';

const FormsLayout =() =>{
    const {translations}=useLanguage();
    return (
        <Stack >
            <Stack.Screen name='animal' options={{headerTitle : translations.fill_pashu_data||'Fill Pashu Data' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            
        </Stack>
    );
}
export default FormsLayout;