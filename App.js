import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import BMICalculator from './screens/BMICalculator';
import RatingsList from './screens/RatingsList';  
import RoutinesScreen from './screens/RoutinesScreen';
import SettingsScreen from './screens/SettingsScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="BMICalculator" component={BMICalculator} />
        <Stack.Screen name="Routines" component={RoutinesScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="RatingsList" component={RatingsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
