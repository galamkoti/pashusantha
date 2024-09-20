import { View, Text } from 'react-native'
import React from 'react'
import { useLanguage } from '../../context/LanguageContext';

const index = () => {
  const { translations } = useLanguage();
  return (
    <View>
      <Text>{translations.buy_animal}</Text>
      <Text>{translations.animals}</Text>
      <Text>{translations.crops}</Text>
      <Text>{translations.sell_animal}</Text>
      <Text>{translations.buy_crop}</Text>
      <Text>{translations.sell_crop}</Text>
    </View>
  )
}

export default index