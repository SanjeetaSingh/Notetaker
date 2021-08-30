import * as React from 'react';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MainNavigator, PhotoNavigator, SettingsNavigator, NotesNavigator } from './Header'
import addNote from '../screens/main/Editor';

const Tab = createBottomTabNavigator();

/**
 * This function handles the fixed menu on every screen 
 * that routes to the correct screens for the application.
 * This tab navigation works with the Header javascript file
 * that works with stack navigation.  
 * 
 * @returns The fixed menu on the application screens.
 */
 export default function Menu(nav)  {
  return (
    //The headers for the tab navigation is set to not show
      <Tab.Navigator screenOptions={{ headerShown: false }}> 
      <Tab.Screen name='Dash' options={{
            tabBarLabel:'Dashboard',
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-home" color={color} size={26} />
            ),
            tabBarActiveTintColor: '#9AC4F8',
            tabBarInactiveTintColor: 'gray',
      }}>
        {props => (<MainNavigator {...props} extraData={nav.extraData}/>)}
      </Tab.Screen>
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
            name="Edit" options={{
            tabBarLabel:'Add Notes',
            tabBarIcon: ({ color }) => (
            <Ionicons name="ios-add-circle" color={color} size={26} />
            ),
            tabBarActiveTintColor: '#9AC4F8',
            tabBarInactiveTintColor: 'gray',
          }}>
         {props => (<NotesNavigator {...props} extraData={nav.extraData}/>)}
      </Tab.Screen>
      </Tab.Navigator>
  );
}