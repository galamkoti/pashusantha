import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, Feather, MaterialIcons } from '@expo/vector-icons';

export default () => {
    return (
        <Tabs initialRouteName='Crops'>
            <Tabs.Screen name="Crops" options={{
                title: 'Crops',
                tabBarIcon: ({ color, size }) => 
                  <MaterialCommunityIcons name="flower-tulip-outline" size={size} color={color} />
            }} />
            <Tabs.Screen name="Animal" options={{
                title: 'Animals',
                tabBarIcon: ({ color, size }) => 
                  <MaterialCommunityIcons name="cow" size={size} color={color} />
            }} />
            <Tabs.Screen name="Sell" options={{
                title: 'Sell',
                tabBarIcon: ({ color, size }) => 
                  <Feather name="plus-circle" size={size} color={color} />
            }} />
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
