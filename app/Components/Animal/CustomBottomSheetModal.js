import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import AntDesign from '@expo/vector-icons/AntDesign';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather'; 


export const CustomBottomSheetModal = ({ data, onValueSelected, modalTitle, selectedValue }) => {
  const commonRef = useRef(null);
  const [commonValue, setCommonValue] = useState(selectedValue);

  // When the selectedValue prop changes (e.g., switching categories), update local state
  useEffect(() => {
    setCommonValue(selectedValue);
  }, [selectedValue]);

  const openModal = useCallback(() => {
    commonRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    commonRef.current?.close();
  }, []);

  const snapPoints = useMemo(() => ['80%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSelect = (value) => {
    setCommonValue(value);
    onValueSelected(value);
    handleClose();
  };

  const CustomBackdrop = ({ onPress }) => (
    <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onPress} />
  );

  const renderItem = ({ item }) => {
    const isSelected = commonValue === item.value;

    return (
      // <ScrollView showsHorizontalScrollIndicator={false}>
      <Pressable style={styles.itemContainer} onPress={() => handleSelect(item.value)}>
        <View style={styles.radioContainer}>
          <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]} />
        </View>
        <Text style={styles.itemTitle}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity onPress={openModal} style={{ flexDirection:"row"}}>
        {/* Display selected value or modal title */}
        <Text style={styles.openButtonText}>
          {commonValue ? data.find(item => item.value === commonValue)?.label : modalTitle}
        </Text>
        <AntDesign name="downcircleo" size={24} color="black" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={commonRef}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        onClose={handleClose}
        backdropComponent={CustomBackdrop}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={styles.header}>
            {/* Display the modal title */}
            <Text style={styles.headerTitle}>{modalTitle}</Text>
            <TouchableOpacity onPress={handleClose} style={{marginRight:10}}>
            <Feather name="x-circle" size={30} color="black" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </BottomSheetView>
        
      </BottomSheetModal>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  radioContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButton: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'transparent',
  },
  radioButtonSelected: {
    backgroundColor: 'black',
  },
  openButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginRight:15
  },
});
