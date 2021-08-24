import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MainNavigator, PhotoNavigator, SettingsNavigator, NotesNavigator } from './Header'

const Tab = createBottomTabNavigator();

const Menu = function() {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
            name="Dash"
            component={MainNavigator}
            options={{
              tabBarLabel:'Dashboard',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-home" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#9AC4F8',
              tabBarInactiveTintColor: 'gray',
              
            }}
      />
      <Tab.Screen
            name="Photo"
            component={PhotoNavigator}
            options={{
              tabBarLabel:'Camera',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-camera" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#9AC4F8',
              tabBarInactiveTintColor: 'gray',
            }}
      />
      <Tab.Screen
            name="setting"
            component={SettingsNavigator}
            options={{
              tabBarLabel:'Setting',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-settings" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#9AC4F8',
              tabBarInactiveTintColor: 'gray',
            }}
      />
      <Tab.Screen
            name="Edit"
            component={NotesNavigator}
            options={{
              tabBarLabel:'Add Notes',
              tabBarIcon: ({ color }) => (
                <Ionicons name="ios-add-circle" color={color} size={26} />
              ),
              tabBarActiveTintColor: '#9AC4F8',
              tabBarInactiveTintColor: 'gray',
            }}
      />
      </Tab.Navigator>
  );
}

export default Menu;
