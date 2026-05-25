import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { StackNavigator } from './src/navigation/StackNavigator';
import { StatusBar } from 'expo-status-bar';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <StackNavigator/>
    </NavigationContainer>
  )
}

export default App;