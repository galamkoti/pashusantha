import React from 'react';
import { View, Text, Button, Linking, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CallButton = ({ phoneNumber }) => {
  
  // Function to make a call
  const makePhoneCall = () => {
    let phoneURL = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneURL)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(phoneURL);
        } else {
          Alert.alert("Phone number is not available");
        }
      })
      .catch((error) => {
        console.error("Failed to make phone call", error);
      });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={makePhoneCall} style={styles.callButton}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
    </View>
  );
};

export default CallButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 50,
    marginRight: 5,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
