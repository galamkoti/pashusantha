import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useLanguage } from '../context/LanguageContext';
import { CustomBottomSheetModal } from './../Components/Animal/CustomBottomSheetModal';

const App = () => {
  const { translations } = useLanguage();

  // State for each modal option
  const [categoryValue, setCategoryValue] = useState(null);
  const [breedValue, setBreedValue] = useState(null);
  const [hasChildValue, setHasChildValue] = useState(null);
  const [isBargainableValue, setIsBargainableValue] = useState(null);

  const animalCategories = [
    { label: translations.cows || 'Cow', value: 'cow' },
    { label: translations.buffalo || 'Buffalo', value: 'buffalo' },
    { label: translations.sheep || 'Sheep', value: 'sheep' },
    { label: translations.goat || 'Goat', value: 'goat' },
  ];

  const breedOptions = {
    cow: [
      { label: 'Holstein', value: 'holstein' },
      { label: 'Jersey', value: 'jersey' },
      { label: 'Guernsey', value: 'guernsey' },
    ],
    buffalo: [
      { label: 'Murrah', value: 'murrah' },
      { label: 'Nili-Ravi', value: 'nili-ravi' },
      { label: 'Bhadawari', value: 'bhadawari' },
    ],
    sheep: [
      { label: 'Dorset', value: 'dorset' },
      { label: 'Hampshire', value: 'hampshire' },
      { label: 'Suffolk', value: 'suffolk' },
    ],
    goat: [
      { label: 'Nubian', value: 'nubian' },
      { label: 'Alpine', value: 'alpine' },
      { label: 'Saanen', value: 'saanen' },
    ],
  };

  const hasChildOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const isBargainableOptions = [
    { label: 'Bargainable', value: true },
    { label: 'Not Bargainable', value: false },
  ];

  // Handle category change: reset breed when category is changed
  const handleCategoryChange = (value) => {
    setCategoryValue(value);
    setBreedValue(null); // Reset the breed value when a new category is selected
  };

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView>
        <View style={styles.container}>

          {/* Category Modal */}
          <Text>Selected Category: {categoryValue || 'None'}</Text>
          <CustomBottomSheetModal
            data={animalCategories}
            modalTitle="Select Category"
            onValueSelected={handleCategoryChange}
          />

          {/* Breed Modal - Dependent on selected category */}
          {categoryValue && (
            <>
              <Text>Selected Breed: {breedValue || 'None'}</Text>
              <CustomBottomSheetModal
                data={breedOptions[categoryValue] || []}  // Empty array if no category
                modalTitle="Select Breed"
                onValueSelected={(value) => setBreedValue(value)}
              />
            </>
          )}

          {/* Has Child Modal */}
          <Text>Has Child: {hasChildValue === null ? 'None' : hasChildValue ? 'Yes' : 'No'}</Text>
          <CustomBottomSheetModal
            data={hasChildOptions}
            modalTitle="Has Child"
            onValueSelected={(value) => setHasChildValue(value)}
          />

          {/* Bargainable Modal */}
          <Text>Bargainable: {isBargainableValue === null ? 'None' : isBargainableValue ? 'Yes' : 'No'}</Text>
          <CustomBottomSheetModal
            data={isBargainableOptions}
            modalTitle="Bargainable"
            onValueSelected={(value) => setIsBargainableValue(value)}
          />

        </View>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});

export default App;
