import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const UserAssigned = ({onUserSelect, modalVisible, setModalVisible}) => {
  const [selectedUser, setSelectedUser] = useState('');

  // Assuming we have a list of users from an API or local data
  const users = ['John Doe', 'Jane Smith', 'Emily Johnson'];

  const assignUser = () => {
    if (selectedUser) {
      onUserSelect(selectedUser); // Update user state in TodoApp
      Alert.alert(`User assigned to ${selectedUser}`);
      setModalVisible(false); // Close modal after assignment
    } else {
      Alert.alert('Please select a user');
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Assign User:</Text>
            <Picker
              selectedValue={selectedUser}
              style={styles.picker}
              onValueChange={itemValue => setSelectedUser(itemValue)}>
              <Picker.Item label="Select User" value="" />
              {users.map((user, index) => (
                <Picker.Item key={index} label={user} value={user} />
              ))}
            </Picker>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.assignButton}
                onPress={assignUser}>
                <Text style={styles.buttonText}>Assign</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: 250,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Space buttons evenly
    width: '100%', // Full width for the buttons container
  },
  assignButton: {
    backgroundColor: '#4CAF50', // Green color
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take up equal space
    marginRight: 5, // Space between buttons
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336', // Red color
    padding: 10,
    borderRadius: 5,
    flex: 1, // Take up equal space
    marginLeft: 5, // Space between buttons
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserAssigned;
