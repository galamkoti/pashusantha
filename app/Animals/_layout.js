import { router, Tabs } from 'expo-router';
import { MaterialCommunityIcons, Feather, MaterialIcons ,Ionicons} from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, TouchableOpacity ,View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const CustomTabBarButton =({children,onPress}) =>(
    <TouchableOpacity style={{
        top:-20,
        justifyContent:'center',
        alignItems:'center'
    }}
    onPress={onPress}
    >
        <View style={{
            width:70,
            height:70,
            borderRadius:35,
        }}>
            {children}
        </View>
    </TouchableOpacity>

)

export default () => {
    const {translations} = useLanguage();
    return (
        <Tabs initialRouteName='Animal' screenOptions={{
            tabBarLabelStyle: {
                fontSize: 13,  
                fontWeight: 'bold',  
                marginTop:7
              },
            }}>
            <Tabs.Screen name="Animal" options={{
                headerLeft:()=>(
                    <Ionicons name="arrow-back" size={30} color="black" onPress={()=> router.replace("/")} />),
                // headerShown:false,
                title: translations.animals||'Animals',
                tabBarIcon: ({ color, size }) => 
                  <MaterialCommunityIcons name="cow" size={size} color={color} />
            }} />
            <Tabs.Screen name="Subscription" options={{
                title: 'Subscribe',
                tabBarIcon: ({ color, size }) => 
                  <MaterialCommunityIcons name="cow" size={size} color={color} />
            }} />
            <Tabs.Screen name="Sell" options={{
                title: translations.sell||'Sell',
                tabBarIcon: ({ color, size }) => (
                    <View style={[styles.sellIconContainer, { backgroundColor: '#3c6ef2' }]}>
                      <Feather name="plus-circle" size={size + 15} color="#fff" />
                    </View>
                  ),
                tabBarButton: (props) =>(
                    <CustomTabBarButton {...props}/>
                )
            }}
            />
            <Tabs.Screen name="Posts" options={{
                title: 'My Posts',
                headerShown: false,
                tabBarIcon: ({ color, size }) => 
                  <MaterialIcons name="favorite-border" size={size} color={color} />
            }} />
            <Tabs.Screen name="Profile" options={{
                title: translations.profile|| 'Profile',
                tabBarIcon: ({ color, size }) => 
                  <MaterialIcons name="person-pin" size={size} color={color} />
            }} />
        </Tabs>
    );
}

const styles=StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    }, 
    sellIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: '#fff',
        borderWidth: 4
      },
      languageIcon:{
        flex:1,
        height:40,
        width:70,
        resizeMode:"center",
        marginRight:20,
        marginBottom:5
      }
})