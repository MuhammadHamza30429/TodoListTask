// DataList.js
import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DataList = ({tasks, deleteTask, editTask, isDarkTheme}) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item, index}) => (
        <View
          style={[
            styles.card,
            isDarkTheme ? styles.darkCard : styles.lightCard,
          ]}>
          <View style={styles.row}>
            <Text
              style={[
                styles.userCountryText,
                {color: isDarkTheme ? 'white' : 'black'},
              ]}>
              {item.user} ({item.country})
            </Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => editTask(index)}>
                <Icon name="create-outline" size={24} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(index)}>
                <Icon name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={[
              styles.descriptionText,
              {color: isDarkTheme ? 'lightgray' : 'black'},
            ]}>
            {item.description}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%', // Set card width to 100% to take full screen width
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  darkCard: {
    backgroundColor: '#1e1e1e', // Dark mode background
  },
  lightCard: {
    backgroundColor: '#ffffff', // Light mode background
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userCountryText: {
    fontWeight: 'bold',
  },
  descriptionText: {
    marginTop: 5, // Add space between the user/country row and description
    fontSize: 14,
  },
});

export default DataList;
