import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Import from react-native-vector-icons

const DarkModeSwitch = ({isDarkTheme, toggleSwitch}) => {
  return (
    <View style={styles.themeSwitchContainer}>
      <View style={styles.container}>
        <Text style={[styles.heading, {color: isDarkTheme ? '#fff' : '#000'}]}>
          Tasks
        </Text>
        <TouchableOpacity onPress={toggleSwitch} style={styles.iconContainer}>
          {isDarkTheme ? (
            <Icon name="weather-night" size={24} color="#fff" /> // Dark mode icon
          ) : (
            <Icon name="white-balance-sunny" size={24} color="#000" /> // Light mode icon
          )}
          <Text
            style={[styles.modeText, {color: isDarkTheme ? '#fff' : '#000'}]}>
            {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Space between heading and switch
    width: '100%',
    // marginBottom: 20,
  },
  heading: {
    fontSize: 20, // Adjust size as needed
    color: '#000', // Adjust color as needed
    fontWeight: 'bold', // Make the font bold
  },

  themeSwitchContainer: {
    width: '100%',
    alignItems: 'flex-end',
    // marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default DarkModeSwitch;
