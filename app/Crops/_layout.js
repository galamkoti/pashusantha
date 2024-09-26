import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity ,View } from 'react-native';

const CustomTabBarButton =({children,onPress}) =>(
    <TouchableOpacity style={{
        top:-20,
        justifyContent:'center',
        alignItems:'center',
        
    }}
    onPress={onPress}
    >
        <View style={{
            width:70,
            height:70,
            borderRadius:35
        }}>
            {children}
        </View>
    </TouchableOpacity>

)

export default () => {
    return (
        <Tabs initialRouteName='Crops' screenOptions={{
            }}>
            <Tabs.Screen name="Crops" options={{
                title: 'Crops',
                headerShadowVisible:true,
                headerShown:false,
                tabBarIcon: ({size,color}) => 
                  <MaterialCommunityIcons name="flower-tulip-outline" size={size} color={color} />
            }} />
             <Tabs.Screen name="Subscription" options={{
                title: 'Subscribe',
                tabBarIcon: ({size,color}) => 
                  <MaterialCommunityIcons name="flower-tulip-outline" size={size} color={color} />
            }} />
            <Tabs.Screen name="Sell" options={{
                title: 'Sell',
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
                title: 'Profile',
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
})