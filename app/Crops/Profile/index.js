import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LanguageModal from '../../Components/Language/LanguageModal';
import { translation } from '../../Components/Language/translations';
import { saveSelectedLangInAsync,getSelectedLangFromAsync } from '../../Components/Language/languageStorage';
import axios, {Axios} from 'axios'
// Mocked data for useful links or options like favorites, etc.

const usefulLinks = [
    { id: '1', title: 'Favorites', icon: require('../../../assets/sell/crops.png') },
    { id: '2', title: 'My Posts', icon: require('../../../assets/sell/crops.png') },
    { id: '3', title: 'Settings', icon: require('../../../assets/sell/crops.png') },
];



const index = () => {
    const [langmodalVisible,setLangModalVisible]=useState(false);
    const [data, setData] = useState(null);
    const [selectedLangIndex,setSelectedLangIndex]=useState(0);
    // const saveSelectedLangInAsync = async (index) => {
    //     await saveSelectedLangInAsync(index);
    // };
    useEffect(()=>{
        const fetchData = async () =>{
            try {
                const response=await axios.get("https://backend-start-production.up.railway.app/api/products?name=case");
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
    
        }
        fetchData();
    },[]);
    
    return (
        <View style={styles.container}>
            {/* Animated Farmer Picture */}
          
            {/* <View style={styles.animationContainer}>
                <LottieView 
                    source={require('../../../assets/animations/farmer.json')} 
                    autoPlay 
                    loop
                    style={styles.animation}
                />
            </View> */}

            {/* Farmer's Basic Details */}
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.detail}>Farmer</Text>
                <Text style={styles.detail}>johndoe@example.com</Text>
                <Text style={styles.detail}>+1 234 567 890</Text>
            </View>

            {/* Language Change Option */}
            <TouchableOpacity style={styles.languageButton} onPress={()=>{
                setLangModalVisible(!langmodalVisible);
            }}>
                <Text style={styles.languageButtonText}>
                    {selectedLangIndex==0?translation[0].English
                    :selectedLangIndex==1?translation[0].Hindi
                    :selectedLangIndex==2?translation[0].Telugu
                    :selectedLangIndex==3?translation[0].Tamil
                    :selectedLangIndex==4?translation[0].Malayalam
                    :selectedLangIndex==5?translation[0].Kannada
                    :selectedLangIndex==6?translation[0].Punjabi
                    :null}
                </Text>
            </TouchableOpacity>
            <LanguageModal 
            langmodalVisible={langmodalVisible}
             setLangModalVisible={setLangModalVisible}
             onSelectLang={(languageIndex)=>{
                setSelectedLangIndex(languageIndex);
                saveSelectedLangInAsync(languageIndex);
             }}
             
             />
            <TouchableOpacity style={styles.linkItem}>
                        <Image source={usefulLinks[0].icon} style={styles.linkIcon} />
                        <Text style={styles.linkText}>
                        {selectedLangIndex==0?translation[1].English
                        :selectedLangIndex==1?translation[1].Hindi
                        :selectedLangIndex==2?translation[1].Telugu
                        :selectedLangIndex==3?translation[1].Tamil
                        :selectedLangIndex==4?translation[1].Malayalam
                        :selectedLangIndex==5?translation[1].Kannada
                        :selectedLangIndex==6?translation[1].Punjabi
                        :null}
                        </Text>
                    </TouchableOpacity>
            {/* Useful Links or Options */}
            <FlatList
                data={usefulLinks}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.linkItem}>
                        <Image source={item.icon} style={styles.linkIcon} />
                        <Text style={styles.linkText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                style={styles.linksContainer}
            />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        alignItems: 'center',
    },
    animationContainer: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    animation: {
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    detail: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
    languageButton: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    languageButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    linksContainer: {
        marginTop: 30,
        width: '100%',
    },
    linkItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
        elevation: 2,
    },
    linkIcon: {
        width: 30,
        height: 30,
        marginRight: 20,
    },
    linkText: {
        fontSize: 18,
        color: '#333',
    },
});
