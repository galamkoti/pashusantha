import {router, Stack} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLanguage } from '../context/LanguageContext';

const FormsLayout =() =>{
    const {translations}=useLanguage();
    return (
        <Stack >
            <Stack.Screen name='payment' options={{headerTitle : 'Payment Page' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='animalPostDetails' options={{headerTitle : translations.details_page||'Details Page' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='allCategories' options={{headerTitle : translations.all_categories||'All Categories' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='categoryPreview' options={{headerTitle : translations.category_preview||'Category Preview Page' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
        </Stack>
    );
}
export default FormsLayout;