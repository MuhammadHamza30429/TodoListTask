// Hooks.js
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Hooks = () => {
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

export default Hooks;
