// import {View, Text, StyleSheet, Switch} from 'react-native';
// import React, {useEffect, useState} from 'react';

// import './global.css';
// import {colorScheme, useColorScheme} from 'nativewind';

// const App = () => {
//   const systemTheme = useColorScheme();
//   const [isDarkTheme, setIsDarkTheme] = useState(systemTheme === 'dark');

//   // Toggle function for the switch
//   const toggleSwitch = () => {
//     setIsDarkTheme(previousState => !previousState);
//   };

//   return (
//     <View
//       style={[
//         styles.container,
//         isDarkTheme ? styles.darkBackground : styles.lightBackground,
//       ]}>
//       <Text style={isDarkTheme ? styles.darkText : styles.lightText}>
//         This is a demo of default dark/light theme using appearance.
//       </Text>
//       <Switch
//         trackColor={{false: '#767577', true: '#81b0ff'}}
//         thumbColor={isDarkTheme ? '#f5dd4b' : '#f4f3f4'}
//         onValueChange={toggleSwitch}
//         value={isDarkTheme}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   darkBackground: {
//     backgroundColor: 'black',
//   },
//   lightBackground: {
//     backgroundColor: 'white',
//   },
//   darkText: {
//     color: 'white',
//   },
//   lightText: {
//     color: 'black',
//   },
// });

// export default App;
import {Text, View} from 'react-native';
import React from 'react';
import './global.css';
import Countries from './src/Countries';
const App = () => {
  return <Countries />;
};

export default App;
