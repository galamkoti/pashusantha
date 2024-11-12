import {router, Stack} from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLanguage } from '../context/LanguageContext';

const FormsLayout =() =>{
    const {translations}=useLanguage();
    return (
        <Stack >
            <Stack.Screen name='animalPostDetails' options={{headerTitle : translations.details_page||'Details Page' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='allCategories' options={{headerTitle : translations.all_categories||'All Categories' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='categoryPreview' options={{headerTitle : translations.category_preview||'Category Preview Page' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='settings' options={{headerTitle : translations.settings||'Settings' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='notifications' options={{headerTitle : translations.notifications||'Notifications' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='favorites' options={{headerTitle : translations.saved_posts||'Favorites' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
            <Stack.Screen name='MyPosts' options={{headerTitle : translations.my_posts||'My Posts' ,headerLeft:()=>(
                <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.back()} style={{marginRight: 20}}/>
            )}}/>
        </Stack>
    );
}
export default FormsLayout;