import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useLocation } from '../../context/LocationContext';

const LocationModal = ({ visible, onClose }) => {
    const {fetchLocation,locationName}=useLocation();
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide" // You can change this to "fade" or other animations
      onRequestClose={onClose} // This is for Android back button handling
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Entypo name="cross" size={24} color="black" />
          </Pressable>
          <Text style={styles.modalTitle}>Location Details</Text>
          <Text style={styles.locationText}>{locationName}</Text>
           <Button title="Refresh Location" onPress={fetchLocation} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim the background
  },
  modalContent: {
    height:'100%',
    width:'100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default LocationModal;
