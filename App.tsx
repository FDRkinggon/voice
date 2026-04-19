import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, Button, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

//Importation depuis le dossier screen
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({color, size}) => {
            let iconName: any;
            if(route.name === 'Accueil') iconName = 'home';
            else if (route.name === 'Parems') iconName = 'settings';
            else if (route.name === 'Profile') iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'plum',
        })} >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Parems" component={SettingsScreen} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- LE STYLE (Design) ---
const styles = StyleSheet.create({
  
});