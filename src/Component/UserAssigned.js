import React, {useState, useEffect} from 'react';
import {View, Text, Alert, Modal, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const UserAssigned = ({
  onUserSelect,
  modalVisible,
  setModalVisible,
  currentUser,
  isDarkTheme, // Receive the theme prop
}) => {
  const [selectedUser, setSelectedUser] = useState('');
  const users = ['John Doe', 'Jane Smith', 'Emily Johnson'];

  useEffect(() => {
    if (modalVisible) {
      setSelectedUser(currentUser);
    }
  }, [modalVisible, currentUser]);

  const assignUser = () => {
    if (selectedUser) {
      onUserSelect(selectedUser);
      // Alert.alert(`User assigned to ${selectedUser}`);
      setModalVisible(false);
    } else {
      Alert.alert('Please select a user');
    }
  };

  return (
    <View className="p-5 justify-center">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          className={`flex-1 justify-center items-center ${
            isDarkTheme ? 'bg-black/50' : 'bg-black/50'
          }`}>
          <View
            className={`w-[300] p-[20] ${
              isDarkTheme ? 'bg-[#1e1e1e]' : 'bg-white'
            } rounded-xl items-center`}>
            <Text
              style={{fontWeight: 'bold'}}
              className={`text-lg mb-2 ${
                isDarkTheme ? 'text-white' : 'text-black'
              }`}>
              Assign User
            </Text>
            <View className="w-64 h-12 mb-7">
              <Picker
                selectedValue={selectedUser}
                onValueChange={itemValue => setSelectedUser(itemValue)}
                style={{
                  color: isDarkTheme ? 'white' : 'black',
                  backgroundColor: isDarkTheme ? '#1e1e1e' : 'white',
                }}
                dropdownIconColor={isDarkTheme ? 'white' : 'black'}>
                <Picker.Item label="Select User" value="" />
                {users.map((user, index) => (
                  <Picker.Item key={index} label={user} value={user} />
                ))}
              </Picker>
            </View>
            <View className="flex-row justify-between w-full">
              <TouchableOpacity
                className="bg-green-600 p-2 rounded-md flex-1 mr-1 items-center"
                onPress={assignUser}>
                <Text className="text-white font-bold">Assign</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-600 p-2 rounded-md flex-1 ml-1 items-center"
                onPress={() => setModalVisible(false)}>
                <Text className="text-white font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserAssigned;
