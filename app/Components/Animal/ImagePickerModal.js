import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, Pressable } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

const ImagePickerModal = ({ visible, onClose,onCameraPress,onGalleryPress }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide" // You can change this to "fade" or other animations
      onRequestClose={onClose} // This is for Android back button handling
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Pressable onPress={onCameraPress} style={styles.iconTextBox}>
            <Entypo name="camera" size={24} color="black" />
            <Text style={styles.locationText}>camera</Text>
          </Pressable>
          <Pressable onPress={onGalleryPress} style={styles.iconTextBox}>
            <Entypo name="image" size={24} color="black" />
            <Text style={styles.locationText}>Gallery</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.iconTextBox}>
            <Entypo name="cross" size={24} color="black" />
            <Text style={styles.locationText}>close</Text>
          </Pressable>
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
    height:'20%',
    width:'90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:"row",
    justifyContent:"space-around"
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
  iconTextBox:{
    alignItems:"center",
    justifyContent:"center"
  }
});

export default ImagePickerModal;
