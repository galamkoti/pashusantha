import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity , SafeAreaView,Modal, Linking } from 'react-native';
import React from 'react';
import { router} from 'expo-router';
import {useLanguage} from '../../context/LanguageContext'
import { FontAwesome5 } from '@expo/vector-icons';

const index = () => {
  const {  translations } = useLanguage();
  const handleWhatsApp = () => {
    // Redirect to WhatsApp with pre-filled message
    let url = `whatsapp://send?phone=${6309065662}&text=${translations.sell_on_whatsapp||"Hello, I want to sell my cattle"}`;
    Linking.openURL(url).catch(() => {
        alert('Make sure WhatsApp is installed on your device');
    });
};
  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity style={styles.categoryContainer} onPress={()=>{
      router.push({pathname:`/forms/animal`})
    }}>
      <Image source={require('../../../assets/sell/animal.jpg')} style={styles.image} />
      <Text style={styles.title}>{translations.sell_animal||'Sell Animals'}</Text>
    </TouchableOpacity>
      {/* <TouchableOpacity style={styles.categoryContainer} onPress={()=>{
      router.push({pathname:`/forms/crops`})
    }}>
      <Image source={require('../../../assets/sell/animal.jpg')} style={styles.image} />
      <Text style={styles.title}>{translations.sell_crop||'Sell crops'}</Text>
    </TouchableOpacity> */}
      <TouchableOpacity style={styles.categoryContainer} onPress={handleWhatsApp}>
                <FontAwesome5 name="whatsapp-square" size={150} color="green" />
                <Text style={styles.title}>{translations.sell_pashu_using_whatsapp}</Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  row: {
    justifyContent: 'space-between',
  },
  categoryContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    resizeMode:'contain'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});
// import React, { useState, useCallback } from 'react';
// import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Button } from 'react-native';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import { Tabs, router } from 'expo-router';

// const categoriesToSell = [
//   { id: '1', name: 'Animal', image: require('../../../assets/animal/cow.jpg'), form: 'animal' },
//   { id: '2', name: 'Crops', image: require('../../../assets/crops/wheat.jpg'), form: 'crops' },
// ];

// const renderSellCategory = ({ item }) => {
//   return (
//     <TouchableOpacity style={styles.categoryContainer} onPress={() => {
//       router.push({ pathname: `/forms/${item.form}` })
//     }}>
//       <Image source={item.image} style={styles.image} />
//       <Text style={styles.title}>{item.name}</Text>
//     </TouchableOpacity>
//   );
// };

// const SellScreen = () => {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [previousTab, setPreviousTab] = useState(null);
//   const navigation = useNavigation();

//   useFocusEffect(
//     useCallback(() => {
//       const handleTabPress = (e) => {
//         // Set the previous tab name when any other tab is pressed
//         setPreviousTab(e.target?.name || 'Home');
//       };

//       // Set up an event listener to track tab changes
//       const unsubscribeTabPress = navigation.addListener('tabPress', handleTabPress);

//       // Open the modal when the "Sell" tab is focused
//       setModalVisible(true);

//       return () => {
//         unsubscribeTabPress(); // Clean up the event listener
//         setModalVisible(false); // Close modal when the tab is unfocused
        
//       };
//     }, [navigation])
//   );

//   const closeModalAndNavigateBack = () => {
//     setModalVisible(false);
//     if (previousTab) {
//       // Navigate back to the previous tab
//       navigation.navigate(previousTab);
//     } else {
//       // If for some reason previousTab is null, navigate to a default tab
//       navigation.navigate('Home');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       {/* Modal Implementation */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModalAndNavigateBack}
//       >
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Pick a Category</Text>
//             <FlatList
//               data={categoriesToSell}
//               renderItem={renderSellCategory}
//               keyExtractor={(item) => item.id}
//               numColumns={2}
//               columnWrapperStyle={styles.row}
//             />
//             <Button title="Close" onPress={closeModalAndNavigateBack} />
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// export default SellScreen;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#f5f5f5',
//   },
//   row: {
//     justifyContent: 'space-between',
//   },
//   categoryContainer: {
//     flex: 1,
//     margin: 10,
//     borderRadius: 10,
//     backgroundColor: '#ffffff',
//     padding: 15,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   image: {
//     height: 100,
//     width: 100,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: '90%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });
