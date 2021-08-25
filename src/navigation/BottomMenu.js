import 'react-native-gesture-handler';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MainNavigator, PhotoNavigator, SettingsNavigator, NotesNavigator } from './Header'

const Tab = createBottomTabNavigator();

/**
 * This function handles the fixed menu on every screen 
 * that routes to the correct screens for the application.
 * This tab navigation works with the Header javascript file
 * that works with stack navigation.  
 * 
 * @returns The fixed menu on the application screens.
 */
const Menu = function() {
  return (
    //The headers for the tab navigation is set to not show
      <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen
      //The dashboard tab navigation with a home icon
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
      //The add a photo tab navigation with a camera icon
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
      //The settings tab navigation with a gear icon
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
      //The add a note tab navigation with a plus icon
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
