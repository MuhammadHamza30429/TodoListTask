// CustomButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const CustomButton = ({onPress, title, isDarkTheme}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isDarkTheme ? styles.darkButton : styles.lightButton,
      ]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  darkButton: {
    backgroundColor: '#4CAF50', // Green color
  },
  lightButton: {
    backgroundColor: '#4CAF50', // Green color
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CustomButton;
