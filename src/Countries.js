// Countries.js
import React, {useState, useEffect} from 'react';
import {View, TextInput, Alert, TouchableOpacity} from 'react-native';
import {fetchCountries} from './Component/CountriesComponent/ApiServices'; // Import the fetchCountries function
import DarkModeSwitch from './Component/DarkModeSwitch';
import AssignUser from './Component/UserAssigned';
import CustomButton from './Component/CustomButton';
import TaskList from './Component/DataList';
import useTasks from './Component/CountriesComponent/Hooks';
import {Picker} from '@react-native-picker/picker';

const Countries = () => {
  const {tasks, saveTask, deleteTask, updateTask} = useTasks();
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const countriesList = await fetchCountries();
        setCountries(countriesList);
      } catch (error) {
        Alert.alert('Error fetching countries. Please try again.');
      }
    };
    loadCountries();
  }, []);

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
      updateTask(editingIndex, newTask);
      setEditingIndex(null);
      Alert.alert('Edit Success');
    } else {
      saveTask(newTask);
      Alert.alert('Save Success');
    }

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
    setEditingIndex(index);
    setModalVisible(true);
  };

  return (
    <View
      className={`p-4 items-center w-full h-full ${
        isDarkTheme ? 'bg-[#121212]' : 'bg-white'
      }`}>
      <DarkModeSwitch
        isDarkTheme={isDarkTheme}
        toggleSwitch={() => setIsDarkTheme(!isDarkTheme)}
      />
      <AssignUser
        onUserSelect={setUser}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedUser={user}
        currentUser={user}
        isDarkTheme={isDarkTheme}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className={`w-full p-2 mb-3 border ${
          isDarkTheme
            ? 'bg-[#1e1e1e] border-gray-700'
            : 'bg-white border-gray-300'
        }`}>
        <TextInput
          placeholder="Click Me.."
          value={user}
          onChangeText={setUser}
          onFocus={() => setModalVisible(true)}
          editable={false}
          className={`${isDarkTheme ? 'text-white' : 'text-black'}`}
          placeholderTextColor={isDarkTheme ? '#bbbbbb' : '#888888'}
        />
      </TouchableOpacity>
      <View className="w-full h-12 mb-6">
        <Picker
          selectedValue={country}
          onValueChange={setCountry}
          style={{
            height: 50,
            width: '100%',
            color: isDarkTheme ? 'white' : 'black',
            backgroundColor: isDarkTheme ? '#1e1e1e' : '#ffffff',
          }}
          dropdownIconColor={isDarkTheme ? 'white' : 'black'}>
          <Picker.Item label="Select Country" value="" />
          {countries.map((countryName, index) => (
            <Picker.Item key={index} label={countryName} value={countryName} />
          ))}
        </Picker>
      </View>

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
        className={`w-full p-2 border h-24 mb-3 ${
          isDarkTheme
            ? 'bg-[#1e1e1e] border-gray-700 text-white'
            : 'bg-white border-gray-300 text-black'
        }`}
        placeholderTextColor={isDarkTheme ? '#bbbbbb' : '#888888'}
        textAlignVertical="top"
      />
      <CustomButton
        title={editingIndex !== null ? 'Update Task' : 'Save Task'}
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

export default Countries;
