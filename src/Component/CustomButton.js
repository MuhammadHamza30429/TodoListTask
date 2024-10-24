import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const CustomButton = ({onPress, title, isDarkTheme}) => {
  return (
    <TouchableOpacity
      className={`p-3 rounded-lg w-full items-center mb-10 ${
        isDarkTheme ? 'bg-green-600' : 'bg-green-600'
      }`}
      onPress={onPress}>
      <Text className="text-white font-bold text-base">{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
