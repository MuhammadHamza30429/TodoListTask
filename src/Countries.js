import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import DarkModeSwitch from './Component/DarkModeSwitch';
import AssignUser from './Component/UserAssigned';
import CustomButton from './Component/CustomButton';
import TaskList from './Component/DataList';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTask = async newTask => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const deleteTask = async index => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async (index, updatedTask) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? updatedTask : task,
    );
    setTasks(updatedTasks);
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return {tasks, saveTask, deleteTask, updateTask};
};

const Countries = () => {
  const {tasks, saveTask, deleteTask, updateTask} = useTasks();
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(true); // Show modal initially
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data.map(country => country.name.common));
    } catch (error) {
      Alert.alert('Error fetching countries. Please try again.');
    }
  };

  const handleSaveTask = () => {
    if (description.length > 120) {
      Alert.alert('Error', 'Description must be less than 120 characters.');
      return;
    }
    if (!user || !country) {
      Alert.alert('Error', 'User and Country must be selected.');
      return;
    }

    const newTask = {description, user, country};
    if (editingIndex !== null) {
      updateTask(editingIndex, newTask); // Update existing task
      setEditingIndex(null); // Reset editing index
    } else {
      saveTask(newTask); // Save new task
    }

    // Clear input fields and hide modal
    clearFields();
    setModalVisible(false);
  };

  const clearFields = () => {
    setDescription('');
    setUser('');
    setCountry('');
  };

  const editTask = index => {
    const taskToEdit = tasks[index];
    setDescription(taskToEdit.description);
    setUser(taskToEdit.user);
    setCountry(taskToEdit.country);
    setEditingIndex(index); // Set the index of the task being edited
    setModalVisible(true); // Open the modal for editing
  };

  return (
    <View
      style={[
        styles.container,
        isDarkTheme ? styles.darkBackground : styles.lightBackground,
      ]}>
      <DarkModeSwitch
        isDarkTheme={isDarkTheme}
        toggleSwitch={() => setIsDarkTheme(!isDarkTheme)}
      />
      <AssignUser
        onUserSelect={setUser}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedUser={user} // Pass selected user for editing
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          styles.input,
          isDarkTheme ? styles.darkInput : styles.lightInput,
        ]}>
        <TextInput
          placeholder="Click Me.."
          value={user}
          onChangeText={setUser}
          onFocus={() => setModalVisible(true)} // Open modal on focus
          editable={false}
          style={[isDarkTheme ? styles.darkInput : styles.lightInput]}
          placeholderTextColor={isDarkTheme ? '#bbbbbb' : '#888888'}
        />
      </TouchableOpacity>
      <Picker
        selectedValue={country}
        onValueChange={setCountry}
        style={[
          styles.picker,
          isDarkTheme ? styles.darkPicker : styles.lightPicker,
        ]}>
        <Picker.Item label="Select Country" value="" />
        {countries.map((countryName, index) => (
          <Picker.Item key={index} label={countryName} value={countryName} />
        ))}
      </Picker>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        style={[
          styles.input,
          isDarkTheme ? styles.darkInput : styles.lightInput,
          styles.textArea,
        ]}
        placeholderTextColor={isDarkTheme ? '#bbbbbb' : '#888888'}
      />
      <CustomButton
        title={editingIndex !== null ? 'Update Task' : 'Save Task'} // Change button text based on edit mode
        onPress={handleSaveTask}
        isDarkTheme={isDarkTheme}
      />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        isDarkTheme={isDarkTheme}
        editTask={editTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  darkBackground: {
    backgroundColor: '#121212',
  },
  lightBackground: {
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    width: '100%',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100, // Set height for the text area
    textAlignVertical: 'top', // Align text to the top
  },
  darkInput: {
    borderColor: 'gray',
    backgroundColor: '#1e1e1e',
    color: 'white',
  },
  lightInput: {
    borderColor: 'lightgray',
    backgroundColor: '#ffffff',
    color: 'black',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  darkPicker: {
    backgroundColor: '#1e1e1e',
    color: 'white',
  },
  lightPicker: {
    backgroundColor: '#ffffff',
    color: 'black',
  },
});

export default Countries;
