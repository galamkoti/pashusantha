import { View, Text } from 'react-native'
import React from 'react'

const HorizontalLine = () => {
  return (
    <View
        style={{
          width : "100%",
          height : 0.5,
          backgroundColor: "#2f2f2f",
          alignSelf: "center",
          marginVertical: 5,
        }}
      ></View>
  )
}

export default HorizontalLine