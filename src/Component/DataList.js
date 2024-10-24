import React from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DataList = ({tasks, deleteTask, editTask, isDarkTheme}) => {
  return (
    <View className="w-full">
      {/* Conditionally render the heading if there are tasks */}
      {tasks.length > 0 && (
        <Text
          className={`text-lg font-bold text-center mb-4 ${
            isDarkTheme ? 'text-white' : 'text-black'
          }`}>
          Task List
        </Text>
      )}
      <FlatList
        data={tasks}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <View
            className={`w-full p-4 mb-2 rounded-lg shadow-lg ${
              isDarkTheme ? 'bg-neutral-900' : 'bg-white'
            }`}>
            <View className="flex-row justify-between items-center w-full">
              <Text
                className={`font-bold ${
                  isDarkTheme ? 'text-white' : 'text-black'
                }`}>
                {item.user} ({item.country})
              </Text>
              <View className="flex-row items-center">
                <TouchableOpacity onPress={() => editTask(index)}>
                  <Icon name="create-outline" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteTask(index)}
                  className="ml-2">
                  <Icon name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
            <Text
              className={`mt-1 text-sm ${
                isDarkTheme ? 'text-gray-400' : 'text-black'
              }`}>
              {item.description}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default DataList;
