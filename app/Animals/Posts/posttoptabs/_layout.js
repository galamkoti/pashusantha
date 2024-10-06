import { Tabs ,withLayoutContext} from "expo-router";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLanguage } from "../../../context/LanguageContext";

const TopTabs=withLayoutContext(createMaterialTopTabNavigator().Navigator);
export default function OrderTopNaviation(){
    const {translations}=useLanguage();
    return (
    <SafeAreaView style={{flex:1 , backgroundColor :'white'}}>
        <TopTabs>
            <TopTabs.Screen name="MyPosts" options={{title : translations.my_posts||'My Posts' }} />
            <TopTabs.Screen name="favorites" options={{title : translations.saved_posts||'Favorites'}} />
        </TopTabs>
    </SafeAreaView>
    );
}