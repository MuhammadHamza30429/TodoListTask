import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import from react-native-vector-icons

const DarkModeSwitch = ({isDarkTheme, toggleSwitch}) => {
  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between w-full">
        <Text
          className={`text-lg font-bold ${
            isDarkTheme ? 'text-white' : 'text-black'
          }`}>
          Tasks
        </Text>
        <TouchableOpacity
          onPress={toggleSwitch}
          className="flex-row items-center">
          {isDarkTheme ? (
            <Icon name="weather-night" size={24} color="#fff" /> // Dark mode icon
          ) : (
            <Icon name="white-balance-sunny" size={24} color="#000" /> // Light mode icon
          )}
          <Text
            className={`ml-2 text-base ${
              isDarkTheme ? 'text-white' : 'text-black'
            }`}>
            {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DarkModeSwitch;
