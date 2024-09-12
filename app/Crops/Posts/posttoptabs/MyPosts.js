import { View, Text } from 'react-native'
import React ,{useState,useEffect}from 'react'
import { translation } from '../../../Components/Language/translations';
import { getSelectedLangFromAsync } from '../../../Components/Language/languageStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyPosts = () => {
  const [languageIndex, setLanguageIndex] = useState(0); // Default to English

  useEffect(() => {
    fetchLanguageIndex()
  }, []);

  const fetchLanguageIndex = async () => {
    console.log(AsyncStorage.getItem('LANGUAGE_VIKRAI'));
    const index = await getSelectedLangFromAsync();
    if (index !== null) {
      setLanguageIndex(index);
    }
  };
  return (
    <View>
      <Text>MyPosts</Text>
      <Text>
          4.2 km{' '}
          {languageIndex === 0 ? translation[2].English
            : languageIndex === 1 ? translation[2].Hindi
            : languageIndex === 2 ? translation[2].Telugu
            : languageIndex === 3 ? translation[2].Tamil
            : languageIndex === 4 ? translation[2].Malayalam
            : languageIndex === 5 ? translation[2].Kannada
            : languageIndex === 6 ? translation[2].Punjabi
            : null}
        </Text>
    </View>
  )
}

export default MyPosts